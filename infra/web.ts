import { documentQueue } from "./queue";
import { documentsBucket, documentsTable, hashLockTable } from "./storage";
import { onnxtrFunction } from "./onnxtr";

export const web = new sst.aws.TanStackStart("Web", {
  path: "packages/web",
  link: [documentsBucket, documentsTable, hashLockTable, documentQueue, onnxtrFunction],
  permissions: [
    {
      actions: ["textract:AnalyzeDocument"],
      resources: ["*"],
    },
    {
      actions: ["sqs:SendMessage"],
      resources: [documentQueue.arn],
    },
    {
      actions: ["lambda:InvokeFunction"],
      resources: [onnxtrFunction.arn],
    },
  ],
  // dev: {
  //   command: "npm run dev",
  // },
});
