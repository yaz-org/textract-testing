const DEFAULT_ALARM_NAME_PREFIX = "textract-testing-production-onnxtr-";
const TELEGRAM_MESSAGE_LIMIT = 4096;
const TELEGRAM_TIMEOUT_MS = 8_000;

type AlarmState = "ALARM" | "OK";

type CloudWatchAlarmMessage = {
  AlarmName?: unknown;
  NewStateValue?: unknown;
  StateChangeTime?: unknown;
  Trigger?: {
    MetricName?: unknown;
    Namespace?: unknown;
    Threshold?: unknown;
  };
};

type SnsEvent = {
  Records?: Array<{
    Sns?: {
      Message?: unknown;
    };
  }>;
};

export type SafeAlarm = {
  name: string;
  state: AlarmState;
  timestamp: string;
  metric: string;
  threshold: number | null;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function safeToken(value: unknown, fallback: string): string {
  if (typeof value !== "string" || !/^[A-Za-z0-9._/-]{1,96}$/.test(value)) {
    return fallback;
  }
  return value;
}

export function parseAlarmMessage(
  message: unknown,
  alarmNamePrefix = process.env.ALARM_NAME_PREFIX ?? DEFAULT_ALARM_NAME_PREFIX,
): SafeAlarm {
  if (typeof message !== "string") {
    throw new Error("SNS alarm message must be a string");
  }

  let parsed: CloudWatchAlarmMessage;
  try {
    parsed = JSON.parse(message) as CloudWatchAlarmMessage;
  } catch {
    throw new Error("SNS alarm message is not valid JSON");
  }

  if (
    typeof parsed.AlarmName !== "string" ||
    !parsed.AlarmName.startsWith(alarmNamePrefix)
  ) {
    throw new Error("SNS message is not an OnnxTR production alarm");
  }

  if (parsed.NewStateValue !== "ALARM" && parsed.NewStateValue !== "OK") {
    throw new Error("CloudWatch alarm state is unsupported");
  }

  const timestamp =
    typeof parsed.StateChangeTime === "string" &&
    !Number.isNaN(Date.parse(parsed.StateChangeTime))
      ? new Date(parsed.StateChangeTime).toISOString()
      : new Date().toISOString();
  const threshold = parsed.Trigger?.Threshold;

  return {
    name: safeToken(
      parsed.AlarmName.slice(alarmNamePrefix.length),
      "unknown-alarm",
    ),
    state: parsed.NewStateValue,
    timestamp,
    metric: safeToken(parsed.Trigger?.MetricName, "custom-metric"),
    threshold:
      typeof threshold === "number" && Number.isFinite(threshold)
        ? threshold
        : null,
  };
}

export function formatTelegramAlarm(alarm: SafeAlarm): string {
  const status = alarm.state === "ALARM" ? "🔴 ALARM" : "🟢 RECOVERED";
  const lines = [
    `<b>[PROD][OnnxTR] ${status}</b>`,
    `<b>Alarm:</b> <code>${escapeHtml(alarm.name)}</code>`,
    `<b>Metric:</b> <code>${escapeHtml(alarm.metric)}</code>`,
    `<b>Time:</b> <code>${escapeHtml(alarm.timestamp)}</code>`,
  ];
  if (alarm.threshold !== null) {
    lines.push(`<b>Threshold:</b> <code>${alarm.threshold}</code>`);
  }
  lines.push(
    alarm.state === "ALARM"
      ? "The configured production threshold was breached."
      : "The production metric returned to its configured range.",
  );
  return lines.join("\n").slice(0, TELEGRAM_MESSAGE_LIMIT);
}

export async function sendTelegramAlarm(
  alarm: SafeAlarm,
  fetchImplementation: typeof fetch = fetch,
): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    throw new Error("Telegram alarm configuration is unavailable");
  }

  const response = await fetchImplementation(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: formatTelegramAlarm(alarm),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(TELEGRAM_TIMEOUT_MS),
    },
  );

  if (!response.ok) {
    throw new Error(`Telegram alarm delivery failed with HTTP ${response.status}`);
  }
}

export async function handler(event: SnsEvent): Promise<void> {
  if (!Array.isArray(event.Records) || event.Records.length === 0) {
    throw new Error("SNS event contains no records");
  }

  const alarms = event.Records.map((record) =>
    parseAlarmMessage(record.Sns?.Message),
  );
  await Promise.all(alarms.map((alarm) => sendTelegramAlarm(alarm)));

  for (const alarm of alarms) {
    console.log(
      JSON.stringify({
        level: "INFO",
        event: "telegram_alarm_delivered",
        alarm: alarm.name,
        state: alarm.state,
      }),
    );
  }
}
