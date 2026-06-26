import { documentQueue } from "./queue";

const apiKey = new sst.Secret("DocumentQueueApiKey");

export const submitDocumentFn = new sst.aws.Function("SubmitDocumentFn", {
  handler: "packages/functions/src/submit-document.handler",
  timeout: "10 seconds",
  memory: "128 MB",
  url: true,
  link: [documentQueue, apiKey],
  permissions: [
    {
      actions: ["sqs:SendMessage"],
      resources: [documentQueue.arn],
    },
  ],
});
