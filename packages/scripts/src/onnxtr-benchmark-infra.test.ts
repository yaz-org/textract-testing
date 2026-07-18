import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const source = readFileSync(
  resolve(import.meta.dir, "../../../sst.onnxtr-benchmark.config.ts"),
  "utf8",
);

describe("isolated OnnxTR benchmark infrastructure", () => {
  test("declares the exact six-function memory and bytecode matrix", () => {
    const resources = [
      "OnnxTRBenchmarkStripped2048",
      "OnnxTRBenchmarkStripped2560",
      "OnnxTRBenchmarkStripped3008",
      "OnnxTRBenchmarkPrecompiled2048",
      "OnnxTRBenchmarkPrecompiled2560",
      "OnnxTRBenchmarkPrecompiled3008",
    ];
    for (const resource of resources) {
      expect(source).toContain(`\"${resource}\"`);
    }
    expect(source.match(/const (?:stripped|precompiled)\d+ = benchmarkFunction\(/g)).toHaveLength(
      6,
    );
    expect(source).toContain("sharedImageSource.nodes.function.imageUri");
  });

  test("is direct-invocation only and temporary", () => {
    expect(source).not.toContain("new sst.aws.Queue");
    expect(source).not.toContain(".subscribe(");
    expect(source).not.toContain("url:");
    expect(source).not.toContain("link:");
    expect(source).toContain('removal: "remove"');
    expect(source).toContain("protect: false");
  });

  test("pins the required execution envelope", () => {
    expect(source).toContain('architecture: "x86_64"');
    expect(source).toContain('timeout: "3 minutes"');
    expect(source).toContain('storage: "512 MB"');
    expect(source).toContain("in-flight invocation per function");
    expect(source).toContain("at most six across a cohort");
    expect(source).not.toContain("concurrency: { reserved:");
    expect(source).toContain('retention: "1 week"');
    expect(source).toContain('ONNXTR_BENCHMARK_MODE: "TRUE"');
    expect(source).toContain("$transform(Image");
    expect(source).toContain("ONNXTR_BYTECODE_MODE:");
  });
});
