import { createHmac } from "node:crypto";
import { describe, expect, test } from "bun:test";
import {
  decodeCallbackSecret,
  generateUuidV7,
  prepareSignedCallback,
} from "./callback-signing.mjs";

const SECRET_HEX = "11".repeat(32);

describe("UUIDv7", () => {
  test("encodes the timestamp, version, and variant", () => {
    const timestampMs = 1_784_320_000_123;
    const eventId = generateUuidV7({
      timestampMs,
      entropy: Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
    });
    const bytes = Buffer.from(eventId.replaceAll("-", ""), "hex");

    expect(eventId).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
    expect(bytes.readUIntBE(0, 6)).toBe(timestampMs);
  });

  test("generates a distinct event ID for each invocation", () => {
    expect(generateUuidV7()).not.toBe(generateUuidV7());
  });
});

describe("signed callbacks", () => {
  test("signs the exact Buffer returned as the request body", () => {
    const payload = {
      success: true,
      message: "Línea \"uno\"\nsegunda\\línea",
      transactions: [{ description: "Pago ☕" }],
    };
    const timestampSeconds = 1_784_320_000;
    const eventId = "018f47a2-4d6b-7c8d-9e0f-123456789abc";
    const result = prepareSignedCallback(payload, {
      secretHex: SECRET_HEX,
      timestampSeconds,
      eventId,
    });

    expect(Buffer.isBuffer(result.body)).toBe(true);
    expect(result.body).toEqual(Buffer.from(JSON.stringify(payload), "utf8"));
    expect(result.headers["Content-Type"]).toBe("application/json");
    expect(result.headers["x-cff-timestamp"]).toBe(String(timestampSeconds));
    expect(result.headers["x-cff-event-id"]).toBe(eventId);

    const expected = createHmac("sha256", Buffer.from(SECRET_HEX, "hex"))
      .update(Buffer.from(`${timestampSeconds}.${eventId}.`, "ascii"))
      .update(result.body)
      .digest("hex");
    expect(result.headers["x-cff-signature"]).toBe(`v1=${expected}`);
    expect(expected).toMatch(/^[0-9a-f]{64}$/);
  });

  test("rejects missing and malformed secrets", () => {
    const originalSecret = process.env.CFF_HMAC_SECRET_HEX;
    delete process.env.CFF_HMAC_SECRET_HEX;
    expect(() => decodeCallbackSecret()).toThrow("CFF_HMAC_SECRET_HEX");
    if (originalSecret !== undefined) {
      process.env.CFF_HMAC_SECRET_HEX = originalSecret;
    }

    for (const secretHex of [
      null,
      "",
      "ab".repeat(31),
      "ab".repeat(33),
      "z".repeat(64),
    ]) {
      expect(() => decodeCallbackSecret(secretHex)).toThrow("CFF_HMAC_SECRET_HEX");
    }
  });
});
