import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(resolve(import.meta.dir, "onnxtr-benchmark.ts"), "utf8");

describe("OnnxTR benchmark invocation scheduling", () => {
  test("parallelizes preflight while preserving target order", () => {
    expect(source).toContain(
      "Promise.all(targetDefinitions.map((definition) => validateTarget(definition)))",
    );
    expect(source).toContain(
      "const [accountSettings, targets, corpus] = await Promise.all([",
    );
    expect(source).toContain(
      "const [eventSourceCount, functionUrl, imageSizeBytes] = await Promise.all([",
    );
  });

  test("deduplicates concurrent image lookups and evicts failures", () => {
    expect(source).toContain("new Map<string, Promise<number>>()");
    expect(source).toContain(
      "getOrCreateRetryablePromise(imageSizeCache, resolvedImage",
    );
  });

  test("runs one six-target cohort at a time", () => {
    expect(source.match(/const cohort = await Promise\.all\(/g)).toHaveLength(2);
    expect(source).toContain("rotatedTargets.map(async (target)");
    expect(source).toContain("maxBenchmarkConcurrency: targets.length");
    expect(source).toContain("productionConcurrencyHeadroom: 10 - targets.length");
  });

  test("still rejects measured cold starts in the warm phase", () => {
    expect(source).toContain("sample.lambdaInitDurationMs === null");
    expect(source).toContain("sample.modelInitMs === 0");
    expect(source).toContain("attempt <= 3");
    expect(source).toContain("excludedWarmRetryCount: warmRetryCount");
  });

  test("preflight-only exits before the measurement loops", () => {
    const preflightExit = source.indexOf(
      'if (process.env.ONNXTR_BENCHMARK_PREFLIGHT_ONLY === "TRUE")',
    );
    const coldLoop = source.indexOf(
      "for (let repetition = 1; repetition <= COLD_RUNS_PER_VARIANT",
    );
    expect(preflightExit).toBeGreaterThan(0);
    expect(coldLoop).toBeGreaterThan(preflightExit);
  });
});
