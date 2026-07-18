/// <reference path="./.sst/platform/config.d.ts" />

const ONNXTR_SUBSCRIBER_IMAGE =
  /^DocumentQueueSubscriber[A-Za-z]+FunctionImage$/;

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
    const { Image } = await import("@pulumi/docker-build");
    $transform(Image, (args, _opts, name) => {
      if (!ONNXTR_SUBSCRIBER_IMAGE.test(name)) return;
      args.buildArgs = {
        ...args.buildArgs,
        ONNXTR_BYTECODE_MODE: "precompiled",
      };
    });

    const infra = await import("./infra");

    return {
      BucketName: infra.documentsBucket.name,
      DocumentsTableName: infra.documentsTable.name,
      DoctrFunctionName: infra.doctrFunction.name,
      DocumentQueueUrl: infra.documentQueue.url,
      WebUrl: infra.web.url,
      IpScraperFunctionName: infra.ipScraperFunctionName,
      StatementsScraperQueueUrl: infra.statementsScraperQueueUrl,
      SubmitScraperUrl: infra.submitScraperUrl,
    };
  },
});
