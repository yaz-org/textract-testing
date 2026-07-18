import {
  GetFunctionCommand,
  GetAccountSettingsCommand,
  GetFunctionConcurrencyCommand,
  GetFunctionConfigurationCommand,
  GetFunctionUrlConfigCommand,
  InvokeCommand,
  LambdaClient,
  UpdateFunctionConfigurationCommand,
  paginateListEventSourceMappings,
  waitUntilFunctionUpdatedV2,
} from "@aws-sdk/client-lambda";
import { DescribeImagesCommand, ECRClient } from "@aws-sdk/client-ecr";
import {
  GetObjectCommand,
  S3Client,
  paginateListObjectsV2,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Resource } from "sst";
import {
  assertBenchmarkSummary,
  classifyCorpusFamily,
  gbSeconds,
  getOrCreateRetryablePromise,
  parseLambdaReport,
  percentile,
  selectCorpus,
  type BenchmarkSummary,
  type CorpusObject,
  type Fixture,
} from "./onnxtr-benchmark-lib";

const BENCHMARK_APP_NAME = "textract-testing-onnxtr-benchmark";
const CALLBACK_URL = "https://benchmark.invalid/callback";
const COLD_RUNS_PER_VARIANT = 5;
const WARM_REPETITIONS_PER_FIXTURE = 5;
const PRESIGNED_URL_SECONDS = 15 * 60;

type BytecodeMode = "stripped" | "precompiled";
type RunClassification = "cold" | "warm";

interface TargetDefinition {
  resourceKey: string;
  variant: string;
  bytecodeMode: BytecodeMode;
  memoryMb: 2048 | 2560 | 3008;
}

interface ValidatedTarget extends TargetDefinition {
  functionName: string;
  imageDigest: string;
  imageSizeBytes: number;
}

interface BenchmarkSample extends BenchmarkSummary {
  variant: string;
  bytecodeMode: BytecodeMode;
  memoryMb: number;
  fixtureLabel: string;
  classification: RunClassification;
  repetition: number;
  wallMs: number;
  lambdaDurationMs: number;
  billedDurationMs: number;
  lambdaInitDurationMs: number | null;
  maxMemoryUsedMb: number;
  gbSeconds: number;
  imageDigest: string;
  imageSizeBytes: number;
}

interface Distribution {
  p50: number;
  p90: number;
  p95: number;
  maximum: number;
}

const targetDefinitions: TargetDefinition[] = [
  {
    resourceKey: "OnnxTRBenchmarkStripped2048",
    variant: "stripped-2048",
    bytecodeMode: "stripped",
    memoryMb: 2048,
  },
  {
    resourceKey: "OnnxTRBenchmarkStripped2560",
    variant: "stripped-2560",
    bytecodeMode: "stripped",
    memoryMb: 2560,
  },
  {
    resourceKey: "OnnxTRBenchmarkStripped3008",
    variant: "stripped-3008",
    bytecodeMode: "stripped",
    memoryMb: 3008,
  },
  {
    resourceKey: "OnnxTRBenchmarkPrecompiled2048",
    variant: "precompiled-2048",
    bytecodeMode: "precompiled",
    memoryMb: 2048,
  },
  {
    resourceKey: "OnnxTRBenchmarkPrecompiled2560",
    variant: "precompiled-2560",
    bytecodeMode: "precompiled",
    memoryMb: 2560,
  },
  {
    resourceKey: "OnnxTRBenchmarkPrecompiled3008",
    variant: "precompiled-3008",
    bytecodeMode: "precompiled",
    memoryMb: 3008,
  },
];

const lambda = new LambdaClient({ maxAttempts: 3 });
const ecr = new ECRClient({ maxAttempts: 3 });
const s3 = new S3Client({ maxAttempts: 3 });
const imageSizeCache = new Map<string, Promise<number>>();

function fail(message: string): never {
  throw new Error(message);
}

function resourceFunctionName(resourceKey: string): string {
  const resources = Resource as unknown as Record<string, { name?: unknown }>;
  const name = resources[resourceKey]?.name;
  if (typeof name !== "string" || !name) {
    return fail(`SST resource ${resourceKey} is unavailable`);
  }
  return name;
}

function errorName(error: unknown): string | null {
  return error && typeof error === "object" && "name" in error
    ? String(error.name)
    : null;
}

