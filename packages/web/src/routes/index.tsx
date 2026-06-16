import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "#/components/ui/button.tsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card.tsx";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
			<Card>
				<CardHeader>
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
						Workflow
					</p>
					<CardTitle className="mt-3 text-2xl">
						Upload, inspect, and clean up documents from one place.
					</CardTitle>
					<CardDescription className="max-w-2xl text-base">
						Files are uploaded directly to S3 using presigned URLs. Metadata is
						stored in DynamoDB so the list page can show what is currently in
						the system and remove it when needed.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-wrap gap-3">
						<Button asChild>
							<Link to="/upload">Upload a document</Link>
						</Button>
						<Button variant="outline" asChild>
							<Link to="/documents">Browse documents</Link>
						</Button>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>What this app stores</CardTitle>
				</CardHeader>
				<CardContent>
					<dl className="grid gap-4 text-sm text-slate-700">
						<div className="rounded-2xl bg-white/80 p-4">
							<dt className="font-medium text-slate-900">S3 object</dt>
							<dd className="mt-1">
								The raw uploaded document lives in the `Documents` bucket.
							</dd>
						</div>
						<div className="rounded-2xl bg-white/80 p-4">
							<dt className="font-medium text-slate-900">DynamoDB row</dt>
							<dd className="mt-1">
								Filename, content type, size, key, and created timestamp.
							</dd>
						</div>
						<div className="rounded-2xl bg-white/80 p-4">
							<dt className="font-medium text-slate-900">Delete behavior</dt>
							<dd className="mt-1">
								Removes both the object from S3 and the matching metadata row.
							</dd>
						</div>
					</dl>
				</CardContent>
			</Card>
		</div>
	);
}
