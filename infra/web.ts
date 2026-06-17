import { documentsBucket, documentsTable, hashLockTable } from "./storage";

export const web = new sst.aws.TanStackStart("Web", {
  path: "packages/web",
  link: [documentsBucket, documentsTable, hashLockTable],
  permissions: [
    {
      actions: ["textract:AnalyzeDocument"],
      resources: ["*"],
    },
  ],
  // dev: {
  //   command: "npm run dev",
  // },
});
