import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";
import { telegramBotToken, telegramChatId } from "./ip-scraper";
import { documentDlq, documentQueue, onnxtrSubscriber } from "./queue";

const stage = $app.stage;
const alarmNamePrefix = `textract-testing-${stage}-onnxtr-`;
const metricNamespace = `TextractTesting/OnnxTR/${stage}`;
const tags = {
  Application: "textract-testing",
  Stage: stage,
  Component: "onnxtr-monitoring",
};

const identity = aws.getCallerIdentityOutput({});
const region = aws.getRegionOutput({});
const partition = aws.getPartitionOutput({});
const accountRootArn = pulumi.interpolate`arn:${partition.partition}:iam::${identity.accountId}:root`;
const alarmArnPattern = pulumi.interpolate`arn:${partition.partition}:cloudwatch:${region.name}:${identity.accountId}:alarm:${alarmNamePrefix}*`;

const alertKeyPolicy = aws.iam.getPolicyDocumentOutput({
  statements: [
    {
      sid: "EnableAccountAdministration",
      effect: "Allow",
      principals: [{ type: "AWS", identifiers: [accountRootArn] }],
      actions: ["kms:*"],
      resources: ["*"],
    },
    {
      sid: "AllowCloudWatchAlarmEncryption",
      effect: "Allow",
      principals: [
        { type: "Service", identifiers: ["cloudwatch.amazonaws.com"] },
      ],
      actions: ["kms:Decrypt", "kms:GenerateDataKey*"],
      resources: ["*"],
      conditions: [
        {
          test: "StringEquals",
          variable: "AWS:SourceAccount",
          values: [identity.accountId],
        },
        {
          test: "ArnLike",
          variable: "AWS:SourceArn",
          values: [alarmArnPattern],
        },
      ],
    },
  ],
});

const alertKey = new aws.kms.Key("OnnxTRAlertKey", {
  description: `Encrypts ${stage} OnnxTR CloudWatch alarm notifications`,
  enableKeyRotation: true,
  deletionWindowInDays: 30,
  policy: alertKeyPolicy.json,
  tags,
});

new aws.kms.Alias("OnnxTRAlertKeyAlias", {
  name: `alias/textract-testing-${stage}-onnxtr-alerts`,
  targetKeyId: alertKey.keyId,
});

const topicPolicy = aws.iam.getPolicyDocumentOutput({
  statements: [
    {
      sid: "AllowAccountAdministration",
      effect: "Allow",
      principals: [{ type: "AWS", identifiers: [accountRootArn] }],
      actions: [
        "SNS:GetTopicAttributes",
        "SNS:SetTopicAttributes",
        "SNS:AddPermission",
        "SNS:RemovePermission",
        "SNS:DeleteTopic",
        "SNS:Subscribe",
        "SNS:ListSubscriptionsByTopic",
        "SNS:Publish",
      ],
      resources: ["*"],
    },
    {
      sid: "AllowCloudWatchAlarmPublishing",
      effect: "Allow",
      principals: [
        { type: "Service", identifiers: ["cloudwatch.amazonaws.com"] },
      ],
      actions: ["SNS:Publish"],
      resources: ["*"],
      conditions: [
        {
          test: "StringEquals",
          variable: "AWS:SourceAccount",
          values: [identity.accountId],
        },
        {
          test: "ArnLike",
          variable: "AWS:SourceArn",
          values: [alarmArnPattern],
        },
      ],
    },
  ],
});

export const onnxtrAlertTopic = new sst.aws.SnsTopic("OnnxTRAlertTopic", {
  transform: {
    topic: (args) => {
      args.kmsMasterKeyId = alertKey.arn;
      args.policy = topicPolicy.json;
      args.tags = tags;
    },
  },
});

export const onnxtrTelegramSubscriber = onnxtrAlertTopic.subscribe(
  "OnnxTRTelegramAlarmNotifier",
  {
    handler: "packages/functions/src/onnxtr-alarm-notifier.handler",
    runtime: "nodejs22.x",
    memory: "128 MB",
    timeout: "10 seconds",
    logging: { retention: "1 month", format: "json" },
    environment: {
      ALARM_NAME_PREFIX: alarmNamePrefix,
      TELEGRAM_BOT_TOKEN: telegramBotToken.value,
      TELEGRAM_CHAT_ID: telegramChatId.value,
    },
  },
);

const subscriberFunctionName = onnxtrSubscriber.nodes.function.apply(
  (fn) => fn.name,
);
const subscriberLogGroupName = onnxtrSubscriber.nodes.function.apply((fn) => {
  const logGroup = fn.nodes.logGroup;
  if (!logGroup) {
    throw new Error("The OnnxTR subscriber must have CloudWatch logging enabled");
  }
  return logGroup.name;
});
const queueName = documentQueue.nodes.queue.name;
const dlqName = documentDlq.nodes.queue.name;

new aws.cloudwatch.LogMetricFilter("OnnxTRDocumentFailedMetricFilter", {
  name: `${alarmNamePrefix}document-failed`,
  logGroupName: subscriberLogGroupName,
  pattern: '{ $.event = "document_failed" }',
  metricTransformation: {
    name: "DocumentFailed",
    namespace: metricNamespace,
    value: "1",
    unit: "Count",
  },
});

