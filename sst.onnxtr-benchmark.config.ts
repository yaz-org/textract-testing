/// <reference path="./.sst/platform/config.d.ts" />

import * as aws from "@pulumi/aws";
import { Image } from "@pulumi/docker-build";

type BytecodeMode = "stripped" | "precompiled";

function benchmarkEnvironment(bytecodeMode: BytecodeMode) {
  return {
    ONNXTR_CACHE_DIR: "/opt/onnxtr_cache",
    ONNXTR_MODEL_MANIFEST: "/opt/onnxtr_cache/model-manifest.json",
    ONNXTR_MULTIPROCESSING_DISABLE: "TRUE",
    ONNXTR_BENCHMARK_MODE: "TRUE",
    ONNXTR_BYTECODE_MODE: bytecodeMode,
  };
}

function benchmarkImageFunction(
  resourceName: string,
  bytecodeMode: BytecodeMode,
) {
  return new sst.aws.Function(resourceName, {
    handler: "packages/onnxtr-lambda/handler.lambda_handler",
    runtime: "python3.13",
    python: { container: true },
    architecture: "x86_64",
    timeout: "3 minutes",
    memory: "2048 MB",
    storage: "512 MB",
    // The production account currently has the Lambda default quota of 10.
    // AWS requires all 10 to remain unreserved. The harness permits one
    // in-flight invocation per function and at most six across a cohort.
    logging: { retention: "1 week", format: "text" },
    environment: benchmarkEnvironment(bytecodeMode),
  });
}

function sharedImageBenchmarkFunction(
  resourceName: string,
  memoryMb: 2560 | 3008,
  bytecodeMode: BytecodeMode,
  imageSource: sst.aws.Function,
) {
  const fn = new aws.lambda.Function(resourceName, {
    packageType: "Image",
    imageUri: imageSource.nodes.function.imageUri,
    role: imageSource.nodes.role.arn,
    architectures: ["x86_64"],
    timeout: 180,
    memorySize: memoryMb,
    ephemeralStorage: { size: 512 },
    environment: { variables: benchmarkEnvironment(bytecodeMode) },
  });

  new aws.cloudwatch.LogGroup(`${resourceName}LogGroup`, {
    name: $interpolate`/aws/lambda/${fn.name}`,
    retentionInDays: 7,
  });

  return fn;
}

export default $config({
  app() {
    return {
      name: "textract-testing-onnxtr-benchmark",
      removal: "remove",
      protect: false,
      home: "aws",
    };
  },
  async run() {
    $transform(Image, (args, _opts, name) => {
      if (!name.startsWith("OnnxTRBenchmark")) return;
      args.buildArgs = {
        ONNXTR_BYTECODE_MODE: name.includes("Precompiled")
          ? "precompiled"
          : "stripped",
      };
    });

    const stripped2048 = benchmarkImageFunction(
      "OnnxTRBenchmarkStripped2048",
      "stripped",
    );
    const stripped2560 = sharedImageBenchmarkFunction(
      "OnnxTRBenchmarkStripped2560",
      2560,
      "stripped",
      stripped2048,
    );
    const stripped3008 = sharedImageBenchmarkFunction(
      "OnnxTRBenchmarkStripped3008",
      3008,
      "stripped",
      stripped2048,
    );
    const precompiled2048 = benchmarkImageFunction(
      "OnnxTRBenchmarkPrecompiled2048",
      "precompiled",
    );
    const precompiled2560 = sharedImageBenchmarkFunction(
      "OnnxTRBenchmarkPrecompiled2560",
      2560,
      "precompiled",
      precompiled2048,
    );
    const precompiled3008 = sharedImageBenchmarkFunction(
      "OnnxTRBenchmarkPrecompiled3008",
      3008,
      "precompiled",
      precompiled2048,
    );

    return {
      OnnxTRBenchmarkStripped2048: { name: stripped2048.name },
      OnnxTRBenchmarkStripped2560: { name: stripped2560.name },
      OnnxTRBenchmarkStripped3008: { name: stripped3008.name },
      OnnxTRBenchmarkPrecompiled2048: { name: precompiled2048.name },
      OnnxTRBenchmarkPrecompiled2560: { name: precompiled2560.name },
      OnnxTRBenchmarkPrecompiled3008: { name: precompiled3008.name },
    };
  },
});
