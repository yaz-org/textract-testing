import { createServerFn } from '@tanstack/react-start'
import {
  createUploadUrl,
  deleteDocument,
  deleteDocumentSchema,
  finalizeUploadSchema,
  listDocuments,
  saveDocumentRecord,
  uploadRequestSchema,
} from './documents'

export const getDocuments = createServerFn({ method: 'GET' }).handler(async () => {
  return listDocuments()
})

export const createDocumentUpload = createServerFn({ method: 'POST' })
  .validator(uploadRequestSchema)
  .handler(async ({ data }) => {
    return createUploadUrl(data)
  })

export const finalizeDocumentUpload = createServerFn({ method: 'POST' })
  .validator(finalizeUploadSchema)
  .handler(async ({ data }) => {
    return saveDocumentRecord(data)
  })

export const deleteStoredDocument = createServerFn({ method: 'POST' })
  .validator(deleteDocumentSchema)
  .handler(async ({ data }) => {
    return deleteDocument(data)
  })
