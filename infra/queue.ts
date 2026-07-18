import { onnxtrFunction } from "./onnxtr";
import { processDocumentFn } from "./callback";

export const documentDlq = new sst.aws.Queue("DocumentDLQ", { fifo: true });

export const documentQueue = new sst.aws.Queue("DocumentQueue", {
  fifo: {
    contentBasedDeduplication: true,
  },
  visibilityTimeout: "18 minutes",
  dlq: {
    queue: documentDlq.arn,
    retry: 5,
  },
});

export const onnxtrSubscriber = documentQueue.subscribe(
  {
    handler: "packages/onnxtr-lambda/handler.lambda_handler",
    runtime: "python3.13",
    python: { container: true },
    timeout: "3 minutes",
    memory: "3008 MB",
    environment: {
      ONNXTR_CACHE_DIR: "/opt/onnxtr_cache",
      ONNXTR_MODEL_MANIFEST: "/opt/onnxtr_cache/model-manifest.json",
      ONNXTR_MULTIPROCESSING_DISABLE: "TRUE",
    },
  },
  {
    batch: {
      size: 1,
      partialResponses: true,
    },
  },
);

export { processDocumentFn };
