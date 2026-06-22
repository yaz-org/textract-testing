import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { InvokeCommand, LambdaClient } from "@aws-sdk/client-lambda";
import { Resource } from "sst";
import type { UploadUrlResult } from "./documents";
import {
	createUploadUrls,
	deleteDocuments,
	deleteDocumentsSchema,
	exportDocumentsZip,
	finalizeUploadSchema,
	getDocument,
	getPresignedUrl,
	listDocuments,
	saveDocumentRecord,
	saveInference,
	uploadRequestSchema,
} from "./documents";
import { extractDocTRPayment } from "./doctr-extractor";
import type { DocTRRawInference, InferenceRecord } from "./payment";

const lambda = new LambdaClient({});

export const CONCURRENCY_MAX = 10;

export const getDocuments = createServerFn({ method: "GET" }).handler(
	async () => {
		const documents = await listDocuments();
		return Promise.all(
			documents.map(async (doc) => ({
				...doc,
				presignedUrl: await getPresignedUrl(doc.s3Key),
			})),
		);
	},
);

export const createDocumentUpload = createServerFn({ method: "POST" })
	.validator(z.array(uploadRequestSchema))
	.handler(async ({ data }): Promise<UploadUrlResult[]> => {
		return createUploadUrls(data);
	});

export const finalizeDocumentUpload = createServerFn({ method: "POST" })
	.validator(finalizeUploadSchema)
	.handler(async ({ data }) => {
		return saveDocumentRecord(data);
	});

export const deleteStoredDocument = createServerFn({ method: "POST" })
	.validator(deleteDocumentsSchema)
	.handler(async ({ data }) => {
		return deleteDocuments(data);
	});

export const processDocument = createServerFn({ method: "POST" })
	.validator(
		z.array(z.object({ documentId: z.string().uuid(), s3Key: z.string() })),
	)
	.handler(async ({ data }) => {
		const results: { documentId: string; success: true }[] = [];
		for (let i = 0; i < data.length; i += CONCURRENCY_MAX) {
			const batch = data.slice(i, i + CONCURRENCY_MAX);
			const batchResults = await Promise.all(
				batch.map(async ({ documentId, s3Key }) => {
          await docTrProcess(documentId, s3Key);
					// const result = await analyzeDocument(s3Key);
					// const paymentResult = extractPagoMovil(result);
					// await Promise.all([
					// 	saveTextractResult(documentId, result),
					// 	savePaymentResult(documentId, paymentResult),
					// ]);
					return { documentId, success: true as const };
				}),
			);
			results.push(...batchResults);
		}
		return results;
	});

export const processWithDoctr = createServerFn({ method: "POST" })
	.validator(
		z.array(z.object({ documentId: z.string().uuid(), s3Key: z.string() })),
	)
	.handler(async ({ data }) => {
		const results: { documentId: string; success: true }[] = [];
		for (let i = 0; i < data.length; i += CONCURRENCY_MAX) {
			const batch = data.slice(i, i + CONCURRENCY_MAX);
			const batchResults = await Promise.all(
				batch.map(async ({ documentId, s3Key }) => {
          await docTrProcess(documentId, s3Key);
					return { documentId, success: true as const };
				}),
			);
			results.push(...batchResults);
		}
		return results;
	});

async function docTrProcess(documentId: string, s3Key: string) {
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
    console.log("Error", response.FunctionError, payload)
    throw new Error(
        `DoctrFunction error: ${JSON.stringify(payload)}`,
    );
  }

  // Raw inference from lambda
  const rawInference = payload as DocTRRawInference;

  // Client-side extraction from raw lines
  const payment = extractDocTRPayment(rawInference.allLines);

  // Build inference record
  const inferenceRecord: InferenceRecord = {
    inferenceType: "doctr",
    extractedAt: rawInference.extractedAt,
    raw: rawInference,
    payment,
  };

  // Save inference + payment result atomically
  await saveInference(documentId, inferenceRecord);

  return inferenceRecord;
}

export const reprocessPayment = createServerFn({ method: "POST" })
	.validator(z.object({ documentId: z.string().uuid() }))
	.handler(async ({ data }) => {
		const doc = await getDocument(data.documentId);
    if (!doc) {
      	throw new Error(
      		"No document found",
      	);
    }
		// if (!doc?.textractResult) {
		// 	throw new Error(
		// 		"No textract result found — run full processing first.",
		// 	);
		// }
		// const paymentResult = extractPagoMovil(doc.textractResult);
		// await savePaymentResult(data.documentId, paymentResult);
    const paymentResult = await docTrProcess(doc.documentId, doc.s3Key);
		return paymentResult;
	});

export const exportDocumentsAsZip = createServerFn({ method: "POST" }).handler(
	async () => {
		return exportDocumentsZip();
	},
);
