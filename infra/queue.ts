import { onnxtrFunction } from "./onnxtr";
import { processDocumentFn } from "./callback";

const dlq = new sst.aws.Queue("DocumentDLQ", { fifo: true });

export const documentQueue = new sst.aws.Queue("DocumentQueue", {
  fifo: {
    contentBasedDeduplication: true,
  },
  visibilityTimeout: "4 minutes",
  dlq: {
    queue: dlq.arn,
    retry: 3,
  },
});

documentQueue.subscribe({
  handler: "packages/onnxtr-lambda/handler.lambda_handler",
  runtime: "python3.14",
  python: { container: true },
  timeout: "3 minutes",
  memory: "2048 MB",
  environment: {
    ONNXTR_CACHE_DIR: "/tmp/onnxtr_cache",
    ONNXTR_MULTIPROCESSING_DISABLE: "TRUE",
  },
});

export { processDocumentFn };
