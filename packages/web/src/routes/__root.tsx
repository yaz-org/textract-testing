import { HeadContent, Link, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Textract Testing Documents' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  shellComponent: RootDocument,
  component: RootLayout,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'TanStack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}

function RootLayout() {
  const navClassName =
    'rounded-full border border-amber-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-amber-300 hover:text-amber-700'

  return (
    <div className='min-h-screen'>
      <div className='mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8'>
        <header className='rounded-[2rem] border border-white/80 bg-white/70 px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur'>
          <div className='flex flex-col gap-5 md:flex-row md:items-end md:justify-between'>
            <div className='max-w-2xl'>
              <p className='text-sm font-semibold uppercase tracking-[0.3em] text-amber-700'>
                Internal Document Console
              </p>
              <h1 className='mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl'>
                Upload documents to S3 and manage their metadata in DynamoDB.
              </h1>
              <p className='mt-3 text-base text-slate-600'>
                Built as a small TanStack Start app on SST for internal use.
              </p>
            </div>

            <nav className='flex flex-wrap gap-3'>
              <Link to='/' className={navClassName}>
                Overview
              </Link>
              <Link to='/upload' className={navClassName}>
                Upload
              </Link>
              <Link to='/documents' className={navClassName}>
                Documents
              </Link>
            </nav>
          </div>
        </header>

        <main className='flex-1 py-8'>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
