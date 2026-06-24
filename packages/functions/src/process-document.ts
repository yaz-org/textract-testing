import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { Resource } from "sst";
import { extractDocTRPayment, extractOnnxTRPayment, saveInference } from "@textract-testing/shared";
import type { DocTRRawInference, OnnxTRRawInference, InferenceRecord } from "@textract-testing/shared";

const lambda = new LambdaClient({});

interface SqsRecord {
  messageId: string;
  receiptHandle: string;
  body: string;
}

interface SqsEvent {
  Records: SqsRecord[];
}

interface BatchItemFailure {
  itemIdentifier: string;
}

interface SqsResponse {
  batchItemFailures: BatchItemFailure[];
}

interface ProcessMessage {
  documentId: string;
  s3Key: string;
  model?: "doctr" | "onnxtr";
}

async function processDocument(documentId: string, s3Key: string, model: "doctr" | "onnxtr" = "onnxtr") {
  const functionName = model === "doctr"
    ? Resource.DoctrFunction.name
    : Resource.OnnxTRFunction.name;

  const command = new InvokeCommand({
    FunctionName: functionName,
    Payload: JSON.stringify({
      documentId,
      s3Key,
      bucket: Resource.Documents.name,
    }),
  });

  const response = await lambda.send(command);
  const payload = JSON.parse(
    new TextDecoder().decode(response.Payload),
  );

  if (response.FunctionError) {
    console.log("Error", response.FunctionError, payload);
    throw new Error(
      `${model} function error: ${JSON.stringify(payload)}`,
    );
  }

  let rawInference: DocTRRawInference | OnnxTRRawInference;
  let payment;

  if (model === "doctr") {
    rawInference = payload as DocTRRawInference;
    payment = extractDocTRPayment(rawInference.allLines);
  } else {
    rawInference = payload as OnnxTRRawInference;
    payment = extractOnnxTRPayment(rawInference);
  }

  const inferenceRecord: InferenceRecord = {
    inferenceType: model,
    extractedAt: rawInference.extractedAt,
    raw: rawInference,
    payment,
  };

  await saveInference(documentId, inferenceRecord);

  return inferenceRecord;
}

export const handler = async (event: SqsEvent): Promise<SqsResponse> => {
  const batchItemFailures: BatchItemFailure[] = [];

  for (const record of event.Records) {
    try {
      const message: ProcessMessage = JSON.parse(record.body);
      const { documentId, s3Key, model } = message;

      if (!documentId || !s3Key) {
        console.error("Missing documentId or s3Key in message", record.body);
        batchItemFailures.push({ itemIdentifier: record.messageId });
        continue;
      }

      await processDocument(documentId, s3Key, model ?? "onnxtr");
    } catch (error) {
      console.error("Failed to process record", record.messageId, error);
      batchItemFailures.push({ itemIdentifier: record.messageId });
    }
  }

  return { batchItemFailures };
};
