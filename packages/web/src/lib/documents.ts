import "@tanstack/react-start/server-only";

import { randomUUID } from "node:crypto";
import {
	ConditionalCheckFailedException,
	DynamoDBClient,
} from "@aws-sdk/client-dynamodb";
import {
  DeleteObjectCommand,
  GetObjectCommand, PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import {
	DeleteCommand,
	DynamoDBDocumentClient,
	GetCommand,
	PutCommand,
	QueryCommand,
	ScanCommand,
	UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ZipArchive } from "archiver";
import { Resource } from "sst";
import { z } from "zod";
import type { DoctrResult, InferenceRecord, PagoMovilPayment } from "./payment";
import type { TextractResult } from "./textract";

const s3 = new S3Client({});
const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}), {
	marshallOptions: { removeUndefinedValues: true },
});



const fileNameSchema = z
	.string()
	.trim()
	.min(1)
	.max(255)
	.transform((value) => value.replace(/[^A-Za-z0-9._-]+/g, "-"));

export const uploadRequestSchema = z.object({
	fileName: fileNameSchema,
	contentType: z.string().trim().min(1).max(255),
	size: z
		.number()
		.int()
		.positive()
		.max(2 * 1024 * 1024),
	contentHash: z.string().length(64),
});

export const finalizeUploadSchema = z.object({
	documentId: z.string().uuid(),
	fileName: z.string().trim().min(1).max(255),
	s3Key: z.string().trim().min(1).max(1024),
	contentType: z.string().trim().min(1).max(255),
	size: z
		.number()
		.int()
		.positive()
		.max(2 * 1024 * 1024),
	contentHash: z.string().length(64),
});

export const deleteDocumentSchema = z.object({
	documentId: z.string().uuid(),
	s3Key: z.string().trim().min(1).max(1024),
});

export const deleteDocumentsSchema = z.array(deleteDocumentSchema);

export type DocumentRecord = {
	documentId: string;
	fileName: string;
	s3Key: string;
	contentType: string;
	size: number;
	contentHash: string;
	createdAt: string;
	textractResult?: TextractResult;
	textractExtractedAt?: string;
	paymentResult?: PagoMovilPayment;
	doctrResult?: DoctrResult;
	doctrExtractedAt?: string;
	inferenceHistory?: InferenceRecord[];
};

export async function createUploadUrl(
	input: z.infer<typeof uploadRequestSchema>,
) {
	const existing = await dynamo.send(
		new QueryCommand({
			TableName: Resource.DocumentsTable.name,
			IndexName: "HashIndex",
			KeyConditionExpression: "contentHash = :hash",
			ExpressionAttributeValues: { ":hash": input.contentHash },
		}),
	);

	if (existing.Items && existing.Items.length > 0) {
		throw new Error("A file with this content has already been uploaded.");
	}

	try {
		await dynamo.send(
			new PutCommand({
				TableName: Resource.HashLockTable.name,
				Item: {
					contentHash: input.contentHash,
					ttl: Math.floor(Date.now() / 1000) + 300,
				},
				ConditionExpression: "attribute_not_exists(contentHash)",
			}),
		);
	} catch (error) {
		if (error instanceof ConditionalCheckFailedException) {
			throw new Error(
				"This file is currently being uploaded by another process.",
			);
		}
		throw error;
	}

	const documentId = randomUUID();
	const sanitizedFileName = fileNameSchema.parse(input.fileName);
	const s3Key = `${documentId}/${sanitizedFileName}`;
	const command = new PutObjectCommand({
		Bucket: Resource.Documents.name,
		Key: s3Key,
		ContentType: input.contentType,
		ContentLength: input.size,
	});

	const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });

	return {
		documentId,
		s3Key,
		uploadUrl,
	};
}

export type UploadUrlResult =
	| { tag: "success"; documentId: string; s3Key: string; uploadUrl: string }
	| { tag: "error"; error: string };

export async function createUploadUrls(
	inputs: z.infer<typeof uploadRequestSchema>[],
): Promise<UploadUrlResult[]> {
	return Promise.all(
		inputs.map(async (input) => {
			try {
				const result = await createUploadUrl(input);
				return { tag: "success" as const, ...result };
			} catch (caught) {
				const message =
					caught instanceof Error ? caught.message : "Upload failed.";
				return { tag: "error" as const, error: message };
			}
		}),
	);
}