async function hasFunctionUrl(functionName: string): Promise<boolean> {
  try {
    await lambda.send(new GetFunctionUrlConfigCommand({ FunctionName: functionName }));
    return true;
  } catch (error) {
    if (errorName(error) === "ResourceNotFoundException") {
      return false;
    }
    throw error;
  }
}

async function getImageSizeBytes(resolvedImage: string, digest: string): Promise<number> {
  return getOrCreateRetryablePromise(imageSizeCache, resolvedImage, async () => {
    const match = resolvedImage.match(/^[^/]+\/(.+)@(sha256:[a-f0-9]{64})$/);
    if (!match || match[2] !== digest) {
      return fail("Benchmark image URI is not a supported immutable ECR reference");
    }
    const response = await ecr.send(
      new DescribeImagesCommand({
        repositoryName: match[1],
        imageIds: [{ imageDigest: digest }],
      }),
    );
    const imageSizeBytes = response.imageDetails?.[0]?.imageSizeInBytes;
    if (typeof imageSizeBytes !== "number" || imageSizeBytes <= 0) {
      return fail("Benchmark image size is unavailable from ECR");
    }
    return imageSizeBytes;
  });
}

async function countEventSourceMappings(functionName: string): Promise<number> {
  let count = 0;
  for await (const page of paginateListEventSourceMappings(
    { client: lambda },
    { FunctionName: functionName },
  )) {
    count += page.EventSourceMappings?.length ?? 0;
  }
  return count;
}

async function validateTarget(definition: TargetDefinition): Promise<ValidatedTarget> {
  const functionName = resourceFunctionName(definition.resourceKey);
  if (!functionName.includes("OnnxTRBenchmark")) {
    return fail(`Target ${definition.variant} is outside the isolated benchmark app`);
  }

  const [fn, concurrency] = await Promise.all([
    lambda.send(new GetFunctionCommand({ FunctionName: functionName })),
    lambda.send(new GetFunctionConcurrencyCommand({ FunctionName: functionName })),
  ]);
  const configuration = fn.Configuration;
  if (
    configuration?.State !== "Active" ||
    configuration.LastUpdateStatus !== "Successful"
  ) {
    return fail(`Target ${definition.variant} is not active and ready`);
  }
  if (configuration.PackageType !== "Image") {
    return fail(`Target ${definition.variant} is not a container-image Lambda`);
  }
  if (configuration.MemorySize !== definition.memoryMb) {
    return fail(`Target ${definition.variant} has unexpected memory`);
  }
  if (configuration.Timeout !== 180) {
    return fail(`Target ${definition.variant} has unexpected timeout`);
  }
  if (configuration.EphemeralStorage?.Size !== 512) {
    return fail(`Target ${definition.variant} has unexpected ephemeral storage`);
  }
  if (
    configuration.Architectures?.length !== 1 ||
    configuration.Architectures[0] !== "x86_64"
  ) {
    return fail(`Target ${definition.variant} has unexpected architecture`);
  }
  const environment = configuration.Environment?.Variables ?? {};
  if (
    environment.ONNXTR_BENCHMARK_MODE !== "TRUE" ||
    environment.ONNXTR_BYTECODE_MODE !== definition.bytecodeMode
  ) {
    return fail(`Target ${definition.variant} has unexpected benchmark environment`);
  }
  if (concurrency.ReservedConcurrentExecutions !== undefined) {
    return fail(`Target ${definition.variant} has unexpected reserved concurrency`);
  }

  const resolvedImage = fn.Code?.ResolvedImageUri;
  const digest = resolvedImage?.match(/@(sha256:[a-f0-9]{64})$/)?.[1];
  if (!resolvedImage || !digest) {
    return fail(`Target ${definition.variant} does not expose an immutable image digest`);
  }

  const [eventSourceCount, functionUrl, imageSizeBytes] = await Promise.all([
    countEventSourceMappings(functionName),
    hasFunctionUrl(functionName),
    getImageSizeBytes(resolvedImage, digest),
  ]);
  if (eventSourceCount !== 0) {
    return fail(`Target ${definition.variant} has an event-source mapping`);
  }
  if (functionUrl) {
    return fail(`Target ${definition.variant} has a Function URL`);
  }

  return {
    ...definition,
    functionName,
    imageDigest: digest,
    imageSizeBytes,
  };
}

