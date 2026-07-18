export const CORPUS_FAMILIES = ["AC", "3A", "4A"] as const;
export const CORPUS_QUANTILES = [0.25, 0.5, 0.75, 0.95] as const;

export type CorpusFamily = (typeof CORPUS_FAMILIES)[number];

export interface CorpusObject {
  key: string;
  size: number;
  family: CorpusFamily;
}

export interface Fixture extends CorpusObject {
  label: string;
  quantile: number;
}

export interface LambdaReport {
  durationMs: number;
  billedDurationMs: number;
  memorySizeMb: number;
  maxMemoryUsedMb: number;
  initDurationMs: number | null;
}

export interface BenchmarkSummary {
  downloadMs: number;
  decodeMs: number;
  modelInitMs: number;
  ocrMs: number;
  serializationMs: number;
  totalProcessingMs: number;
  documentBytes: number;
  pageCount: number;
  wordCount: number;
  averageConfidence: number;
  outputDigest: string;
}

export async function getOrCreateRetryablePromise<Key, Value>(
  cache: Map<Key, Promise<Value>>,
  key: Key,
  create: () => Promise<Value>,
): Promise<Value> {
  const cached = cache.get(key);
  if (cached !== undefined) {
    return cached;
  }

  const lookup = create();
  cache.set(key, lookup);
  try {
    return await lookup;
  } catch (error) {
    if (cache.get(key) === lookup) {
      cache.delete(key);
    }
    throw error;
  }
}

export function classifyCorpusFamily(key: string): CorpusFamily | null {
  const basename = key.split("/").at(-1) ?? key;
  const match = basename.match(
    /^(?:\d+-(AC|3A|4A)|(?:.*[_-])?(AC|3A|4A)(?:[_-]|\.))/i,
  );
  return (
    ((match?.[1] ?? match?.[2])?.toUpperCase() as CorpusFamily | undefined) ?? null
  );
}

export function quantileIndex(length: number, quantile: number): number {
  if (!Number.isInteger(length) || length < 1) {
    throw new Error("Quantile input must contain at least one value");
  }
  if (!(quantile > 0 && quantile <= 1)) {
    throw new Error("Quantile must be greater than zero and at most one");
  }
  return Math.min(length - 1, Math.ceil(length * quantile) - 1);
}

export function selectCorpus(objects: CorpusObject[]): Fixture[] {
  const selected: Fixture[] = [];
  for (const family of CORPUS_FAMILIES) {
    const familyObjects = objects
      .filter((object) => object.family === family)
      .toSorted(
        (left, right) => left.size - right.size || left.key.localeCompare(right.key),
      );
    if (familyObjects.length < CORPUS_QUANTILES.length) {
      throw new Error(`Corpus family ${family} does not contain enough objects`);
    }
    for (const quantile of CORPUS_QUANTILES) {
      const object = familyObjects[quantileIndex(familyObjects.length, quantile)];
      selected.push({ ...object, label: "", quantile });
    }
  }
  return selected.map((fixture, index) => ({
    ...fixture,
    label: `fixture-${String(index + 1).padStart(2, "0")}`,
  }));
}

export function percentile(values: number[], quantile: number): number {
  if (values.length === 0) {
    throw new Error("Cannot calculate a percentile for an empty collection");
  }
  const sorted = values.toSorted((left, right) => left - right);
  return sorted[quantileIndex(sorted.length, quantile)];
}

export function gbSeconds(memoryMb: number, billedDurationMs: number): number {
  return (memoryMb / 1024) * (billedDurationMs / 1000);
}

export function parseLambdaReport(logs: string): LambdaReport {
  const report = logs
    .split("\n")
    .find((line) => line.startsWith("REPORT RequestId:"));
  if (!report) {
    throw new Error("Lambda REPORT record was not present in the invocation tail");
  }

  const read = (label: string) => {
    const match = report.match(new RegExp(`${label}:\\s+([0-9.]+)\\s+ms`));
    if (!match) {
      throw new Error(`Lambda REPORT record is missing ${label}`);
    }
    return Number.parseFloat(match[1]);
  };
  const readMemory = (label: string) => {
    const match = report.match(new RegExp(`${label}:\\s+([0-9.]+)\\s+MB`));
    if (!match) {
      throw new Error(`Lambda REPORT record is missing ${label}`);
    }
    return Number.parseFloat(match[1]);
  };
  const initMatch = report.match(/Init Duration:\s+([0-9.]+)\s+ms/);

  return {
    durationMs: read("Duration"),
    billedDurationMs: read("Billed Duration"),
    memorySizeMb: readMemory("Memory Size"),
    maxMemoryUsedMb: readMemory("Max Memory Used"),
    initDurationMs: initMatch ? Number.parseFloat(initMatch[1]) : null,
  };
}

export function assertBenchmarkSummary(value: unknown): BenchmarkSummary {
  if (!value || typeof value !== "object") {
    throw new Error("Benchmark response did not contain a summary object");
  }
  const summary = value as Record<string, unknown>;
  const numericFields = [
    "downloadMs",
    "decodeMs",
    "modelInitMs",
    "ocrMs",
    "serializationMs",
    "totalProcessingMs",
    "documentBytes",
    "pageCount",
    "wordCount",
    "averageConfidence",
  ] as const;
  for (const field of numericFields) {
    if (typeof summary[field] !== "number" || !Number.isFinite(summary[field])) {
      throw new Error(`Benchmark summary field ${field} is invalid`);
    }
  }
  if (
    typeof summary.outputDigest !== "string" ||
    !/^[a-f0-9]{64}$/.test(summary.outputDigest)
  ) {
    throw new Error("Benchmark output digest is invalid");
  }
  return summary as unknown as BenchmarkSummary;
}
