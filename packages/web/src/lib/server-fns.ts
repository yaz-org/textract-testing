import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { UploadUrlResult } from "./documents";
import {
	createUploadUrls,
	deleteDocument,
	deleteDocumentSchema,
	finalizeUploadSchema,
	getPresignedUrl,
	listDocuments,
	saveDocumentRecord,
	uploadRequestSchema,
} from "./documents";

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
	.validator(deleteDocumentSchema)
	.handler(async ({ data }) => {
		return deleteDocument(data);
	});
