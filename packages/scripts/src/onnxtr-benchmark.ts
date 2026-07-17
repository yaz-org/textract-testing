import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { randomUUID } from "node:crypto";
import { Resource } from "sst";

const lambda = new LambdaClient({});

const downloadUrl = process.env.BENCHMARK_DOWNLOAD_URL;
const callbackUrl = process.env.BENCHMARK_CALLBACK_URL;
const runs = Number.parseInt(process.env.BENCHMARK_RUNS ?? "5", 10);

if (process.env.SST_STAGE === "production") {
  throw new Error("OnnxTR benchmarks must run in a non-production SST stage");
}

if (!downloadUrl || !callbackUrl) {
  throw new Error(
    "BENCHMARK_DOWNLOAD_URL and BENCHMARK_CALLBACK_URL are required",
  );
}
if (!Number.isInteger(runs) || runs < 1 || runs > 100) {
  throw new Error("BENCHMARK_RUNS must be an integer between 1 and 100");
}

const durations: number[] = [];

for (let index = 0; index < runs; index += 1) {
  const messageId = `benchmark-${randomUUID()}`;
  const payload = {
    Records: [
      {
        messageId,
        body: JSON.stringify({ downloadUrl, callbackUrl }),
      },
    ],
  };

  const started = performance.now();
  const response = await lambda.send(
    new InvokeCommand({
      FunctionName: Resource.OnnxTRFunction.name,
      InvocationType: "RequestResponse",
      LogType: "Tail",
      Payload: JSON.stringify(payload),
    }),
  );
  const wallMs = Math.round(performance.now() - started);
  durations.push(wallMs);

  const responsePayload = response.Payload
    ? JSON.parse(new TextDecoder().decode(response.Payload))
    : null;
  if (response.FunctionError) {
    throw new Error(
      `Benchmark invocation ${index + 1} failed: ${JSON.stringify(responsePayload)}`,
    );
  }
  if (responsePayload?.batchItemFailures?.length) {
    throw new Error(
      `Benchmark invocation ${index + 1} reported a record failure: ${JSON.stringify(responsePayload)}`,
    );
  }

  const logs = response.LogResult
    ? Buffer.from(response.LogResult, "base64").toString("utf8")
    : "";
  const report = logs
    .split("\n")
    .find((line) => line.startsWith("REPORT RequestId:"));
  console.log(
    JSON.stringify({
      run: index + 1,
      messageId,
      wallMs,
      report: report ?? null,
    }),
  );
}

const sorted = [...durations].sort((left, right) => left - right);
const percentile = (value: number) =>
  sorted[Math.min(sorted.length - 1, Math.ceil(sorted.length * value) - 1)];

console.log(
  JSON.stringify({
    runs,
    minMs: sorted[0],
    p50Ms: percentile(0.5),
    p95Ms: percentile(0.95),
    maxMs: sorted.at(-1),
    averageMs: Math.round(
      durations.reduce((total, duration) => total + duration, 0) /
        durations.length,
    ),
  }),
);
