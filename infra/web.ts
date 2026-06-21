import { doctrFunction } from "./doctr";
import { documentsBucket, documentsTable, hashLockTable } from "./storage";

export const web = new sst.aws.TanStackStart("Web", {
  path: "packages/web",
  link: [documentsBucket, documentsTable, hashLockTable, doctrFunction],
  permissions: [
    {
      actions: ["textract:AnalyzeDocument"],
      resources: ["*"],
    },
    {
      actions: ["lambda:InvokeFunction"],
      resources: [doctrFunction.arn],
    },
  ],
  // dev: {
  //   command: "npm run dev",
  // },
});
