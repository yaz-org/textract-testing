import { documentsBucket, documentsTable, hashLockTable } from "./storage";

export const web = new sst.aws.TanStackStart("Web", {
  path: "packages/web",
  link: [documentsBucket, documentsTable, hashLockTable],
  // dev: {
  //   command: "npm run dev",
  // },
});