async function listCorpus(bucketName: string): Promise<CorpusObject[]> {
  const objects: CorpusObject[] = [];
  for await (const page of paginateListObjectsV2(
    { client: s3 },
    { Bucket: bucketName },
  )) {
    for (const object of page.Contents ?? []) {
      if (typeof object.Key !== "string" || typeof object.Size !== "number") {
        continue;
      }
      const family = classifyCorpusFamily(object.Key);
      if (!family || !/\.(?:jpe?g|png)$/i.test(object.Key)) {
        continue;
      }
      objects.push({ key: object.Key, size: object.Size, family });
    }
  }
  return objects;
}

async function presignFixture(bucketName: string, fixture: Fixture): Promise<string> {
  return getSignedUrl(
    s3,
    new GetObjectCommand({ Bucket: bucketName, Key: fixture.key }),
    { expiresIn: PRESIGNED_URL_SECONDS },
  );
}

async function forceColdEnvironment(target: ValidatedTarget): Promise<void> {
  const current = await lambda.send(
    new GetFunctionConfigurationCommand({ FunctionName: target.functionName }),
  );
  await lambda.send(
    new UpdateFunctionConfigurationCommand({
      FunctionName: target.functionName,
      RevisionId: current.RevisionId,
      Environment: {
        Variables: {
          ...(current.Environment?.Variables ?? {}),
          BENCHMARK_COLD_TOKEN: randomUUID(),
        },
      },
    }),
  );
  const waited = await waitUntilFunctionUpdatedV2(
    { client: lambda, maxWaitTime: 180, minDelay: 2, maxDelay: 5 },
    { FunctionName: target.functionName },
  );
  if (waited.state !== "SUCCESS") {
    return fail(`Target ${target.variant} did not become ready after cold reset`);
  }
}

async function invokeBenchmark(
  target: ValidatedTarget,
  fixture: Fixture,
  classification: RunClassification,
  repetition: number,
  bucketName: string,
): Promise<BenchmarkSample> {
  const downloadUrl = await presignFixture(bucketName, fixture);
  const payload = {
    Records: [
      {
        messageId: `benchmark-${randomUUID()}`,
        body: JSON.stringify({ downloadUrl, callbackUrl: CALLBACK_URL }),
      },
    ],
  };
  const started = performance.now();
  const response = await lambda.send(
    new InvokeCommand({
      FunctionName: target.functionName,
      InvocationType: "RequestResponse",
      LogType: "Tail",
      Payload: JSON.stringify(payload),
    }),
  );
  const wallMs = Math.round(performance.now() - started);
  if (response.FunctionError) {
    return fail(`Target ${target.variant} returned a Lambda function error`);
  }
  if (!response.Payload) {
    return fail(`Target ${target.variant} returned no response payload`);
  }

  let decoded: unknown;
  try {
    decoded = JSON.parse(new TextDecoder().decode(response.Payload));
  } catch {
    return fail(`Target ${target.variant} returned invalid JSON`);
  }
  if (!decoded || typeof decoded !== "object") {
    return fail(`Target ${target.variant} returned an invalid response`);
  }
  const result = decoded as Record<string, unknown>;
  if (!Array.isArray(result.batchItemFailures)) {
    return fail(`Target ${target.variant} omitted batch failure data`);
  }
  if (result.batchItemFailures.length !== 0) {
    return fail(`Target ${target.variant} reported a benchmark record failure`);
  }
  const benchmark = assertBenchmarkSummary(result.benchmark);

  const logs = response.LogResult
    ? Buffer.from(response.LogResult, "base64").toString("utf8")
    : "";
  if (logs.includes('"event":"callback_completed"')) {
    return fail(`Target ${target.variant} attempted a benchmark callback`);
  }
  if (logs.includes('"event":"failure_callback_failed"')) {
    return fail(`Target ${target.variant} attempted a benchmark failure callback`);
  }
  const report = parseLambdaReport(logs);
  if (report.memorySizeMb !== target.memoryMb) {
    return fail(`Target ${target.variant} REPORT memory does not match its configuration`);
  }

  return {
    ...benchmark,
    variant: target.variant,
    bytecodeMode: target.bytecodeMode,
    memoryMb: target.memoryMb,
    fixtureLabel: fixture.label,
    classification,
    repetition,
    wallMs,
    lambdaDurationMs: report.durationMs,
    billedDurationMs: report.billedDurationMs,
    lambdaInitDurationMs: report.initDurationMs,
    maxMemoryUsedMb: report.maxMemoryUsedMb,
    gbSeconds: gbSeconds(target.memoryMb, report.billedDurationMs),
    imageDigest: target.imageDigest,
    imageSizeBytes: target.imageSizeBytes,
  };
}

