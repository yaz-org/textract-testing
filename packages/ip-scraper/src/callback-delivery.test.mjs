import { createHmac } from "node:crypto";
import { afterEach, describe, expect, mock, test } from "bun:test";
import {
  CallbackDeliveryError,
  postSignedCallback,
} from "./callback-delivery.mjs";

const SECRET_HEX =
  "000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f";

afterEach(() => {
  delete process.env.CFF_HMAC_SECRET_HEX;
});

describe("statement callback delivery", () => {
  test("sends the exact signed Buffer and accepts a 2xx response", async () => {
    process.env.CFF_HMAC_SECRET_HEX = SECRET_HEX;
    const fetchImpl = mock(async (_url, request) => ({
      ok: true,
      status: 204,
      request,
    }));
    const payload = {
      success: true,
      transactions: [{ description: "Pago ☕", type: "C" }],
    };

    await expect(
      postSignedCallback("https://callback.invalid/statements", payload, {
        fetchImpl,
        signal: undefined,
      }),
    ).resolves.toEqual({ status: 204 });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, request] = fetchImpl.mock.calls[0];
    expect(url).toBe("https://callback.invalid/statements");
    expect(request.method).toBe("POST");
    expect(Buffer.isBuffer(request.body)).toBe(true);
    expect(request.body.toString("utf8")).toBe(JSON.stringify(payload));

    const timestamp = request.headers["x-cff-timestamp"];
    const eventId = request.headers["x-cff-event-id"];
    const expectedDigest = createHmac("sha256", Buffer.from(SECRET_HEX, "hex"))
      .update(`${timestamp}.${eventId}.`, "ascii")
      .update(request.body)
      .digest("hex");
    expect(request.headers["x-cff-signature"]).toBe(`v1=${expectedDigest}`);
  });

  test("throws a retryable delivery error for non-2xx responses", async () => {
    process.env.CFF_HMAC_SECRET_HEX = SECRET_HEX;
    await expect(
      postSignedCallback("https://callback.invalid/statements", {}, {
        fetchImpl: async () => ({ ok: false, status: 401 }),
        signal: undefined,
      }),
    ).rejects.toBeInstanceOf(CallbackDeliveryError);
  });

  test("throws a retryable delivery error for network failures", async () => {
    process.env.CFF_HMAC_SECRET_HEX = SECRET_HEX;
    await expect(
      postSignedCallback("https://callback.invalid/statements", {}, {
        fetchImpl: async () => {
          throw new Error("connection reset");
        },
        signal: undefined,
      }),
    ).rejects.toBeInstanceOf(CallbackDeliveryError);
  });
});
