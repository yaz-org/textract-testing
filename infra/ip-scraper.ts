import { Image } from "@pulumi/docker-build";
import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import * as path from "path";

const vpnConfig = new sst.Secret("ProtonVpnConfig");
const vpnUsername = new sst.Secret("ProtonVpnUsername");
const vpnPassword = new sst.Secret("ProtonVpnPassword");
const webPageCredentials = new sst.Secret("WebPageCredentials");
export const telegramBotToken = new sst.Secret("TelegramBotToken");
export const telegramChatId = new sst.Secret("TelegramChatId");

const configBucket = new aws.s3.Bucket("VpnConfigBucket", {
  forceDestroy: true,
});

const configObj = new aws.s3.BucketObject("VpnConfigObject", {
  bucket: configBucket.id,
  key: "proton.ovpn",
  content: vpnConfig.value.apply((b64) =>
    Buffer.from(b64, "base64").toString()
  ),
});

const repo = new aws.ecr.Repository("ipScraper", {
  name: pulumi.interpolate`ip-scraper-${pulumi.getStack()}`,
  forceDelete: true,
  imageScanningConfiguration: { scanOnPush: true },
  lifecyclePolicy: {
    rules: [
      {
        rulePriority: 1,
        description: "Keep only the 5 most recent images",
        selection: {
          tagStatus: "any",
          countType: "imageCountMoreThan",
          countNumber: 5,
        },
        action: { type: "expire" },
      },
    ],
  },
});

const authToken = aws.ecr.getAuthorizationTokenOutput({
  registryId: repo.registryId,
});

const image = new Image("IpScraperImage", {
  tags: [
    pulumi.interpolate`${repo.repositoryUrl}:latest`,
  ],
  context: {
    location: path.resolve(process.cwd(), "packages", "ip-scraper"),
  },
  platforms: ["linux/amd64"],
  push: true,
  registries: [
    authToken.apply((token) => ({
      address: token.proxyEndpoint,
      username: token.userName,
      password: pulumi.secret(token.password),
    })),
  ],
});

const role = new aws.iam.Role("IpScraperRole", {
  assumeRolePolicy: {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "sts:AssumeRole",
        Principal: { Service: "lambda.amazonaws.com" },
        Effect: "Allow",
      },
    ],
  },
  managedPolicyArns: [
    "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
  ],
});

new aws.iam.RolePolicy("IpScraperS3Access", {
  role: role.id,
  policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: ["s3:GetObject", "s3:PutObject"],
        Resource: [pulumi.interpolate`${configBucket.arn}/*`],
      },
    ],
  },
});

const fn = new aws.lambda.Function("IpScraper", {
  packageType: "Image",
  imageUri: pulumi.interpolate`${repo.repositoryUrl}@${image.digest}`,
  role: role.arn,
  timeout: 60,
  memorySize: 2048,
  ephemeralStorage: { size: 1024 },
  environment: {
    variables: {
      VPN_CONFIG_BUCKET: configBucket.id,
      VPN_CONFIG_KEY: configObj.key,
      OPENVPN_USERNAME: vpnUsername.value,
      OPENVPN_PASSWORD: vpnPassword.value,
      WEB_PAGE_CREDENTIALS: webPageCredentials.value,
      TELEGRAM_BOT_TOKEN: telegramBotToken.value,
      TELEGRAM_CHAT_ID: telegramChatId.value,
      SESSION_STATE_KEY: "session-state.json",
    },
  },
});

// --- FIFO Queue for sequential profile execution ---

const statementsScraperApiKey = new sst.Secret("StatementsScraperApiKey");

const statementsScraperDlq = new sst.aws.Queue("StatementsScraperDLQ", {
  fifo: true,
});

const statementsScraperQueue = new sst.aws.Queue("StatementsScraperQueue", {
  fifo: {
    contentBasedDeduplication: true,
  },
  visibilityTimeout: "3 minutes",
  dlq: {
    queue: statementsScraperDlq.arn,
    retry: 3,
  },
});

new aws.iam.RolePolicy("IpScraperSQSAccess", {
  role: role.id,
  policy: {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Action: [
          "sqs:ReceiveMessage",
          "sqs:DeleteMessage",
          "sqs:GetQueueAttributes",
        ],
        Resource: [statementsScraperQueue.arn],
      },
    ],
  },
});

new aws.lambda.EventSourceMapping("IpScraperSQS", {
  eventSourceArn: statementsScraperQueue.arn,
  functionName: fn.name,
});

// --- Submit endpoint ---

const submitScraperFn = new sst.aws.Function("SubmitScraperFn", {
  handler: "packages/functions/src/submit-scraper.handler",
  timeout: "10 seconds",
  memory: "128 MB",
  url: true,
  link: [statementsScraperQueue, statementsScraperApiKey],
  permissions: [
    {
      actions: ["sqs:SendMessage"],
      resources: [statementsScraperQueue.arn],
    },
  ],
});

export const ipScraperFunctionName = fn.name;
export const statementsScraperQueueUrl = statementsScraperQueue.url;
export const submitScraperUrl = submitScraperFn.url;
