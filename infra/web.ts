import { documentQueue, processDocumentFn } from "./queue";
import { documentsBucket, documentsTable, hashLockTable } from "./storage";

export const web = new sst.aws.TanStackStart("Web", {
  path: "packages/web",
  link: [documentsBucket, documentsTable, hashLockTable, documentQueue, processDocumentFn],
  permissions: [
    {
      actions: ["textract:AnalyzeDocument"],
      resources: ["*"],
    },
    {
      actions: ["sqs:SendMessage"],
      resources: [documentQueue.arn],
    },
    // {
    //   actions: ["s3:GetObject"],
    //   resources: [documentsBucket.arn + "/*"],
    // },
  ],
  // dev: {
  //   command: "npm run dev",
  // },
});
