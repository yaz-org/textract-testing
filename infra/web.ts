import { documentsBucket, documentsTable } from "./storage";

export const web = new sst.aws.TanStackStart("Web", {
  path: "packages/web",
  link: [documentsBucket, documentsTable],
  // dev: {
  //   command: "npm run dev",
  // },
});