async function invokeWarmBenchmark(
  target: ValidatedTarget,
  fixture: Fixture,
  repetition: number,
  bucketName: string,
): Promise<{ sample: BenchmarkSample; retryCount: number }> {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const sample = await invokeBenchmark(
      target,
      fixture,
      "warm",
      repetition,
      bucketName,
    );
    if (sample.lambdaInitDurationMs === null && sample.modelInitMs === 0) {
      return { sample, retryCount: attempt - 1 };
    }
    console.log(
      JSON.stringify({
        event: "benchmark_warm_environment_recycled",
        variant: target.variant,
        fixtureLabel: fixture.label,
        repetition,
        attempt,
      }),
    );
  }
  return fail(`Target ${target.variant} did not provide a stable warm environment`);
}

function distribution(values: number[]): Distribution {
  return {
    p50: percentile(values, 0.5),
    p90: percentile(values, 0.9),
    p95: percentile(values, 0.95),
    maximum: Math.max(...values),
  };
}

function assertEquivalentOutput(
  baselines: Map<string, Pick<BenchmarkSummary, "outputDigest" | "pageCount" | "wordCount">>,
  sample: BenchmarkSample,
): void {
  const baseline = baselines.get(sample.fixtureLabel);
  if (!baseline) {
    baselines.set(sample.fixtureLabel, {
      outputDigest: sample.outputDigest,
      pageCount: sample.pageCount,
      wordCount: sample.wordCount,
    });
    return;
  }
  if (
    baseline.outputDigest !== sample.outputDigest ||
    baseline.pageCount !== sample.pageCount ||
    baseline.wordCount !== sample.wordCount
  ) {
    fail(`OCR output mismatch detected for ${sample.fixtureLabel}`);
  }
}

function aggregate(samples: BenchmarkSample[], targets: ValidatedTarget[]) {
  const variants = targets.map((target) => {
    const variantSamples = samples.filter((sample) => sample.variant === target.variant);
    const cold = variantSamples.filter((sample) => sample.classification === "cold");
    const warm = variantSamples.filter((sample) => sample.classification === "warm");
    const stage = (field: keyof BenchmarkSummary) => ({
      p50: percentile(variantSamples.map((sample) => Number(sample[field])), 0.5),
      p95: percentile(variantSamples.map((sample) => Number(sample[field])), 0.95),
    });
    return {
      variant: target.variant,
      bytecodeMode: target.bytecodeMode,
      memoryMb: target.memoryMb,
      sampleCount: variantSamples.length,
      imageDigest: target.imageDigest,
      imageSizeBytes: target.imageSizeBytes,
      totalProcessingMs: distribution(
        variantSamples.map((sample) => sample.totalProcessingMs),
      ),
      coldTotalProcessingMs: distribution(
        cold.map((sample) => sample.totalProcessingMs),
      ),
      warmTotalProcessingMs: distribution(
        warm.map((sample) => sample.totalProcessingMs),
      ),
      stages: {
        downloadMs: stage("downloadMs"),
        decodeMs: stage("decodeMs"),
        modelInitMs: stage("modelInitMs"),
        ocrMs: stage("ocrMs"),
        serializationMs: stage("serializationMs"),
      },
      maxMemoryUsedMb: Math.max(...variantSamples.map((sample) => sample.maxMemoryUsedMb)),
      gbSeconds: {
        median: percentile(variantSamples.map((sample) => sample.gbSeconds), 0.5),
        p95: percentile(variantSamples.map((sample) => sample.gbSeconds), 0.95),
      },
      errorCount: 0,
      outputMismatchCount: 0,
      imageSizeDifferenceBytes: 0,
      disqualifications: [] as string[],
    };
  });

  for (const variant of variants) {
    const stripped = variants.find(
      (candidate) =>
        candidate.bytecodeMode === "stripped" && candidate.memoryMb === variant.memoryMb,
    );
    if (stripped) {
      variant.imageSizeDifferenceBytes = variant.imageSizeBytes - stripped.imageSizeBytes;
    }
    if (variant.maxMemoryUsedMb >= variant.memoryMb * 0.9) {
      variant.disqualifications.push("maximum memory reached 90% of configured memory");
    }
    if (variant.coldTotalProcessingMs.maximum > 150_000) {
      variant.disqualifications.push("cold processing exceeded 150 seconds");
    }
    if (variant.warmTotalProcessingMs.p95 > 15_000) {
      variant.disqualifications.push("warm p95 exceeded 15 seconds");
    }
  }

  const baseline = variants.find((variant) => variant.variant === "stripped-2048");
  if (!baseline) {
    fail("The stripped-2048 baseline is missing");
  }
  for (const variant of variants) {
    if (variant.warmTotalProcessingMs.p95 > baseline.warmTotalProcessingMs.p95 * 1.05) {
      variant.disqualifications.push("warm p95 regressed by more than 5% from baseline");
    }
    if (variant.bytecodeMode === "precompiled") {
      const stripped = variants.find(
        (candidate) =>
          candidate.bytecodeMode === "stripped" && candidate.memoryMb === variant.memoryMb,
      );
      if (
        stripped &&
        variant.coldTotalProcessingMs.p50 > stripped.coldTotalProcessingMs.p50 * 0.9
      ) {
        variant.disqualifications.push(
          "precompiled bytecode did not improve cold median by at least 10%",
        );
      }
    }
  }

  const qualifying = variants.filter((variant) => variant.disqualifications.length === 0);
  const coldImproved = qualifying.filter(
    (variant) =>
      variant.coldTotalProcessingMs.p95 <= baseline.coldTotalProcessingMs.p95 * 0.85,
  );
  const preferred = coldImproved.length > 0 ? coldImproved : qualifying;
  const lowestMedianGbSeconds = Math.min(
    ...preferred.map((variant) => variant.gbSeconds.median),
  );
  const costEligible = preferred
    .filter((variant) => variant.gbSeconds.median <= lowestMedianGbSeconds * 1.1)
    .toSorted(
      (left, right) =>
        left.warmTotalProcessingMs.p95 - right.warmTotalProcessingMs.p95 ||
        left.totalProcessingMs.p50 - right.totalProcessingMs.p50,
    );
  const winner = costEligible[0] ?? null;

  return {
    variants,
    recommendation: winner
      ? {
          variant: winner.variant,
          reason:
            "Lowest-latency qualifying variant within 10% of the lowest qualifying median GB-seconds.",
        }
      : null,
  };
}

