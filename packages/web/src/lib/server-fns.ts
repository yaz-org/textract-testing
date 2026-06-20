import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
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
	savePaymentResult,
	saveTextractResult,
	uploadRequestSchema,
} from "./documents";
import { extractPagoMovil } from "./payment-extractor";
import { analyzeDocument } from "./textract";

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
					const result = await analyzeDocument(s3Key);
					const paymentResult = extractPagoMovil(result);
					await Promise.all([
						saveTextractResult(documentId, result),
						savePaymentResult(documentId, paymentResult),
					]);
					return { documentId, success: true as const };
				}),
			);
			results.push(...batchResults);
		}
		return results;
	});

export const reprocessPayment = createServerFn({ method: "POST" })
	.validator(z.object({ documentId: z.string().uuid() }))
	.handler(async ({ data }) => {
		const doc = await getDocument(data.documentId);
		if (!doc?.textractResult) {
			throw new Error(
				"No textract result found — run full processing first.",
			);
		}
		const paymentResult = extractPagoMovil(doc.textractResult);
		await savePaymentResult(data.documentId, paymentResult);
		return paymentResult;
	});

export const exportDocumentsAsZip = createServerFn({ method: "POST" }).handler(
	async () => {
		return exportDocumentsZip();
	},
);
