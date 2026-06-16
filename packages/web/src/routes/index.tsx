import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div className='grid gap-6 lg:grid-cols-[1.2fr_0.8fr]'>
      <section className='rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_16px_50px_rgba(15,23,42,0.08)]'>
        <p className='text-sm font-semibold uppercase tracking-[0.3em] text-amber-700'>
          Workflow
        </p>
        <h2 className='mt-3 text-2xl font-semibold text-slate-900'>
          Upload, inspect, and clean up documents from one place.
        </h2>
        <p className='mt-4 max-w-2xl text-slate-600'>
          Files are uploaded directly to S3 using presigned URLs. Metadata is stored in DynamoDB so
          the list page can show what is currently in the system and remove it when needed.
        </p>
        <div className='mt-8 flex flex-wrap gap-3'>
          <Link
            to='/upload'
            className='rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700'
          >
            Upload a document
          </Link>
          <Link
            to='/documents'
            className='rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-900'
          >
            Browse documents
          </Link>
        </div>
      </section>

      <section className='rounded-[2rem] border border-amber-200 bg-amber-50/80 p-8'>
        <h3 className='text-lg font-semibold text-slate-900'>What this app stores</h3>
        <dl className='mt-6 grid gap-4 text-sm text-slate-700'>
          <div className='rounded-2xl bg-white/80 p-4'>
            <dt className='font-medium text-slate-900'>S3 object</dt>
            <dd className='mt-1'>The raw uploaded document lives in the `Documents` bucket.</dd>
          </div>
          <div className='rounded-2xl bg-white/80 p-4'>
            <dt className='font-medium text-slate-900'>DynamoDB row</dt>
            <dd className='mt-1'>Filename, content type, size, key, and created timestamp.</dd>
          </div>
          <div className='rounded-2xl bg-white/80 p-4'>
            <dt className='font-medium text-slate-900'>Delete behavior</dt>
            <dd className='mt-1'>Removes both the object from S3 and the matching metadata row.</dd>
          </div>
        </dl>
      </section>
    </div>
  )
}
