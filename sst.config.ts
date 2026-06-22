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
    const infra = await import("./infra");

    return {
      BucketName: infra.documentsBucket.name,
      DocumentsTableName: infra.documentsTable.name,
      DoctrFunctionName: infra.doctrFunction.name,
      DocumentQueueUrl: infra.documentQueue.url,
      WebUrl: infra.web.url,
    };
  },
});
