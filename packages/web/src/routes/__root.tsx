import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Link,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Button } from "#/components/ui/button.tsx";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{ title: "Textract Testing Documents" },
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
	component: RootLayout,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
      <body className="font-sans antialiased wrap-anywhere">
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}

function RootLayout() {
	return (
		<div className="h-dvh mx-auto px-4 py-8 flex flex-col overflow-hidden gap-4">
      <header className="rounded-4xl border border-white/80 bg-white/70 px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
              Internal Document Console
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Upload
            </h1>
          </div>

          <nav className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link to="/">Overview</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/upload">Upload</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/documents">Documents</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1 min-h-0">
        <Outlet />
      </main>
		</div>
	);
}
