import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import {
  formatTelegramAlarm,
  handler,
  parseAlarmMessage,
  sendTelegramAlarm,
} from "./onnxtr-alarm-notifier";

const message = JSON.stringify({
  AlarmName: "textract-testing-production-onnxtr-lambda-errors",
  NewStateValue: "ALARM",
  NewStateReason: "raw reason containing arn:aws:lambda and account data",
  StateChangeTime: "2026-07-18T12:00:00.000Z",
  AWSAccountId: "000000000000",
  AlarmArn: "arn:aws:cloudwatch:region:account:alarm:sensitive",
  Trigger: {
    MetricName: "Errors",
    Namespace: "AWS/Lambda",
    Threshold: 1,
    Dimensions: [{ name: "FunctionName", value: "physical-function-name" }],
  },
});

const originalToken = process.env.TELEGRAM_BOT_TOKEN;
const originalChatId = process.env.TELEGRAM_CHAT_ID;

beforeEach(() => {
  process.env.TELEGRAM_BOT_TOKEN = "test-token";
  process.env.TELEGRAM_CHAT_ID = "test-chat";
});

afterEach(() => {
  if (originalToken === undefined) delete process.env.TELEGRAM_BOT_TOKEN;
  else process.env.TELEGRAM_BOT_TOKEN = originalToken;
  if (originalChatId === undefined) delete process.env.TELEGRAM_CHAT_ID;
  else process.env.TELEGRAM_CHAT_ID = originalChatId;
});

describe("OnnxTR Telegram alarm notifier", () => {
  test("parses only the safe CloudWatch alarm fields", () => {
    expect(parseAlarmMessage(message)).toEqual({
      name: "lambda-errors",
      state: "ALARM",
      timestamp: "2026-07-18T12:00:00.000Z",
      metric: "Errors",
      threshold: 1,
    });
  });

  test("rejects unrelated alarms and unsupported states", () => {
    expect(() =>
      parseAlarmMessage(
        JSON.stringify({ AlarmName: "another-service", NewStateValue: "ALARM" }),
      ),
    ).toThrow("not an OnnxTR production alarm");
    expect(() =>
      parseAlarmMessage(
        JSON.stringify({
          AlarmName: "textract-testing-production-onnxtr-test",
          NewStateValue: "INSUFFICIENT_DATA",
        }),
      ),
    ).toThrow("state is unsupported");
  });

  test("formats a bounded message without raw alarm payload data", () => {
    const formatted = formatTelegramAlarm(parseAlarmMessage(message));
    expect(formatted).toContain("[PROD][OnnxTR] 🔴 ALARM");
    expect(formatted).toContain("lambda-errors");
    expect(formatted).not.toContain("000000000000");
    expect(formatted).not.toContain("arn:aws");
    expect(formatted).not.toContain("physical-function-name");
    expect(formatted).not.toContain("raw reason");
    expect(formatted.length).toBeLessThanOrEqual(4096);
  });

  test("posts through Telegram without exposing the token in the body", async () => {
    const fetchMock = mock(async (url: string | URL | Request, init?: RequestInit) => {
      expect(String(url)).toBe("https://api.telegram.org/bottest-token/sendMessage");
      expect(String(init?.body)).not.toContain("test-token");
      expect(String(init?.body)).toContain("test-chat");
      return new Response("{}", { status: 200 });
    });

    await sendTelegramAlarm(parseAlarmMessage(message), fetchMock as typeof fetch);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  test("throws on Telegram failure so SNS can retry", async () => {
    const fetchMock = mock(async () => new Response("{}", { status: 500 }));
    await expect(
      sendTelegramAlarm(parseAlarmMessage(message), fetchMock as typeof fetch),
    ).rejects.toThrow("HTTP 500");
  });

  test("handles a valid SNS event and rejects an empty event", async () => {
    const originalFetch = globalThis.fetch;
    globalThis.fetch = mock(async () => new Response("{}", { status: 200 })) as typeof fetch;
    try {
      await handler({ Records: [{ Sns: { Message: message } }] });
      await expect(handler({ Records: [] })).rejects.toThrow("contains no records");
    } finally {
      globalThis.fetch = originalFetch;
    }
  });
});
