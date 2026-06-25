import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";
import { createServerFn } from "@tanstack/react-start";
import { Resource } from "sst";
import { z } from "zod";
import type { UploadUrlResult } from "./documents";
import {
	clearDocumentResults,
	createUploadUrls,
	deleteDocuments,
	deleteDocumentsSchema,
	exportDocumentsZip,
	finalizeUploadSchema,
	getPresignedUrl,
	listDocuments,
	saveDocumentRecord,
	uploadRequestSchema,
} from "./documents";

const sqs = new SQSClient({});

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
		await Promise.all(
			data.map(async ({ documentId, s3Key }) => {
				const downloadUrl = await getPresignedUrl(s3Key);
				const callbackUrl = `${Resource.ProcessDocumentFn.url}/documents/${documentId}`;
				await sqs.send(
					new SendMessageCommand({
						QueueUrl: Resource.DocumentQueue.url,
						MessageBody: JSON.stringify({ downloadUrl, callbackUrl }),
						MessageGroupId: "documents",
					}),
				);
			}),
		);
		return data.map(({ documentId }) => ({
			documentId,
			success: true as const,
		}));
	});

export const clearStoredDocumentResults = createServerFn({ method: "POST" })
	.validator(z.array(z.object({ documentId: z.string().uuid() })))
	.handler(async ({ data }) => {
		return clearDocumentResults(data.map((d) => d.documentId));
	});

export const exportDocumentsAsZip = createServerFn({ method: "POST" }).handler(
	async () => {
		return await exportDocumentsZip();
	},
);
