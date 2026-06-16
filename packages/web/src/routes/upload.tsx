import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { createDocumentUpload, finalizeDocumentUpload } from '#/lib/server-fns'
import { formatBytes } from '#/lib/format'

export const Route = createFileRoute('/upload')({
  component: UploadPage,
})

function UploadPage() {
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setMessage(null)
    setError(null)

    const form = event.currentTarget
    const fileInput = form.elements.namedItem('document') as HTMLInputElement | null
    const file = fileInput?.files?.[0]

    if (!file) {
      setError('Choose a file to upload.')
      return
    }

    setIsUploading(true)

    try {
      const upload = await createDocumentUpload({
        data: {
          fileName: file.name,
          contentType: file.type || 'application/octet-stream',
          size: file.size,
        },
      })

      const response = await fetch(upload.uploadUrl, {
        method: 'PUT',
        headers: {
          'content-type': file.type || 'application/octet-stream',
        },
        body: file,
      })

      if (!response.ok) {
        throw new Error(`Upload failed with status ${response.status}.`)
      }

      await finalizeDocumentUpload({
        data: {
          documentId: upload.documentId,
          fileName: file.name,
          s3Key: upload.s3Key,
          contentType: file.type || 'application/octet-stream',
          size: file.size,
        },
      })

      form.reset()
      setMessage(`${file.name} uploaded successfully.`)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Upload failed.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className='grid gap-6 lg:grid-cols-[1fr_0.9fr]'>
      <section className='rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_16px_50px_rgba(15,23,42,0.08)]'>
        <p className='text-sm font-semibold uppercase tracking-[0.3em] text-amber-700'>Upload</p>
        <h2 className='mt-3 text-2xl font-semibold text-slate-900'>Send a document to S3</h2>
        <p className='mt-3 text-slate-600'>
          This uses a presigned URL, so the browser uploads the file directly to the bucket and then
          saves the metadata record in DynamoDB.
        </p>

        <form className='mt-8 space-y-5' onSubmit={handleSubmit}>
          <label className='block'>
            <span className='mb-2 block text-sm font-medium text-slate-800'>Document</span>
            <input
              name='document'
              type='file'
              className='block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white'
            />
          </label>

          <button
            type='submit'
            disabled={isUploading}
            className='rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400'
          >
            {isUploading ? 'Uploading...' : 'Upload document'}
          </button>

          {message ? <p className='text-sm font-medium text-emerald-700'>{message}</p> : null}
          {error ? <p className='text-sm font-medium text-rose-700'>{error}</p> : null}
        </form>
      </section>

      <section className='rounded-[2rem] border border-amber-200 bg-amber-50/80 p-8'>
        <h3 className='text-lg font-semibold text-slate-900'>Upload notes</h3>
        <ul className='mt-5 space-y-4 text-sm text-slate-700'>
          <li className='rounded-2xl bg-white/80 p-4'>
            Files are limited to {formatBytes(50 * 1024 * 1024)} in this first pass.
          </li>
          <li className='rounded-2xl bg-white/80 p-4'>
            Metadata is written only after the S3 upload succeeds.
          </li>
          <li className='rounded-2xl bg-white/80 p-4'>
            The app is intentionally unauthenticated because it is for internal use.
          </li>
        </ul>
      </section>
    </div>
  )
}
