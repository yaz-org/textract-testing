import { createServerFn } from "@tanstack/react-start";
import {
	createUploadUrl,
	deleteDocument,
	deleteDocumentSchema,
	finalizeUploadSchema,
	getPresignedUrl,
	listDocuments,
	saveDocumentRecord,
	uploadRequestSchema,
} from "./documents";

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
	.validator(uploadRequestSchema)
	.handler(async ({ data }) => {
		return createUploadUrl(data);
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