export async function saveDocumentRecord(
	input: z.infer<typeof finalizeUploadSchema>,
) {
	const createdAt = new Date().toISOString();
	const item: DocumentRecord = {
		...input,
		createdAt,
	};

	await dynamo.send(
		new PutCommand({
			TableName: Resource.DocumentsTable.name,
			Item: item,
			ConditionExpression: "attribute_not_exists(documentId)",
		}),
	);

	await dynamo.send(
		new DeleteCommand({
			TableName: Resource.HashLockTable.name,
			Key: { contentHash: input.contentHash },
		}),
	);

	return item;
}

export async function savePaymentResult(
	documentId: string,
	result: PagoMovilPayment,
) {
	await dynamo.send(
		new UpdateCommand({
			TableName: Resource.DocumentsTable.name,
			Key: { documentId },
			UpdateExpression: "SET paymentResult = :result",
			ConditionExpression: "attribute_exists(documentId)",
			ExpressionAttributeValues: {
				":result": result,
			},
		}),
	);
}

export async function saveTextractResult(
	documentId: string,
	result: TextractResult,
) {
	await dynamo.send(
		new UpdateCommand({
			TableName: Resource.DocumentsTable.name,
			Key: { documentId },
			UpdateExpression:
				"SET textractResult = :result, textractExtractedAt = :ts",
			ExpressionAttributeValues: {
				":result": result,
				":ts": new Date().toISOString(),
			},
		}),
	);
}

export async function saveDoctrResult(
	documentId: string,
	result: DoctrResult,
) {
  await dynamo.send(
		new UpdateCommand({
			TableName: Resource.DocumentsTable.name,
			Key: { documentId },
			UpdateExpression:
				"SET doctrResult = :result, doctrExtractedAt = :ts",
			ConditionExpression: "attribute_exists(documentId)",
			ExpressionAttributeValues: {
				":result": result,
				":ts": new Date().toISOString(),
			},
		}),
	);
}

export async function getPresignedUrl(s3Key: string) {
	const command = new GetObjectCommand({
		Bucket: Resource.Documents.name,
		Key: s3Key,
	});
	return getSignedUrl(s3, command, { expiresIn: 3600 });
}

export async function listDocuments() {
	const response = await dynamo.send(
		new ScanCommand({
			TableName: Resource.DocumentsTable.name,
		}),
	);

	return ((response.Items ?? []) as DocumentRecord[]).sort((left, right) =>
		right.createdAt.localeCompare(left.createdAt),
	);
}

export async function getDocument(
	documentId: string,
): Promise<DocumentRecord | undefined> {
	const response = await dynamo.send(
		new GetCommand({
			TableName: Resource.DocumentsTable.name,
			Key: { documentId },
		}),
	);
	return response.Item as DocumentRecord | undefined;
}

export async function deleteDocument(
	input: z.infer<typeof deleteDocumentSchema>,
) {
	await Promise.all([
		dynamo.send(
			new DeleteCommand({
				TableName: Resource.DocumentsTable.name,
				Key: { documentId: input.documentId },
			}),
		),
		s3.send(
			new DeleteObjectCommand({
				Bucket: Resource.Documents.name,
				Key: input.s3Key,
			}),
		),
	]);

	return { success: true };
}

export async function deleteDocuments(
	inputs: z.infer<typeof deleteDocumentsSchema>,
) {
	await Promise.all(inputs.map((input) => deleteDocument(input)));
	return { success: true };
}

export async function exportDocumentsZip(): Promise<{ presignedUrl: string, docSize: number }> {
	const documents = await listDocuments();

	const docsWithResults = documents.filter(
		(doc) => doc.paymentResult,
	);

  console.log(`Exporting ${docsWithResults.length} documents with results out of ${documents.length} total documents.`);

	const archive = new ZipArchive({ zlib: { level: 9 } });
	const chunks: Buffer[] = [];

	archive.on("data", (chunk: Buffer) => chunks.push(chunk));

	for (const doc of docsWithResults) {
		archive.append(
			JSON.stringify(
				{
					fileName: doc.fileName,
					fileSize: doc.size,
          s3Key: doc.s3Key,
					paymentResult: doc.paymentResult ?? null,
          inferenceHistory: doc.inferenceHistory ?? null,
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

	return { presignedUrl, docSize: docsWithResults.length };
}


