import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ZipArchive } from "archiver";
import { Resource } from "sst";
import type { InferenceRecord, PagoMovilPayment, DoctrResult } from "./payment";

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
  marshallOptions: { removeUndefinedValues: true },
});

const s3 = new S3Client({});

export async function saveInference(
  documentId: string,
  record: InferenceRecord,
) {
  await dynamo.send(
    new UpdateCommand({
      TableName: Resource.DocumentsTable.name,
      Key: { documentId },
      UpdateExpression:
        "SET inferenceHistory = list_append(if_not_exists(inferenceHistory, :empty), :record), paymentResult = :payment",
      ConditionExpression: "attribute_exists(documentId)",
      ExpressionAttributeValues: {
        ":empty": [],
        ":record": [record],
        ":payment": record.payment ?? null,
      },
    }),
  );
}

export async function exportDocumentsZip(): Promise<{ presignedUrl: string }> {
  const response = await dynamo.send(
    new ScanCommand({
      TableName: Resource.DocumentsTable.name,
    }),
  );

  const documents = (response.Items ?? []) as {
    documentId: string;
    fileName: string;
    size: number;
    paymentResult?: PagoMovilPayment;
    doctrResult?: DoctrResult;
    doctrExtractedAt?: string;
  }[];

  const archive = new ZipArchive({ zlib: { level: 9 } });
  const chunks: Buffer[] = [];

  archive.on("data", (chunk: Buffer) => chunks.push(chunk));

  for (const doc of documents) {
    archive.append(
      JSON.stringify(
        {
          fileName: doc.fileName,
          fileSize: doc.size,
          paymentResult: doc.paymentResult ?? null,
          doctrResult: doc.doctrResult ?? null,
          doctrExtractedAt: doc.doctrExtractedAt ?? null,
        },
        null,
        2,
      ),
      { name: `${doc.fileName}.json` },
    );
  }

  await archive.finalize();
  const zipBuffer = Buffer.concat(chunks);

  const zipKey = `exports/documents-export-${Date.now()}.zip`;

  await s3.send(
    new PutObjectCommand({
      Bucket: Resource.Documents.name,
      Key: zipKey,
      Body: zipBuffer,
      ContentType: "application/zip",
    }),
  );

  const presignedUrl = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: Resource.Documents.name,
      Key: zipKey,
    }),
    { expiresIn: 3600 },
  );

  return { presignedUrl };
}
