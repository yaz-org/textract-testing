import { describe, expect, test } from "bun:test";
import {
  assertBenchmarkSummary,
  classifyCorpusFamily,
  gbSeconds,
  getOrCreateRetryablePromise,
  parseLambdaReport,
  percentile,
  quantileIndex,
  selectCorpus,
  type CorpusObject,
} from "./onnxtr-benchmark-lib";

describe("retryable promise cache", () => {
  test("deduplicates concurrent lookups", async () => {
    const cache = new Map<string, Promise<number>>();
    let calls = 0;
    const create = async () => {
      calls += 1;
      await Promise.resolve();
      return 42;
    };

    expect(
      await Promise.all([
        getOrCreateRetryablePromise(cache, "image", create),
        getOrCreateRetryablePromise(cache, "image", create),
        getOrCreateRetryablePromise(cache, "image", create),
      ]),
    ).toEqual([42, 42, 42]);
    expect(calls).toBe(1);
  });

  test("evicts a failed lookup so it can be retried", async () => {
    const cache = new Map<string, Promise<number>>();
    let calls = 0;
    const create = async () => {
      calls += 1;
      if (calls === 1) throw new Error("transient");
      return 42;
    };

    await expect(
      getOrCreateRetryablePromise(cache, "image", create),
    ).rejects.toThrow("transient");
    expect(await getOrCreateRetryablePromise(cache, "image", create)).toBe(42);
    expect(calls).toBe(2);
  });
});

describe("corpus selection", () => {
  test("classifies supported filename families", () => {
    expect(classifyCorpusFamily("1780000000-ACopaque.jpeg")).toBe("AC");
    expect(classifyCorpusFamily("1780000000-3Aopaque.png")).toBe("3A");
    expect(classifyCorpusFamily("1780000000-4Aopaque.jpg")).toBe("4A");
    expect(classifyCorpusFamily("prefix_AC_file.jpg")).toBe("AC");
    expect(classifyCorpusFamily("prefix-3A-file.png")).toBe("3A");
    expect(classifyCorpusFamily("folder/prefix_4A_file.jpeg")).toBe("4A");
    expect(classifyCorpusFamily("prefix_3B_file.jpg")).toBeNull();
  });

  test("uses deterministic nearest-rank quantiles", () => {
    expect(quantileIndex(100, 0.25)).toBe(24);
    expect(quantileIndex(100, 0.5)).toBe(49);
    expect(quantileIndex(100, 0.95)).toBe(94);
  });

  test("selects exactly four fixtures from each family", () => {
    const objects: CorpusObject[] = [];
    for (const family of ["AC", "3A", "4A"] as const) {
      for (let index = 0; index < 20; index += 1) {
        objects.push({ family, key: `${family}-${index}`, size: index });
      }
    }
    const selected = selectCorpus(objects);
    expect(selected).toHaveLength(12);
    expect(selected.filter((fixture) => fixture.family === "AC")).toHaveLength(4);
    expect(selected.map((fixture) => fixture.label)).toEqual(
      Array.from({ length: 12 }, (_, index) =>
        `fixture-${String(index + 1).padStart(2, "0")}`,
      ),
    );
    expect(selectCorpus(objects)).toEqual(selected);
  });

  test("fails when a family has fewer than four objects", () => {
    expect(() =>
      selectCorpus([
        { family: "AC", key: "one", size: 1 },
        { family: "3A", key: "two", size: 1 },
        { family: "4A", key: "three", size: 1 },
      ]),
    ).toThrow("does not contain enough objects");
  });
});

describe("measurement helpers", () => {
  test("calculates nearest-rank percentiles and GB-seconds", () => {
    expect(percentile([5, 1, 3, 4, 2], 0.5)).toBe(3);
    expect(percentile([5, 1, 3, 4, 2], 0.95)).toBe(5);
    expect(gbSeconds(2048, 1500)).toBe(3);
  });

  test("parses Lambda REPORT records with and without init duration", () => {
    const cold = parseLambdaReport(
      "REPORT RequestId: request\tDuration: 100.25 ms\tBilled Duration: 101 ms\tMemory Size: 2048 MB\tMax Memory Used: 512 MB\tInit Duration: 20.50 ms\n",
    );
    expect(cold).toEqual({
      durationMs: 100.25,
      billedDurationMs: 101,
      memorySizeMb: 2048,
      maxMemoryUsedMb: 512,
      initDurationMs: 20.5,
    });
    expect(
      parseLambdaReport(
        "REPORT RequestId: request\tDuration: 10 ms\tBilled Duration: 10 ms\tMemory Size: 3072 MB\tMax Memory Used: 600 MB\n",
      ).initDurationMs,
    ).toBeNull();
  });

  test("validates the safe benchmark response shape", () => {
    const summary = {
      downloadMs: 1,
      decodeMs: 2,
      modelInitMs: 3,
      ocrMs: 4,
      serializationMs: 5,
      totalProcessingMs: 15,
      documentBytes: 100,
      pageCount: 1,
      wordCount: 2,
      averageConfidence: 0.9,
      outputDigest: "a".repeat(64),
    };
    expect(assertBenchmarkSummary(summary)).toEqual(summary);
    expect(() => assertBenchmarkSummary({ ...summary, outputDigest: "bad" })).toThrow(
      "digest",
    );
  });
});
