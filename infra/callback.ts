import { documentsTable } from "./storage";

export const processDocumentFn = new sst.aws.Function("ProcessDocumentFn", {
  handler: "packages/functions/src/process-document.handler",
  timeout: "30 seconds",
  memory: "128 MB",
  url: true,
  link: [documentsTable],
  permissions: [
    {
      actions: ["dynamodb:UpdateItem"],
      resources: [documentsTable.arn],
    },
  ],
});
