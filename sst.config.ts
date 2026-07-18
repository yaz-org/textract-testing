/// <reference path="./.sst/platform/config.d.ts" />

const ONNXTR_SUBSCRIBER_IMAGE =
  /^DocumentQueueSubscriber[A-Za-z]+FunctionImage$/;

function currentImageTag(name: string) {
  if (name === "DoctrFunctionImage") return "doctr";
  if (name === "OnnxTRFunctionImage") return "onnxtr";
  if (ONNXTR_SUBSCRIBER_IMAGE.test(name)) return "onnxtr-subscriber";
}

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
    const aws = await import("@pulumi/aws");

    $transform(Image, (args, _opts, name) => {
      if (ONNXTR_SUBSCRIBER_IMAGE.test(name)) {
        args.buildArgs = {
          ...args.buildArgs,
          ONNXTR_BYTECODE_MODE: "precompiled",
        };
      }

      const imageTag = currentImageTag(name);
      if (!imageTag) return;

      args.tags = $output(args.tags).apply((tags) => {
        const resolvedTags = tags ?? [];
        const latest = resolvedTags.find((tag) => tag.endsWith(":latest"));
        if (!latest) {
          throw new Error(`SST image ${name} is missing its latest tag`);
        }

        const current = latest.replace(
          /:latest$/,
          `:${$app.stage}-${imageTag}-current`,
        );
        return resolvedTags.includes(current)
          ? resolvedTags
          : [...resolvedTags, current];
      });
    });

    // The SST bootstrap ECR repository is shared within this account and
    // region. Only one stack should own its lifecycle policy.
    if ($app.stage === "production") {
      new aws.ecr.LifecyclePolicy("SstAssetLifecycle", {
        repository: "sst-asset",
        policy: JSON.stringify({
          rules: [
            {
              rulePriority: 1,
              description: "Expire inactive SST build caches after 30 days",
              selection: {
                tagStatus: "tagged",
                tagPatternList: ["*-cache"],
                countType: "sinceImagePushed",
                countUnit: "days",
                countNumber: 30,
              },
              action: { type: "expire" },
            },
            {
              rulePriority: 2,
              description: "Keep the five newest OnnxTR promotion images",
              selection: {
                tagStatus: "tagged",
                tagPatternList: ["onnxtr-promotion-*"],
                countType: "imageCountMoreThan",
                countNumber: 5,
              },
              action: { type: "expire" },
            },
            {
              rulePriority: 3,
              description: "Expire untagged SST assets after 14 days",
              selection: {
                tagStatus: "untagged",
                countType: "sinceImagePushed",
                countUnit: "days",
                countNumber: 14,
              },
              action: { type: "expire" },
            },
          ],
        }),
      });
    }

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
