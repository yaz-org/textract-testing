import '@tanstack/react-start/server-only'

import { randomUUID } from 'node:crypto'
import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Resource } from 'sst'
import { z } from 'zod'

const s3 = new S3Client({})
const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({}))

const fileNameSchema = z
  .string()
  .trim()
  .min(1)
  .max(255)
  .transform((value) => value.replace(/[^A-Za-z0-9._-]+/g, '-'))

export const uploadRequestSchema = z.object({
  fileName: fileNameSchema,
  contentType: z.string().trim().min(1).max(255),
  size: z.number().int().positive().max(50 * 1024 * 1024),
})

export const finalizeUploadSchema = z.object({
  documentId: z.string().uuid(),
  fileName: z.string().trim().min(1).max(255),
  s3Key: z.string().trim().min(1).max(1024),
  contentType: z.string().trim().min(1).max(255),
  size: z.number().int().positive().max(50 * 1024 * 1024),
})

export const deleteDocumentSchema = z.object({
  documentId: z.string().uuid(),
  s3Key: z.string().trim().min(1).max(1024),
})

export type DocumentRecord = {
  documentId: string
  fileName: string
  s3Key: string
  contentType: string
  size: number
  createdAt: string
}

export async function createUploadUrl(input: z.infer<typeof uploadRequestSchema>) {
  const documentId = randomUUID()
  const sanitizedFileName = fileNameSchema.parse(input.fileName)
  const s3Key = `${documentId}/${sanitizedFileName}`
  const command = new PutObjectCommand({
    Bucket: Resource.Documents.name,
    Key: s3Key,
    ContentType: input.contentType,
    ContentLength: input.size,
  })

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 })

  return {
    documentId,
    s3Key,
    uploadUrl,
  }
}

export async function saveDocumentRecord(input: z.infer<typeof finalizeUploadSchema>) {
  const createdAt = new Date().toISOString()
  const item: DocumentRecord = {
    ...input,
    createdAt,
  }

  await dynamo.send(
    new PutCommand({
      TableName: Resource.DocumentsTable.name,
      Item: item,
      ConditionExpression: 'attribute_not_exists(documentId)',
    }),
  )

  return item
}

export async function listDocuments() {
  const response = await dynamo.send(
    new ScanCommand({
      TableName: Resource.DocumentsTable.name,
    }),
  )

  return ((response.Items ?? []) as DocumentRecord[]).sort((left, right) =>
    right.createdAt.localeCompare(left.createdAt),
  )
}

export async function deleteDocument(input: z.infer<typeof deleteDocumentSchema>) {
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
  ])

  return { success: true }
}