new aws.cloudwatch.LogMetricFilter("OnnxTRFailureCallbackFailedMetricFilter", {
  name: `${alarmNamePrefix}failure-callback-failed`,
  logGroupName: subscriberLogGroupName,
  pattern: '{ $.event = "failure_callback_failed" }',
  metricTransformation: {
    name: "FailureCallbackFailed",
    namespace: metricNamespace,
    value: "1",
    unit: "Count",
  },
});

const alarmActions = [onnxtrAlertTopic.arn];
const commonAlarmArgs = {
  actionsEnabled: true,
  alarmActions,
  okActions: alarmActions,
  insufficientDataActions: [],
  treatMissingData: "notBreaching",
  tags,
};

export const onnxtrLambdaErrorsAlarm = new aws.cloudwatch.MetricAlarm(
  "OnnxTRLambdaErrorsAlarm",
  {
    ...commonAlarmArgs,
    name: `${alarmNamePrefix}lambda-errors`,
    alarmDescription: "OnnxTR subscriber reported a Lambda execution error.",
    namespace: "AWS/Lambda",
    metricName: "Errors",
    dimensions: { FunctionName: subscriberFunctionName },
    statistic: "Sum",
    period: 60,
    evaluationPeriods: 1,
    datapointsToAlarm: 1,
    threshold: 1,
    comparisonOperator: "GreaterThanOrEqualToThreshold",
  },
);

export const onnxtrLambdaThrottlesAlarm = new aws.cloudwatch.MetricAlarm(
  "OnnxTRLambdaThrottlesAlarm",
  {
    ...commonAlarmArgs,
    name: `${alarmNamePrefix}lambda-throttles`,
    alarmDescription: "OnnxTR subscriber was throttled.",
    namespace: "AWS/Lambda",
    metricName: "Throttles",
    dimensions: { FunctionName: subscriberFunctionName },
    statistic: "Sum",
    period: 60,
    evaluationPeriods: 1,
    datapointsToAlarm: 1,
    threshold: 1,
    comparisonOperator: "GreaterThanOrEqualToThreshold",
  },
);

export const onnxtrDurationAlarm = new aws.cloudwatch.MetricAlarm(
  "OnnxTRDurationP99Alarm",
  {
    ...commonAlarmArgs,
    name: `${alarmNamePrefix}duration-p99`,
    alarmDescription: "OnnxTR subscriber p99 duration approached its timeout.",
    namespace: "AWS/Lambda",
    metricName: "Duration",
    dimensions: { FunctionName: subscriberFunctionName },
    extendedStatistic: "p99",
    evaluateLowSampleCountPercentiles: "evaluate",
    period: 60,
    evaluationPeriods: 2,
    datapointsToAlarm: 1,
    threshold: 150_000,
    comparisonOperator: "GreaterThanOrEqualToThreshold",
  },
);

export const onnxtrQueueAgeAlarm = new aws.cloudwatch.MetricAlarm(
  "OnnxTRQueueAgeAlarm",
  {
    ...commonAlarmArgs,
    name: `${alarmNamePrefix}queue-age`,
    alarmDescription: "The oldest OnnxTR FIFO message exceeded ten minutes.",
    namespace: "AWS/SQS",
    metricName: "ApproximateAgeOfOldestMessage",
    dimensions: { QueueName: queueName },
    statistic: "Maximum",
    period: 60,
    evaluationPeriods: 3,
    datapointsToAlarm: 2,
    threshold: 600,
    comparisonOperator: "GreaterThanOrEqualToThreshold",
  },
);

export const onnxtrDlqDepthAlarm = new aws.cloudwatch.MetricAlarm(
  "OnnxTRDlqDepthAlarm",
  {
    ...commonAlarmArgs,
    name: `${alarmNamePrefix}dlq-depth`,
    alarmDescription: "The OnnxTR dead-letter queue contains a message.",
    namespace: "AWS/SQS",
    metricName: "ApproximateNumberOfMessagesVisible",
    dimensions: { QueueName: dlqName },
    statistic: "Maximum",
    period: 60,
    evaluationPeriods: 1,
    datapointsToAlarm: 1,
    threshold: 1,
    comparisonOperator: "GreaterThanOrEqualToThreshold",
  },
);

export const onnxtrDocumentFailedAlarm = new aws.cloudwatch.MetricAlarm(
  "OnnxTRDocumentFailedAlarm",
  {
    ...commonAlarmArgs,
    name: `${alarmNamePrefix}document-failed`,
    alarmDescription: "The OnnxTR handler reported a retryable document failure.",
    namespace: metricNamespace,
    metricName: "DocumentFailed",
    statistic: "Sum",
    period: 60,
    evaluationPeriods: 1,
    datapointsToAlarm: 1,
    threshold: 1,
    comparisonOperator: "GreaterThanOrEqualToThreshold",
  },
);

export const onnxtrFailureCallbackFailedAlarm = new aws.cloudwatch.MetricAlarm(
  "OnnxTRFailureCallbackFailedAlarm",
  {
    ...commonAlarmArgs,
    name: `${alarmNamePrefix}failure-callback-failed`,
    alarmDescription: "An OnnxTR terminal failure callback could not be delivered.",
    namespace: metricNamespace,
    metricName: "FailureCallbackFailed",
    statistic: "Sum",
    period: 60,
    evaluationPeriods: 1,
    datapointsToAlarm: 1,
    threshold: 1,
    comparisonOperator: "GreaterThanOrEqualToThreshold",
  },
);
