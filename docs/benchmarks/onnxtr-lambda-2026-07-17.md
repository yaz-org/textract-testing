# OnnxTR Lambda benchmark — 2026-07-17

## Outcome

The final statistical run completed 390 direct Lambda invocations with no Lambda errors, batch failures, callback attempts, timeouts, OCR digest mismatches, page-count mismatches, or word-count mismatches.

The recommended configuration is **precompiled bytecode at 3,008 MB**. Relative to the stripped 2,048 MB baseline, it reduced warm total-processing p95 from 13,399 ms to 5,885 ms (56.1%), reduced controlled-cold p95 from 19,369 ms to 12,346 ms (36.3%), and reduced median billed GB-seconds from 21.812 to 14.118 (35.3%). It also had the lowest median GB-seconds of all six variants.

This is a recommendation only. The production subscriber was not updated or reconfigured.

## Scope and safety boundaries

- Six temporary production-stage Lambda functions were invoked directly with synthetic one-record SQS events.
- No benchmark queue, event-source mapping, Function URL, callback function, or production data link was created.
- `ONNXTR_BENCHMARK_MODE=TRUE` suppressed both callback paths only for message IDs beginning with `benchmark-`.
- The live FIFO queue, external `MessageGroupId` policy, production subscriber, and existing direct Lambda were not invoked or changed.
- Twelve existing authorized S3 objects were read through a new 15-minute presigned URL for every attempt. Objects were not copied, tagged, overwritten, or deleted.
- Raw keys were retained only in a mode-0600, gitignored private run manifest. Logs and reports contain only opaque fixture labels.
- OCR text, object identifiers, bucket names, deployed names, URLs, query strings, callback bodies, account identifiers, and secrets are excluded from this report.

The final benchmark log scan found zero messages matching URL, presigned-query, payload-field, or OCR-text indicators.

## Protocol

The final run used:

- Architectures: x86-64.
- Memory: 2,048 MB, 2,560 MB, and 3,008 MB.
- Bytecode: stripped `.pyc` baseline and build-time `unchecked-hash` precompiled `.pyc`.
- Cold measurements: five per variant using a configuration token update and `LastUpdateStatus=Successful` waiter.
- Warm measurements: twelve fixtures × five repetitions per variant.
- Final measured volume: 30 cold + 360 warm = 390.
- Maximum benchmark concurrency: six, one invocation per temporary function.
- Account concurrency headroom during a cohort: four of ten slots.
- Excluded warm-recycle retries in the final run: zero.
- Invocation API: synchronous `RequestResponse` with Lambda log tail enabled.
- Correctness: SHA-256 over canonical JSON containing `pages`, `fullText`, `averageConfidence`, and `modelInfo`.

The harness ran all six variants for a fixture as one parallel cohort. This preserves at most one in-flight invocation per function, materially shortens the run, and compares variants under closer time conditions than six serial calls. A measured warm sample is accepted only when the Lambda `REPORT` line has no `Init Duration` and the handler reports `modelInitMs=0`. A recycled environment is treated as an excluded warm-up and retried immediately, at most three times.

### Corpus

The production bucket contained 126 `AC`, 90 `3A`, and 65 `4A` objects recognized by the authorized export naming convention. Within each family, objects were sorted by size and key; the nearest-rank 25th, 50th, 75th, and 95th size percentiles were selected.

The 12 fixtures ranged from 32,596 to 102,758 bytes. Every fixture was a one-page image; the largest observed OCR result contained 56 words. These are representative phone-document fixtures, not a stress test of the 20 MiB download limit or 512 MB ephemeral-storage limit.

## Required protocol deviations

Two requested AWS settings were impossible in this account:

1. The account's Lambda memory ceiling was 3,008 MB. AWS rejected 3,072 MB and 4,096 MB, so the matrix became 2,048/2,560/3,008 MB.
2. The account concurrency quota was ten and AWS requires all ten executions to remain unreserved. AWS rejected reserved concurrency one, so the isolated functions had no reserved concurrency. Direct-only resource isolation and the harness scheduler enforced one in-flight call per function. Parallel cohorts used six slots and left four available.

The final statistics include only the successful 390-invocation run. During protocol validation, 518 direct invocations were discarded before result export: 40 exposed an idle-environment warm-classification flaw, 322 were stopped when the user requested cohort parallelization, and 156 verified that recycled environments must be retried rather than counted as warm. All used benchmark callback suppression and caused no production callback or queue mutation. Total AWS benchmark invocations across validation and the final run were therefore 908.

## Results

Times are milliseconds. Image sizes are compressed ECR sizes. Each variant has 65 measured samples: five cold and sixty warm.

