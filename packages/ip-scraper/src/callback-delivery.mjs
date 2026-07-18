import { prepareSignedCallback } from "./callback-signing.mjs";

const CALLBACK_TIMEOUT_MS = 30_000;

export class CallbackDeliveryError extends Error {
	constructor(message) {
		super(message);
    this.name = "CallbackDeliveryError";
  }
}

export async function postSignedCallback(
  callbackUrl,
  payload,
  { fetchImpl = fetch, signal = AbortSignal.timeout(CALLBACK_TIMEOUT_MS) } = {},
) {
  try {
    const { body, headers } = prepareSignedCallback(payload);
    const response = await fetchImpl(callbackUrl, {
      method: "POST",
      headers,
      body,
      signal,
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return { status: response.status };
	} catch {
		throw new CallbackDeliveryError("Statement callback delivery failed");
  }
}
