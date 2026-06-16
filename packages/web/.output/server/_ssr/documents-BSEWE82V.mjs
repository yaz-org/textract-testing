import { a as DynamoDBClient } from "../_libs/@aws-sdk/client-dynamodb+[...].mjs";
import { n as DeleteObjectCommand, r as S3Client, t as PutObjectCommand } from "../_libs/@aws-sdk/client-s3+[...].mjs";
import { i as DeleteCommand, n as ScanCommand, r as PutCommand, t as DynamoDBDocumentClient } from "../_libs/@aws-sdk/lib-dynamodb+[...].mjs";
import { t as getSignedUrl } from "../_libs/aws-sdk__s3-request-presigner.mjs";
import { t as Resource } from "../_libs/sst.mjs";
import { n as object, r as string, t as number } from "../_libs/zod.mjs";
import { randomUUID } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-BSEWE82V.js
var s3 = new S3Client({});
var dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}));
var fileNameSchema = string().trim().min(1).max(255).transform((value) => value.replace(/[^A-Za-z0-9._-]+/g, "-"));
var uploadRequestSchema = object({
	fileName: fileNameSchema,
	contentType: string().trim().min(1).max(255),
	size: number().int().positive().max(50 * 1024 * 1024)
});
var finalizeUploadSchema = object({
	documentId: string().uuid(),
	fileName: string().trim().min(1).max(255),
	s3Key: string().trim().min(1).max(1024),
	contentType: string().trim().min(1).max(255),
	size: number().int().positive().max(50 * 1024 * 1024)
});
var deleteDocumentSchema = object({
	documentId: string().uuid(),
	s3Key: string().trim().min(1).max(1024)
});
async function createUploadUrl(input) {
	const documentId = randomUUID();
	const s3Key = `${documentId}/${fileNameSchema.parse(input.fileName)}`;
	return {
		documentId,
		s3Key,
		uploadUrl: await getSignedUrl(s3, new PutObjectCommand({
			Bucket: Resource.Documents.name,
			Key: s3Key,
			ContentType: input.contentType,
			ContentLength: input.size
		}), { expiresIn: 300 })
	};
}
async function saveDocumentRecord(input) {
	const createdAt = (/* @__PURE__ */ new Date()).toISOString();
	const item = {
		...input,
		createdAt
	};
	await dynamo.send(new PutCommand({
		TableName: Resource.DocumentsTable.name,
		Item: item,
		ConditionExpression: "attribute_not_exists(documentId)"
	}));
	return item;
}
async function listDocuments() {
	return ((await dynamo.send(new ScanCommand({ TableName: Resource.DocumentsTable.name }))).Items ?? []).sort((left, right) => right.createdAt.localeCompare(left.createdAt));
}
async function deleteDocument(input) {
	await Promise.all([dynamo.send(new DeleteCommand({
		TableName: Resource.DocumentsTable.name,
		Key: { documentId: input.documentId }
	})), s3.send(new DeleteObjectCommand({
		Bucket: Resource.Documents.name,
		Key: input.s3Key
	}))]);
	return { success: true };
}
//#endregion
export { listDocuments as a, finalizeUploadSchema as i, deleteDocument as n, saveDocumentRecord as o, deleteDocumentSchema as r, uploadRequestSchema as s, createUploadUrl as t };