| Variant | Cold p50 | Cold p95 | Warm p50 | Warm p95 | Warm max | Max memory | Median GB-s | p95 GB-s | Image MiB |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Stripped 2,048 | 18,677 | 19,369 | 10,785 | 13,399 | 14,072 | 1,466 MB | 21.812 | 35.412 | 521.63 |
| Stripped 2,560 | 12,781 | 15,465 | 5,923 | 7,334 | 7,426 | 1,460 MB | 14.863 | 33.308 | 521.63 |
| Stripped 3,008 | 12,078 | 12,837 | 5,064 | 6,248 | 6,358 | 1,466 MB | 15.022 | 36.957 | 521.63 |
| Precompiled 2,048 | 13,552 | 17,501 | 7,995 | 9,863 | 9,950 | 1,467 MB | 16.212 | 26.920 | 544.78 |
| Precompiled 2,560 | 11,458 | 14,148 | 5,802 | 7,236 | 7,385 | 1,466 MB | 14.688 | 29.410 | 544.78 |
| **Precompiled 3,008** | **10,515** | **12,346** | **4,763** | **5,885** | **5,988** | **1,465 MB** | **14.118** | **31.373** | **544.78** |

### Stage evidence

| Variant | Cold Lambda init p50/p95 | Cold import/decode p50/p95 | Cold model init p50/p95 | Warm OCR p50/p95 |
| --- | ---: | ---: | ---: | ---: |
| Stripped 2,048 | 523 / 723 | 3,007 / 3,059 | 5,074 / 5,228 | 10,704 / 13,337 |
| Stripped 2,560 | 499 / 568 | 2,381 / 2,522 | 4,389 / 4,445 | 5,867 / 7,281 |
| Stripped 3,008 | 542 / 915 | 2,475 / 2,725 | 4,581 / 4,845 | 5,011 / 6,172 |
| Precompiled 2,048 | 393 / 463 | 1,142 / 1,362 | 4,589 / 5,156 | 7,895 / 9,799 |
| Precompiled 2,560 | 396 / 423 | 1,073 / 1,280 | 4,405 / 4,482 | 5,747 / 7,175 |
| **Precompiled 3,008** | **385 / 506** | **1,039 / 1,109** | **4,378 / 4,589** | **4,699 / 5,826** |

Median download time was 51–58 ms across variants, and p95 was 62–92 ms. Serialization rounded to 0 ms at the handler's millisecond resolution. Callback delivery was intentionally excluded; post-deployment production evidence measured approximately 97–127 ms.

Precompilation added 24,277,597 compressed bytes (23.15 MiB, 4.4%). At equal memory it reduced cold median by 27.4% at 2,048 MB, 10.3% at 2,560 MB, and 12.9% at 3,008 MB, satisfying the required 10% gate at all three tiers.

### Cold-start interpretation

Configuration updates guarantee a new execution environment, but they do not guarantee an uncached regional image pull. These cold results measure Lambda init, Python imports, model construction, and one OCR operation after the benchmark images had been deployed. An earlier excluded first-use validation invocation took approximately 89.7 seconds, demonstrating that deploy-time platform/layer cache state can dominate a never-seen image. The controlled-cold table must not replace monitoring of real production first-use cold starts.

## Acceptance evaluation

| Requirement | Result |
| --- | --- |
| No Lambda/batch failure or timeout | Pass |
| No callback attempt | Pass |
| Identical digest, page count, and word count per fixture | Pass; zero mismatches |
| Maximum memory below 90% | Pass; maximum 1,467 MB |
| Controlled cold below 150 seconds | Pass; maximum 19.369 seconds |
| Warm p95 below 15 seconds | Pass for all variants |
| Warm p95 regression no greater than 5% | Pass for all qualifying variants |
| Precompiled cold median improvement at least 10% | Pass at all memory tiers |
| Source document below 20 MiB | Pass; maximum 102,758 bytes |
| Image vulnerability scan | Complete for both benchmark images; no severity counts reported |
| Production subscriber unchanged and healthy | Pass at immediate post-run inspection |

Accuracy acceptance here proves structural and byte-for-byte OCR equivalence across variants, not ground-truth recognition accuracy. The same model files, ONNX Runtime settings, precision, detector, recognizer, and serialization code were used for all variants.

## Recommendation

Promote neither image automatically. In a separately reviewed production change, use **precompiled bytecode at 3,008 MB** if the account's 3,008 MB ceiling remains in effect.

It qualifies because:

- Correctness was identical across all fixtures and variants.
- Warm p95 was the lowest at 5.885 seconds.
- Controlled-cold p95 was the lowest at 12.346 seconds.
- Median GB-seconds was the lowest at 14.118.
- Its median GB-seconds was 4.0% below precompiled 2,560 MB, so the latency win does not require the allowed 10% cost premium.
- Precompilation improved cold median by 12.9% at the same memory tier.

The tradeoff is a 23.15 MiB larger compressed image. Production should retain 180-second timeout and 512 MB `/tmp`, and the first deployment must be monitored for uncached-image cold starts.

## Production verification

Immediately after the final run:

- The subscriber remained Active with a successful update status, x86-64, 2,048 MB, 180-second timeout, and 512 MB ephemeral storage.
- Its sanitized image fingerprint exactly matched the pre-benchmark value.
- The FIFO event source remained Enabled with batch size one and `ReportBatchItemFailures`.
- Visibility remained 1,080 seconds and redrive remained five receives.
- Source queue and DLQ were empty.
- Lambda had zero Errors and zero Throttles in the inspected hour.
- Benchmark logs contained zero sensitive-pattern matches.

