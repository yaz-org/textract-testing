import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { Resource } from "sst";
import type { UploadUrlResult } from "./documents";
import {
	createUploadUrls,
	deleteDocuments,
	deleteDocumentsSchema,
	finalizeUploadSchema,
	getDocument,
	getPresignedUrl,
	listDocuments,
	saveDocumentRecord,
	uploadRequestSchema,
} from "./documents";
import { exportDocumentsZip } from "./documents";

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
			data.map(({ documentId, s3Key }) =>
				sqs.send(
					new SendMessageCommand({
						QueueUrl: Resource.DocumentQueue.url,
						MessageBody: JSON.stringify({ documentId, s3Key }),
						MessageGroupId: "documents",
					}),
				),
			),
		);
		return data.map(({ documentId }) => ({
			documentId,
			success: true as const,
		}));
	});

export const reprocessPayment = createServerFn({ method: "POST" })
	.validator(z.object({ documentId: z.string().uuid() }))
	.handler(async ({ data }) => {
		const doc = await getDocument(data.documentId);
		if (!doc) {
			throw new Error("No document found");
		}
		await sqs.send(
			new SendMessageCommand({
				QueueUrl: Resource.DocumentQueue.url,
				MessageBody: JSON.stringify({
					documentId: doc.documentId,
					s3Key: doc.s3Key,
				}),
				MessageGroupId: "documents",
			}),
		);
		return { success: true as const };
	});

export const exportDocumentsAsZip = createServerFn({ method: "POST" })
.handler(async () => {
		return await exportDocumentsZip();
	},
);
