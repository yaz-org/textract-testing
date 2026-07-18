import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dir, "../../..");
const productionConfig = readFileSync(resolve(root, "sst.config.ts"), "utf8");
const queueSource = readFileSync(resolve(root, "infra/queue.ts"), "utf8");
const directSource = readFileSync(resolve(root, "infra/onnxtr.ts"), "utf8");
const monitoringSource = readFileSync(
  resolve(root, "infra/onnxtr-monitoring.ts"),
  "utf8",
);
const scraperSource = readFileSync(resolve(root, "infra/ip-scraper.ts"), "utf8");
const notifierSource = readFileSync(
  resolve(root, "packages/functions/src/onnxtr-alarm-notifier.ts"),
  "utf8",
);
const dockerfile = readFileSync(
  resolve(root, "packages/onnxtr-lambda/Dockerfile"),
  "utf8",
);

describe("OnnxTR production promotion infrastructure", () => {
  test("targets only the FIFO subscriber image for precompilation", () => {
    expect(productionConfig).toContain(
      "/^DocumentQueueSubscriber[A-Za-z]+FunctionImage$/",
    );
    expect(productionConfig).toContain(
      'const { Image } = await import("@pulumi/docker-build")',
    );
    expect(productionConfig).toContain('$transform(Image, (args, _opts, name) => {');
    expect(productionConfig).toContain(
      'if (!ONNXTR_SUBSCRIBER_IMAGE.test(name)) return;',
    );
    expect(productionConfig).toContain("...args.buildArgs");
    expect(productionConfig).toContain('ONNXTR_BYTECODE_MODE: "precompiled"');
    expect(productionConfig.indexOf("$transform(Image")).toBeLessThan(
      productionConfig.indexOf('import("./infra")'),
    );
  });

  test("promotes only subscriber memory and preserves queue semantics", () => {
    expect(queueSource).toContain('memory: "3008 MB"');
    expect(queueSource).toContain('timeout: "3 minutes"');
    expect(queueSource).toContain('visibilityTimeout: "18 minutes"');
    expect(queueSource).toContain("retry: 5");
    expect(queueSource).toContain("size: 1");
    expect(queueSource).toContain("partialResponses: true");
    expect(queueSource).toContain("fifo: true");
  });

  test("leaves the stale direct function on the stripped 2,048 MB baseline", () => {
    expect(directSource).toContain('memory: "2048 MB"');
    expect(directSource).not.toContain("ONNXTR_BYTECODE_MODE");
    expect(directSource).not.toContain("ONNXTR_BENCHMARK_MODE");
  });

  test("uses the already benchmarked Docker bytecode mode", () => {
    expect(dockerfile).toContain("ARG ONNXTR_BYTECODE_MODE=stripped");
    expect(dockerfile).toContain(
      "python -m compileall -q --invalidation-mode=unchecked-hash",
    );
    expect(dockerfile).toContain(
      'test "${bytecode_mode}" = stripped || test "${bytecode_mode}" = precompiled',
    );
  });

  test("uses the existing Telegram secrets only in the alarm notifier", () => {
    expect(scraperSource).toContain(
      'export const telegramBotToken = new sst.Secret("TelegramBotToken")',
    );
    expect(scraperSource).toContain(
      'export const telegramChatId = new sst.Secret("TelegramChatId")',
    );
    expect(monitoringSource).toContain("TELEGRAM_BOT_TOKEN: telegramBotToken.value");
    expect(monitoringSource).toContain("TELEGRAM_CHAT_ID: telegramChatId.value");
    expect(queueSource).not.toContain("TELEGRAM_BOT_TOKEN");
    expect(notifierSource).not.toContain("console.log(token");
    expect(notifierSource).not.toContain("console.log(message");
  });

  test("encrypts and restricts the CloudWatch alarm notification path", () => {
    expect(monitoringSource).toContain('new aws.kms.Key("OnnxTRAlertKey"');
    expect(monitoringSource).toContain("enableKeyRotation: true");
    expect(monitoringSource).toContain('identifiers: ["cloudwatch.amazonaws.com"]');
    expect(monitoringSource).toContain('actions: ["kms:Decrypt", "kms:GenerateDataKey*"]');
    expect(monitoringSource).toContain('actions: ["SNS:Publish"]');
    expect(monitoringSource).toContain('variable: "AWS:SourceAccount"');
    expect(monitoringSource).toContain('variable: "AWS:SourceArn"');
    expect(monitoringSource).not.toContain("alias/aws/sns");
  });

  test("defines the complete OnnxTR alarm set with recovery actions", () => {
    expect(
      monitoringSource.match(/new aws\.cloudwatch\.MetricAlarm\(/g),
    ).toHaveLength(7);
    expect(monitoringSource).toContain('metricName: "Errors"');
    expect(monitoringSource).toContain('metricName: "Throttles"');
    expect(monitoringSource).toContain('metricName: "Duration"');
    expect(monitoringSource).toContain(
      'metricName: "ApproximateAgeOfOldestMessage"',
    );
    expect(monitoringSource).toContain(
      'metricName: "ApproximateNumberOfMessagesVisible"',
    );
    expect(monitoringSource).toContain('metricName: "DocumentFailed"');
    expect(monitoringSource).toContain('metricName: "FailureCallbackFailed"');
    expect(monitoringSource).toContain('treatMissingData: "notBreaching"');
    expect(monitoringSource).toContain("okActions: alarmActions");
  });

  test("attaches custom metrics to the SST-managed subscriber log group", () => {
    expect(monitoringSource).toContain(
      "const logGroup = fn.nodes.logGroup",
    );
    expect(monitoringSource).toContain("return logGroup.name");
    expect(monitoringSource).not.toContain(
      "pulumi.interpolate`/aws/lambda/${subscriberFunctionName}`",
    );
  });
});
