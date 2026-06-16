/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "textract-testing",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const storage = await import("./infra/storage");
    const web = await import("./infra/web");

    return {
      BucketName: storage.documentsBucket.name,
      DocumentsTableName: storage.documentsTable.name,
      WebUrl: web.web.url,
    };
  },
});