No forced failure was submitted to the production FIFO queue. Configuration proves partial-response activation, but an actual production retry remains untested unless a natural retry occurs.

## Benchmark application cleanup

The parallel preflight optimization was validated once before teardown with `ONNXTR_BENCHMARK_PREFLIGHT_ONLY=TRUE`. It inspected all six variants and selected the same twelve-fixture corpus, then returned before the cold and warm measurement loops. A CloudWatch scan across the six benchmark log groups found zero new Lambda `START` records during the full validation window. The 390-sample statistical benchmark was not rerun.

The authoritative private result and corpus manifests were validated, checksummed, and retained under the gitignored `tmp/onnxtr-benchmark/` directory with mode `0600`. The committed Markdown report was scanned for account IDs, ARNs, bucket/object identifiers, queue URLs, full image digests, presigned-query fields, and callback payload data before teardown.

The isolated SST application was then removed as a complete application on 2026-07-17. Read-only post-removal verification produced the following sanitized result:

| Resource or invariant | Before | After |
| --- | ---: | ---: |
| Temporary benchmark Lambdas | 6 | 0 |
| Temporary benchmark log groups | 6 | 0 |
| Temporary benchmark IAM roles | 6 | 0 |
| Benchmark event-source mappings | 0 | 0 |
| Benchmark Function URLs | 0 | 0 |
| SST benchmark stage | Deployed | Not deployed |
| Production source queue depth | 0 | 0 |
| Production DLQ depth | 0 | 0 |
| Production Lambda errors | 0 | 0 |
| Production Lambda throttles | 0 | 0 |

The production subscriber's sanitized image fingerprint remained `f3cac534272996e7ccd49b3a`. Its revision, last-modified value, x86-64/2,048 MB/180-second/512 MB execution envelope, event-source UUID and source/function identities, batch size one, zero batching window, `ReportBatchItemFailures`, 1,080-second visibility timeout, five-receive redrive policy, and FIFO queue identities were byte-for-byte equal in the private before/after comparison. No production traffic occurred during the immediate cleanup window.

At cleanup time, the benchmark winner had not been promoted and production remained at 2,048 MB on its pre-benchmark image. A separately reviewed promotion on 2026-07-18 is recorded below.

The requested one-hour and 24-hour observations are time-gated. This report records the immediate evidence available on 2026-07-17; later checks must be appended after their windows. If no additional production traffic occurs, the operational result must be labeled **insufficient traffic**, not pass.

## Production promotion — 2026-07-18

The recommended **precompiled 3,008 MB** configuration was promoted to the FIFO production subscriber in a separate change. The benchmark queue prohibition remained intact: no benchmark or forced-failure message was submitted to production, and the retained benchmark harness continues to use temporary direct-invocation Lambdas only.

Immediate sanitized verification found:

- Lambda Active with a successful update status, x86-64 architecture, 3,008 MB memory, 180-second timeout, and 512 MB ephemeral storage.
- The deployed image marker reported `precompiled`; the image contained compiled dependencies and handler bytecode plus the baked model manifest.
- The deployed Linux/x86-64 ECR image scan completed with zero critical and zero high findings.
- The FIFO event-source mapping remained Enabled with batch size one, zero batching window, and `ReportBatchItemFailures`; its configuration timestamp did not change during promotion.
- Queue visibility remained 1,080 seconds and redrive remained five receives. The source queue and DLQ were empty.
- Seven CloudWatch alarms were enabled for Lambda errors, throttles, p99 duration, queue age, DLQ depth, document failures, and failure-callback failures.
- Alarm notifications use an encrypted SNS topic and the existing production Telegram channel. Controlled `ALARM` and `OK` notifications were delivered successfully.
- The subscriber log group has metric filters for `document_failed` and `failure_callback_failed`.
- No Lambda errors or throttles were observed in the immediate promotion window.

No natural subscriber invocation had occurred by the immediate check, so first-use duration, memory, OCR success, and callback completion remain **insufficient traffic** rather than passed. The one-hour and 24-hour observations must be appended after their respective windows.

## Reproduction sources

- [Benchmark harness](../../packages/scripts/src/onnxtr-benchmark.ts)
- [Benchmark helpers](../../packages/scripts/src/onnxtr-benchmark-lib.ts)
- [Isolated benchmark infrastructure](../../sst.onnxtr-benchmark.config.ts)
- [Benchmark handler mode](../../packages/onnxtr-lambda/handler.py)
- [Container variants](../../packages/onnxtr-lambda/Dockerfile)
- [AWS Lambda direct invocation](https://docs.aws.amazon.com/lambda/latest/api/API_Invoke.html)
- [AWS Lambda container images](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html)
- [AWS Lambda memory and CPU](https://docs.aws.amazon.com/lambda/latest/dg/configuration-memory.html)
- [AWS Lambda concurrency](https://docs.aws.amazon.com/lambda/latest/dg/configuration-concurrency.html)
- [CloudWatch Logs Insights](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html)
