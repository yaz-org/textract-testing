import { documentsBucket, documentsTable } from "./storage";
import { doctrFunction } from "./doctr";

const dlq = new sst.aws.Queue("DocumentDLQ", { fifo: true });

export const documentQueue = new sst.aws.Queue("DocumentQueue", {
  fifo: {
    contentBasedDeduplication: true,
  },
  visibilityTimeout: "3 minutes",
  dlq: {
    queue: dlq.arn,
    retry: 3,
  },
});

documentQueue.subscribe({
  handler: "packages/functions/src/process-document.handler",
  timeout: "60 seconds",
  memory: "128 MB",
  link: [documentsBucket, documentsTable, doctrFunction],
  permissions: [
    {
      actions: ["lambda:InvokeFunction"],
      resources: [doctrFunction.arn],
    },
  ],
});
