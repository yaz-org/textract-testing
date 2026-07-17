import { createHmac, randomBytes } from "node:crypto";

const HMAC_SECRET_PATTERN = /^[0-9a-fA-F]{64}$/;
const UUID_TIMESTAMP_LIMIT = 2 ** 48;

export function decodeCallbackSecret(secretHex = process.env.CFF_HMAC_SECRET_HEX) {
  if (typeof secretHex !== "string" || !HMAC_SECRET_PATTERN.test(secretHex)) {
    throw new Error(
      "CFF_HMAC_SECRET_HEX must contain exactly 32 bytes as hexadecimal",
    );
  }
  return Buffer.from(secretHex, "hex");
}

export function generateUuidV7({
  timestampMs = Date.now(),
  entropy = randomBytes(10),
} = {}) {
  if (
    !Number.isSafeInteger(timestampMs) ||
    timestampMs < 0 ||
    timestampMs >= UUID_TIMESTAMP_LIMIT
  ) {
    throw new RangeError("UUIDv7 timestamp is outside the 48-bit range");
  }
  if (!Buffer.isBuffer(entropy) || entropy.length !== 10) {
    throw new TypeError("UUIDv7 requires exactly 10 random bytes");
  }

  const bytes = Buffer.allocUnsafe(16);
  bytes.writeUIntBE(timestampMs, 0, 6);
  entropy.copy(bytes, 6);
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = bytes.toString("hex");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function prepareSignedCallback(
  payload,
  {
    secretHex = process.env.CFF_HMAC_SECRET_HEX,
    timestampSeconds: suppliedTimestamp,
    eventId: suppliedEventId,
  } = {},
) {
  const serializedBody = JSON.stringify(payload);
  if (serializedBody === undefined) {
    throw new TypeError("Callback payload must be JSON serializable");
  }
  const body = Buffer.from(serializedBody, "utf8");
  const timestampSeconds = suppliedTimestamp ?? Math.floor(Date.now() / 1000);
  if (!Number.isSafeInteger(timestampSeconds) || timestampSeconds < 0) {
    throw new RangeError("Callback timestamp must be a non-negative integer");
  }
  const eventId = suppliedEventId ?? generateUuidV7();

  const timestamp = timestampSeconds.toString();
  const signature = createHmac("sha256", decodeCallbackSecret(secretHex))
    .update(Buffer.from(`${timestamp}.${eventId}.`, "ascii"))
    .update(body)
    .digest("hex");

  return {
    body,
    headers: {
      "Content-Type": "application/json",
      "x-cff-timestamp": timestamp,
      "x-cff-event-id": eventId,
      "x-cff-signature": `v1=${signature}`,
    },
  };
}
