import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { UploadUrlResult } from "./documents";
import {
	createUploadUrls,
	deleteDocuments,
	deleteDocumentsSchema,
	finalizeUploadSchema,
	getPresignedUrl,
	listDocuments,
	saveDocumentRecord,
	saveTextractResult,
	uploadRequestSchema,
} from "./documents";
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
					await saveTextractResult(documentId, result);
					return { documentId, success: true as const };
				}),
			);
			results.push(...batchResults);
		}
		return results;
	});
