import { documentQueue } from "./queue";
import { documentsBucket, documentsTable, hashLockTable } from "./storage";

export const web = new sst.aws.TanStackStart("Web", {
  path: "packages/web",
  link: [documentsBucket, documentsTable, hashLockTable, documentQueue],
  permissions: [
    {
      actions: ["textract:AnalyzeDocument"],
      resources: ["*"],
    },
    {
      actions: ["sqs:SendMessage"],
      resources: [documentQueue.arn],
    },
  ],
  // dev: {
  //   command: "npm run dev",
  // },
});
