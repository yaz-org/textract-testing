# HMAC Callback Protocol and Implementation Specification

## 1. Metadata and status

| Metadata | Value |
| --- | --- |
| Protocol version | `v1` |
| Repository status | Sender signing and delivery-reliability implementation merged to `main` and deployed |
| Document receiver status | CFF receiver implemented and deployed; production callback verified |
| Statement receiver status | CFF receiver implemented and deployed; production callback acceptance not yet evidenced |
| Last reviewed | 2026-07-18 |
| Scope | OnnxTR document processor and banking statement scraper callbacks |

Repository status alone is not deployment evidence. The production statements in this revision are supported by the deployment confirmation and sanitized recovery evidence recorded in section 18; they must not be generalized to another stage without equivalent verification.

The sender description is based on merged commit `9d4f1ef` and the secret declarations and injection in `infra/callback-signing.ts`, `infra/queue.ts`, `infra/onnxtr.ts`, and `infra/ip-scraper.ts`; the sender and test behavior in `packages/onnxtr-lambda/handler.py`, `packages/onnxtr-lambda/tests/test_handler.py`, and `packages/ip-scraper/src/`; and the delivery monitoring in `infra/onnxtr-monitoring.ts`. The production CFF receiver is implemented in `yazalulloa/cactus-fast-food` at `3233ba4` and is described in the [CFF HMAC Callback Receiver and Operations Specification](https://github.com/yazalulloa/cactus-fast-food/blob/main/specs/hmac-callback-receiver.md). The unsigned `packages/functions/src/process-document.ts` function in this repository is not the evidenced production CFF receiver.

## 2. Purpose and audience

This is the authoritative `v1` callback-signing contract for processor maintainers, callback receiver implementers, security reviewers, and operators who provision or rotate secrets.

The protocol provides:

- Payload integrity.
- Sender authenticity based on possession of the processor-specific shared secret.
- Request freshness when the receiver enforces the timestamp window.
- Protection against replaying the exact signed delivery when the receiver atomically records event IDs.

It does not provide payload encryption or confidentiality, callback URL validation or SSRF protection, business-level idempotency across SQS retries, a replacement for HTTPS, or a replacement for IAM-authenticated service-to-service communication.

## 3. Normative terminology

The key words **MUST**, **MUST NOT**, **SHOULD**, and **MAY** describe normative requirements. HMAC follows [RFC 2104](https://www.rfc-editor.org/rfc/rfc2104.html), and UUIDv7 follows [RFC 9562](https://www.rfc-editor.org/rfc/rfc9562.html).

## 4. Protocol overview

For every callback attempt, a sender:

1. Constructs the callback payload object.
2. Serializes it exactly once.
3. Retains the resulting UTF-8 bytes as `rawBody`.
4. Generates a Unix timestamp in whole seconds.
5. Generates a new UUIDv7 event ID.
6. Signs the timestamp, event ID, separators, and exact body bytes.
7. Sends the same `rawBody` bytes without reserialization.

```text
Processor -> serialize once -> timestamp -> UUIDv7 -> HMAC -> HTTP callback
Receiver  -> capture raw bytes -> validate headers/freshness -> verify HMAC
          -> claim event ID -> parse JSON
```

## 5. HTTP wire contract

The request method is `POST`. The body is UTF-8 JSON with media type `application/json`. Header names are case-insensitive under HTTP; examples and current senders use:

```http
Content-Type: application/json
x-cff-timestamp: 1784320000
x-cff-event-id: 018f47a2-4d6b-7c8d-9e0f-123456789abc
x-cff-signature: v1=<64-lowercase-hex-characters>
```

| Header | Required value |
| --- | --- |
| `Content-Type` | `application/json`; receivers MUST allow normal media-type parameter parsing |
| `x-cff-timestamp` | Non-negative base-10 Unix seconds without whitespace |
| `x-cff-event-id` | Canonical lowercase UUIDv7 |
| `x-cff-signature` | Literal `v1=` followed by 64 lowercase hexadecimal characters |

The protocol adds no JSON payload field and removes or renames no existing field.

## 6. Exact signing construction

```text
prefix       = ASCII(timestamp) || "." || ASCII(eventId) || "."
signingInput = prefix || rawBody
digest       = HMAC-SHA256(decodedSecret, signingInput)
signature    = "v1=" || lowercaseHex(digest)
```

Each period is the literal ASCII byte `0x2e`. There is no trailing newline. The sender MUST NOT parse, normalize, pretty-print, key-sort, or serialize the body again after producing `rawBody`. An HMAC implementation MAY receive the prefix and body through separate streaming `update` calls because that produces the same byte stream.

The signature covers the exact body bytes, timestamp, and event ID. It does not cover the HTTP method, URL, or other headers. A receiver MUST verify the captured raw request body and MUST NOT verify a reconstructed JSON string.

## 7. Serializer-specific behavior

The document processor currently serializes with Python:

```python
json.dumps(
    payload,
    ensure_ascii=False,
    separators=(",", ":"),
).encode("utf-8")
```

The statement processor currently serializes with Node.js:

```javascript
Buffer.from(JSON.stringify(payload), "utf8")
```

Neither language-specific representation is a universal canonical JSON form. Serializer differences are harmless because the receiver verifies the exact bytes transmitted.

## 8. UUIDv7 contract

Event IDs have:

- Unix milliseconds in the first 48 bits, big-endian.
- Version nibble `7`.
- RFC 4122/RFC 9562 variant bits `10`.
- Cryptographically secure randomness in the remaining bits.
- Canonical lowercase UUID string formatting.

The sender MUST generate a fresh event ID for every HTTP callback attempt, including an attempt caused by an SQS retry. The UUID timestamp and `x-cff-timestamp` are generated during the same request preparation, but they are not required to be numerically identical: one records milliseconds and the other whole seconds.

## 9. Secrets and processor identity

The infrastructure declares two independent SST secrets:

| Processor | SST secret | Runtime environment variable |
| --- | --- | --- |
| Document | `DocumentCallbackHmacSecret` | `CFF_HMAC_SECRET_HEX` |
| Statement | `StatementCallbackHmacSecret` | `CFF_HMAC_SECRET_HEX` |

Each value MUST contain exactly 64 hexadecimal characters. The processor hex-decodes it into a 32-byte HMAC key. Missing, short, long, or non-hex values prevent a signed request from being prepared; there is no unsigned fallback.

The processor secrets MUST be distinct from each other and MUST NOT be reused as queue-submission API keys. Secrets and signatures MUST NOT be logged.

Provision independent values per stage:

```bash
bunx sst secret set --stage production \
  DocumentCallbackHmacSecret "$(openssl rand -hex 32)"

bunx sst secret set --stage production \
  StatementCallbackHmacSecret "$(openssl rand -hex 32)"
```

Use the corresponding non-production stage for smoke testing. Changing an SST secret requires deployment of the affected stage before new Lambda environments use the value. See the [SST Secret component documentation](https://sst.dev/docs/component/secret/).

The receiver MUST select the expected key from trusted endpoint configuration, not from attacker-controlled request data. Processor identity in replay-cache keys means the trusted endpoint or route identity associated with the selected document or statement key.

## 10. Processor-specific behavior

### 10.1 Document processor

The document processor:

- Signs successful OCR callbacks.
- Signs sanitized document-processing failure callbacks.
- Sends `requests.post(data=rawBody)`, not `json=payload`.
- Disables redirects.
- Treats callback HTTP errors as delivery failures.
- Raises `CallbackDeliveryError` and emits `callback_delivery_failed`, rather than `document_failed`, when a completed OCR result cannot be delivered.
- Returns the SQS message in `batchItemFailures`, enabling retry and eventual DLQ behavior.
- Suppresses callbacks entirely for benchmark-mode records.
- Publishes callback-delivery failures through the dedicated `CallbackDeliveryFailed` metric and alarm.

If a successful callback fails, the handler marks the SQS record failed for retry but does not send a misleading document-processing failure callback. Actual document-processing failures still use the separately signed sanitized failure callback. Every HTTP attempt receives a new timestamp, UUIDv7 event ID, and signature.

### 10.2 Statement processor

The statement processor:

- Signs successful statement callbacks only.
- Sends the signed body as a Node.js `Buffer`.
- Does not currently send a failure callback.
- Uses `postSignedCallback` with a 30-second delivery timeout.
- Attempts logout and browser cleanup before propagating callback failures.
- Converts non-2xx `fetch` responses, network failures, timeouts, and signing failures into delivery errors.
- Uses an SQS event-source batch size of one so every delivered record is processed by the single-record handler.
- Logs delivery failure without including the callback URL.

Consequently, statement callback failures fail the Lambda invocation and allow the FIFO SQS message to retry and eventually reach its DLQ.

## 11. Receiver verification contract

A conforming receiver MUST perform verification in this order:

1. Capture the raw HTTP request body before JSON parsing.
2. Require media type `application/json`.
3. Require and syntactically validate all three `x-cff-*` headers.
4. Parse `x-cff-timestamp` as integer Unix seconds.
5. Reject timestamps more than 300 seconds in the past or future.
6. Parse `x-cff-event-id` and require canonical lowercase UUIDv7.
7. Select the processor-specific key from trusted endpoint configuration.
8. Validate and hex-decode the configured 64-character secret.
9. Reconstruct the prefix and append the captured raw body.
10. Compute HMAC-SHA256.
11. Compare the expected and supplied 32-byte digests with a constant-time function.
12. Atomically claim `(processor, eventId)` before business side effects.
13. Retain the replay claim for 10 minutes.
14. Parse and validate JSON only after authentication succeeds.
15. Apply business-level idempotency separately.

At exactly 300 seconds of positive or negative skew, the timestamp is within the allowed window. A receiver SHOULD use a reliable clock source and MUST reject values just outside that boundary.

| Condition | Response |
| --- | --- |
| Unsupported media type | `415` |
| Request body above the receiver's documented limit | `413` |
| Missing, malformed, stale, replayed, or invalid authentication | Generic `401` without identifying the failed check |
| Authenticated but invalid JSON or payload schema | `400` |
| Authenticated and accepted | Any documented `2xx` |
| Authenticated transient internal failure | `5xx` |

The receiver MUST NOT log the secret, full signature, raw body, callback URL query parameters, OCR text, or transaction data.

The deployed CFF receiver implements this order with `crypto.subtle.verify()`. It validates and hex-decodes the 64-character current and optional previous secret before importing the 32-byte HMAC key. It atomically claims the processor/event-ID pair before JSON parsing and business processing. Both an exact signed replay and reuse of the same event ID with different bytes receive a generic `401`. See the [receiver companion specification](https://github.com/yazalulloa/cactus-fast-food/blob/main/specs/hmac-callback-receiver.md) for route limits, response details, diagnostics, and storage behavior.

## 12. Replay protection versus business idempotency

`x-cff-event-id` identifies one HTTP delivery attempt. SQS retries prepare new callback attempts with new event IDs and timestamps. A replay cache prevents reuse of the same signed request, but it cannot detect semantically identical callbacks produced by separate SQS attempts.

Document persistence and statement consumers therefore still require domain-level idempotency based on stable business identifiers. CFF records the accepted document payload digest on the inference so a later delivery attempt with a new event ID cannot repeat terminal effects or move state backward. Its statement receiver uses stable transaction-reference handling to avoid duplicate persistence. This follows from the [at-least-once delivery behavior of Lambda with Amazon SQS](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html).

## 13. Secret rotation

Protocol `v1` has no key identifier. Rotate one processor key at a time with current-and-previous acceptance:

1. Generate a new random 32-byte secret.
2. Configure the receiver to accept both the current and next keys for that processor.
3. Deploy the receiver.
4. Update the corresponding SST secret.
5. Deploy the sender stage.
6. Monitor authentication failures.
7. Keep the old key accepted for at least 15 minutes after sender deployment completes.
8. Remove the old key from receiver configuration.
9. Retain the old secret securely for the rollback window, then destroy it.

The receiver MUST try both configured keys without revealing which one matched. Adding `x-cff-key-id`, changing the signing input, or changing algorithms requires a future protocol version; implementations MUST NOT silently change `v1`.

The CFF current/previous pairs are `DOCUMENT_CALLBACK_SECRET` / `DOCUMENT_CALLBACK_SECRET_PREVIOUS` and `STATEMENTS_CALLBACK_SECRET` / `STATEMENTS_CALLBACK_SECRET_PREVIOUS`. Every configured value remains a 64-character hexadecimal string and is decoded before HMAC use.

## 14. Threat model and security limitations

| Threat or property | `v1` behavior |
| --- | --- |
| Body tampering | Detected |
| Timestamp or event-ID tampering | Detected |
| Exact signed-request replay | Rejected while replay state is retained |
| Secret compromise | Not mitigated; rotate immediately |
| Callback URL SSRF | Not mitigated |
| Transport observation | Mitigated only by HTTPS |
| Semantic duplicate processing | Requires domain idempotency |
| Public receiver abuse before verification | Requires rate limiting and bounded request bodies |
| Timing attacks against comparison | Receiver MUST use constant-time digest comparison |

Receivers SHOULD reject oversized requests before buffering unbounded bodies, while preserving access to the accepted request's exact bytes for verification.

## 15. Interoperability test vector

This deterministic vector is for testing only. Its secret MUST NOT be used in any environment.

| Input | Exact value |
| --- | --- |
| Secret hex | `000102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f` |
| Timestamp | `1784320000` |
| Event ID | `018f47a2-4d6b-7c8d-9e0f-123456789abc` |
| Raw body | `{"success":true}` |

Exact ASCII signing input:

```text
1784320000.018f47a2-4d6b-7c8d-9e0f-123456789abc.{"success":true}
```

Expected HMAC-SHA256 digest:

```text
3380f5f6f085e9fe3b0cdf4fbcc61146ca58b31e9a49c660a0e18c1fd6c959e6
```

Complete signature header value:

```text
v1=3380f5f6f085e9fe3b0cdf4fbcc61146ca58b31e9a49c660a0e18c1fd6c959e6
```

The digest was independently calculated with Python and Node.js before publication.

## 16. Testing and acceptance matrix

Current sender tests cover:

- Python UUIDv7 timestamp, version, and variant.
- Exact Python UTF-8 bytes sent through `data=`.
- Python signature reconstruction and lowercase format.
- Invalid or missing Python secret rejection without an HTTP request.
- Signed document success and failure callbacks.
- Node.js UUIDv7 timestamp, version, and variant.
- Exact Node.js `Buffer` signing.
- Unicode and JSON escaping in both implementations.
- Invalid or missing Node.js secret rejection.
- Distinct Node.js event IDs across calls.

The CFF receiver's 17 focused callback tests cover:

- A valid request.
- A one-byte body mutation.
- Timestamp mutation.
- Event-ID mutation.
- The wrong processor key.
- Uppercase or otherwise malformed signatures.
- Missing headers.
- Timestamp values at both `-300` and `+300` second boundaries and just outside them.
- UUIDs with the wrong version or variant.
- Exact replay with an atomic claim.
- A concurrent replay race.
- Current-and-previous key overlap during rotation.
- A valid signature with invalid JSON.
- A non-ASCII UTF-8 body.
- Bodies with whitespace or alternate valid JSON formatting.
- Endpoint body and transaction-count limits.
- Semantic duplicate delivery attempts with new event IDs.

## 17. Rollout and operational checklist

Sender signing, receiver enforcement, and the delivery-reliability remediation are deployed in production. After any future deployment or key rotation, operators MUST verify a normal callback, authentication-rejection diagnostics, callback delivery failures, source-queue age, and DLQ depth without logging sensitive material.

If positive callbacks fail, operators SHOULD stop the affected queue workflow while sender and receiver configuration are reconciled. Receiver enforcement may be changed only through coordinated change control; an unsigned public callback MUST NOT be restored as an ad hoc rollback. A sender rollback and receiver rollback must preserve a mutually compatible authenticated contract.

The remaining production acceptance work is a controlled statement callback that receives `2xx`, reports the expected receiver result, and leaves its source queue and DLQ empty. Missing, altered, stale, and replayed production probes must not be marked complete until separately executed.

## 18. 2026-07-18 production authentication incident

### Impact

Production document callbacks received generic `401` responses. Private CFF diagnostics classified the failures as `signature_mismatch`, and the document SQS record retried. The pre-remediation handler then misclassified the delivery failure as a document-processing failure and attempted a separately signed failure callback, which was rejected for the same reason. This emitted `FailureCallbackFailed` and `DocumentFailed` and contributed to the oldest-message age crossing 600 seconds.

The investigation also found a statement-delivery reliability defect: signing, network, and non-2xx failures could be swallowed, allowing SQS to treat the invocation as successful. This was a defect discovered during the incident; there is no evidence here of a lost production statement callback.

### Root cause and remediation

Both senders hex-decoded the configured 64-character value into a 32-byte HMAC key. The original CFF receiver instead imported the same characters as UTF-8 bytes. Matching configured strings therefore produced different keys and signatures. The configured values were correct, so secret rotation was unnecessary.

[CFF PR 21](https://github.com/yazalulloa/cactus-fast-food/pull/21), merged as `3233ba4`, corrected key decoding and added the interoperability vector, strict UUIDv7 and freshness validation, current/previous key support, atomic replay claims, cleanup, and semantic-idempotency hardening. [Sender PR 3](https://github.com/yaz-org/textract-testing/pull/3), merged as `9d4f1ef`, separated callback delivery from processing failures, added delivery monitoring, made statement failures retryable, set statement batch size one, and removed callback URLs from delivery logs.

### Recovery evidence and remaining work

Both remediations were deployed. At `2026-07-18T19:29:35Z`, a production document callback passed HMAC verification, atomically claimed its replay event, completed the document mutation, and returned `200`. A subsequent read-only check found the document and statement source queues and DLQs empty, so no redrive was required.

The `queue-age` alarm still displayed its earlier 619/675-second breach even though the queue was empty and `TreatMissingData` was `notBreaching`. That stale state is an operational follow-up, not evidence of a continuing backlog. End-to-end production statement acceptance remains pending a controlled smoke test.

## 19. Known gaps and status matrix

| Capability | Status |
| --- | --- |
| Document sender signing | Implemented and deployed |
| Statement sender signing | Implemented and deployed |
| Document sender retry behavior | Implemented and deployed |
| Statement sender retry behavior | Implemented and deployed |
| Separate processor secrets | Implemented and provisioned for the evidenced deployment |
| Exact-body unit tests | Implemented |
| CFF document receiver verification | Implemented, deployed, and production callback verified |
| CFF statement receiver verification | Implemented and deployed; production callback acceptance not yet evidenced |
| Replay store and cleanup | Implemented in CFF |
| Document semantic idempotency | Implemented in CFF |
| Statement domain idempotency | Stable transaction-reference handling implemented; production smoke pending |
| Current/previous key rotation | Implemented in CFF |
| Automated end-to-end rotation | Not implemented |
| Production document recovery | Verified |
| Production statement recovery | Pending controlled smoke test |

## 20. References

- [RFC 2104 — HMAC](https://www.rfc-editor.org/rfc/rfc2104.html)
- [RFC 9562 — UUIDs and UUIDv7](https://www.rfc-editor.org/rfc/rfc9562.html)
- [Using Lambda with Amazon SQS](https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html)
- [SST Secret component](https://sst.dev/docs/component/secret/)
