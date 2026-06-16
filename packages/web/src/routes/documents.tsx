import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { deleteStoredDocument, getDocuments } from '#/lib/server-fns'
import { formatBytes, formatDate } from '#/lib/format'

export const Route = createFileRoute('/documents')({
  loader: async () => ({
    documents: await getDocuments(),
  }),
  component: DocumentsPage,
})

function DocumentsPage() {
  const { documents } = Route.useLoaderData()
  const router = useRouter()
  const [pendingId, setPendingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete(documentId: string, s3Key: string) {
    setPendingId(documentId)
    setError(null)

    try {
      await deleteStoredDocument({ data: { documentId, s3Key } })
      await router.invalidate()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Delete failed.')
    } finally {
      setPendingId(null)
    }
  }

  return (
    <section className='rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_16px_50px_rgba(15,23,42,0.08)]'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <p className='text-sm font-semibold uppercase tracking-[0.3em] text-amber-700'>Documents</p>
          <h2 className='mt-3 text-2xl font-semibold text-slate-900'>Current document records</h2>
          <p className='mt-3 text-slate-600'>Browse DynamoDB metadata and remove documents from both storage layers.</p>
        </div>
        <div className='rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-slate-700'>
          {documents.length} {documents.length === 1 ? 'document' : 'documents'}
        </div>
      </div>

      {error ? <p className='mt-5 text-sm font-medium text-rose-700'>{error}</p> : null}

      {documents.length === 0 ? (
        <div className='mt-8 rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600'>
          No documents have been uploaded yet.
        </div>
      ) : (
        <div className='mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200'>
          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y divide-slate-200'>
              <thead className='bg-slate-50'>
                <tr className='text-left text-sm text-slate-600'>
                  <th className='px-4 py-3 font-medium'>Name</th>
                  <th className='px-4 py-3 font-medium'>Type</th>
                  <th className='px-4 py-3 font-medium'>Size</th>
                  <th className='px-4 py-3 font-medium'>Created</th>
                  <th className='px-4 py-3 font-medium'>S3 Key</th>
                  <th className='px-4 py-3 font-medium'>Action</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-slate-200 bg-white text-sm text-slate-700'>
                {documents.map((document) => (
                  <tr key={document.documentId}>
                    <td className='px-4 py-4 font-medium text-slate-900'>{document.fileName}</td>
                    <td className='px-4 py-4'>{document.contentType}</td>
                    <td className='px-4 py-4'>{formatBytes(document.size)}</td>
                    <td className='px-4 py-4'>{formatDate(document.createdAt)}</td>
                    <td className='px-4 py-4 text-xs text-slate-500'>{document.s3Key}</td>
                    <td className='px-4 py-4'>
                      <button
                        type='button'
                        onClick={() => handleDelete(document.documentId, document.s3Key)}
                        disabled={pendingId === document.documentId}
                        className='rounded-full border border-rose-200 px-4 py-2 font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60'
                      >
                        {pendingId === document.documentId ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}
