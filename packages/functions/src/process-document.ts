import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { Resource } from "sst";
import { extractDocTRPayment, saveInference } from "@textract-testing/shared";
import type { DocTRRawInference, InferenceRecord } from "@textract-testing/shared";

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
}

async function processDocument(documentId: string, s3Key: string) {
  const command = new InvokeCommand({
    FunctionName: Resource.DoctrFunction.name,
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
      `DoctrFunction error: ${JSON.stringify(payload)}`,
    );
  }

  const rawInference = payload as DocTRRawInference;

  const payment = extractDocTRPayment(rawInference.allLines);

  const inferenceRecord: InferenceRecord = {
    inferenceType: "doctr",
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
      const { documentId, s3Key } = message;

      if (!documentId || !s3Key) {
        console.error("Missing documentId or s3Key in message", record.body);
        batchItemFailures.push({ itemIdentifier: record.messageId });
        continue;
      }

      await processDocument(documentId, s3Key);
    } catch (error) {
      console.error("Failed to process record", record.messageId, error);
      batchItemFailures.push({ itemIdentifier: record.messageId });
    }
  }

  return { batchItemFailures };
};