async function main(): Promise<void> {
  if (process.env.SST_STAGE !== "production") {
    fail("The isolated benchmark application must run in the production stage");
  }
  const bucketName = process.env.BENCHMARK_BUCKET_NAME;
  if (!bucketName) {
    fail("BENCHMARK_BUCKET_NAME is required");
  }

  const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
  const runId = new Date().toISOString().replaceAll(":", "-");
  const outputDirectory = resolve(repositoryRoot, "tmp/onnxtr-benchmark", runId);
  await mkdir(outputDirectory, { recursive: true });

  console.log(JSON.stringify({ event: "benchmark_preflight_started", variants: 6 }));
  const [accountSettings, targets, corpus] = await Promise.all([
    lambda.send(new GetAccountSettingsCommand({})),
    Promise.all(targetDefinitions.map((definition) => validateTarget(definition))),
    listCorpus(bucketName),
  ]);
  if (
    accountSettings.AccountLimit?.ConcurrentExecutions !== 10 ||
    accountSettings.AccountLimit.UnreservedConcurrentExecutions !== 10
  ) {
    fail(
      "The no-reserved-concurrency exception is allowed only while the account quota is exactly 10 and entirely unreserved",
    );
  }
  for (const bytecodeMode of ["stripped", "precompiled"] as const) {
    const digests = new Set(
      targets
        .filter((target) => target.bytecodeMode === bytecodeMode)
        .map((target) => target.imageDigest),
    );
    if (digests.size !== 1) {
      fail(`The ${bytecodeMode} memory tiers do not share one immutable image`);
    }
  }
  const fixtures = selectCorpus(corpus);
  await writeFile(
    resolve(outputDirectory, "private-corpus-manifest.json"),
    `${JSON.stringify(
      {
        createdAt: new Date().toISOString(),
        fixtures: fixtures.map(({ label, family, quantile, size, key }) => ({
          label,
          family,
          quantile,
          size,
          key,
        })),
      },
      null,
      2,
    )}\n`,
    { encoding: "utf8", mode: 0o600 },
  );
  console.log(
    JSON.stringify({
      event: "benchmark_preflight_completed",
      fixtureCount: fixtures.length,
      corpusFamilyCounts: Object.fromEntries(
        ["AC", "3A", "4A"].map((family) => [
          family,
          corpus.filter((object) => object.family === family).length,
        ]),
      ),
    }),
  );
  if (process.env.ONNXTR_BENCHMARK_PREFLIGHT_ONLY === "TRUE") {
    console.log(JSON.stringify({ event: "benchmark_preflight_only_completed" }));
    return;
  }

  const medianFixture = fixtures.toSorted(
    (left, right) => left.size - right.size || left.label.localeCompare(right.label),
  )[Math.ceil(fixtures.length / 2) - 1];
  const samples: BenchmarkSample[] = [];
  let warmRetryCount = 0;
  const outputBaselines = new Map<
    string,
    Pick<BenchmarkSummary, "outputDigest" | "pageCount" | "wordCount">
  >();

  for (let repetition = 1; repetition <= COLD_RUNS_PER_VARIANT; repetition += 1) {
    const rotation = (repetition - 1) % targets.length;
    const rotatedTargets = [...targets.slice(rotation), ...targets.slice(0, rotation)];
    const cohort = await Promise.all(
      rotatedTargets.map(async (target) => {
        await forceColdEnvironment(target);
        const sample = await invokeBenchmark(
          target,
          medianFixture,
          "cold",
          repetition,
          bucketName,
        );
        return { target, sample };
      }),
    );
    for (const { target, sample } of cohort) {
      assertEquivalentOutput(outputBaselines, sample);
      samples.push(sample);
      console.log(
        JSON.stringify({
          event: "benchmark_sample_completed",
          variant: target.variant,
          fixtureLabel: medianFixture.label,
          classification: "cold",
          repetition,
          totalProcessingMs: sample.totalProcessingMs,
        }),
      );
    }
  }

  for (
    let repetition = 1;
    repetition <= WARM_REPETITIONS_PER_FIXTURE;
    repetition += 1
  ) {
    const rotation = (repetition - 1) % targets.length;
    const rotatedTargets = [...targets.slice(rotation), ...targets.slice(0, rotation)];
    for (const fixture of fixtures) {
      const cohort = await Promise.all(
        rotatedTargets.map(async (target) => ({
          target,
          ...(await invokeWarmBenchmark(target, fixture, repetition, bucketName)),
        })),
      );
      for (const { target, sample, retryCount } of cohort) {
        warmRetryCount += retryCount;
        assertEquivalentOutput(outputBaselines, sample);
        samples.push(sample);
        console.log(
          JSON.stringify({
            event: "benchmark_sample_completed",
            variant: target.variant,
            fixtureLabel: fixture.label,
            classification: "warm",
            repetition,
            totalProcessingMs: sample.totalProcessingMs,
          }),
        );
      }
    }
  }

  if (samples.length !== 390) {
    fail("Benchmark did not produce the required 390 samples");
  }
  const aggregateResults = aggregate(samples, targets);
  const sanitizedResults = {
    schemaVersion: 1,
    createdAt: new Date().toISOString(),
    protocol: {
      coldRunsPerVariant: COLD_RUNS_PER_VARIANT,
      warmRepetitionsPerFixture: WARM_REPETITIONS_PER_FIXTURE,
      fixtureCount: fixtures.length,
      totalInvocations: samples.length,
      directInvocationOnly: true,
      maxBenchmarkConcurrency: targets.length,
      productionConcurrencyHeadroom: 10 - targets.length,
      excludedWarmRetryCount: warmRetryCount,
      totalDirectInvocationAttempts: samples.length + warmRetryCount,
    },
    fixtures: fixtures.map(({ label, family, quantile, size }) => ({
      label,
      family,
      quantile,
      size,
    })),
    samples,
    ...aggregateResults,
  };
  await writeFile(
    resolve(outputDirectory, "results.json"),
    `${JSON.stringify(sanitizedResults, null, 2)}\n`,
    { encoding: "utf8", mode: 0o600 },
  );
  console.log(
    JSON.stringify({
      event: "benchmark_completed",
      totalInvocations: samples.length,
      recommendation: aggregateResults.recommendation?.variant ?? null,
      resultsDirectory: outputDirectory,
    }),
  );
}

await main().catch((error: unknown) => {
  console.error(
    JSON.stringify({
      event: "benchmark_failed",
      errorType: errorName(error) ?? "UnknownError",
      message:
        error instanceof Error && !/[?&=]|https?:|s3|arn:|\.amazonaws\.com/i.test(error.message)
          ? error.message
          : "Benchmark failed with a redacted error.",
    }),
  );
  process.exitCode = 1;
});
