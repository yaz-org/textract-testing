import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "#/components/ui/button.tsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card.tsx";
import { Input } from "#/components/ui/input.tsx";
import { Label } from "#/components/ui/label.tsx";
import { formatBytes } from "#/lib/format";
import { createDocumentUpload, finalizeDocumentUpload } from "#/lib/server-fns";

export const Route = createFileRoute("/upload")({
	component: UploadPage,
});

function UploadPage() {
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setMessage(null);
		setError(null);

		const form = event.currentTarget;
		const fileInput = form.elements.namedItem(
			"document",
		) as HTMLInputElement | null;
		const file = fileInput?.files?.[0];

		if (!file) {
			setError("Choose a file to upload.");
			return;
		}

		setIsUploading(true);

		try {
			const upload = await createDocumentUpload({
				data: {
					fileName: file.name,
					contentType: file.type || "application/octet-stream",
					size: file.size,
				},
			});

			const response = await fetch(upload.uploadUrl, {
				method: "PUT",
				headers: {
					"content-type": file.type || "application/octet-stream",
				},
				body: file,
			});

			if (!response.ok) {
				throw new Error(`Upload failed with status ${response.status}.`);
			}

			await finalizeDocumentUpload({
				data: {
					documentId: upload.documentId,
					fileName: file.name,
					s3Key: upload.s3Key,
					contentType: file.type || "application/octet-stream",
					size: file.size,
				},
			});

			form.reset();
			setMessage(`${file.name} uploaded successfully.`);
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Upload failed.");
		} finally {
			setIsUploading(false);
		}
	}

	return (
		<div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
			<Card>
				<CardHeader>
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
						Upload
					</p>
					<CardTitle className="mt-3 text-2xl">Send a document to S3</CardTitle>
					<CardDescription className="text-base">
						This uses a presigned URL, so the browser uploads the file directly
						to the bucket and then saves the metadata record in DynamoDB.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form className="space-y-5" onSubmit={handleSubmit}>
						<div>
							<Label htmlFor="document" className="mb-2 block">
								Document
							</Label>
							<Input name="document" type="file" id="document" />
						</div>

						<Button type="submit" disabled={isUploading}>
							{isUploading ? "Uploading..." : "Upload document"}
						</Button>

						{message ? (
							<p className="text-sm font-medium text-emerald-700">{message}</p>
						) : null}
						{error ? (
							<p className="text-sm font-medium text-rose-700">{error}</p>
						) : null}
					</form>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Upload notes</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="space-y-4 text-sm text-slate-700">
						<li className="rounded-2xl bg-white/80 p-4">
							Files are limited to {formatBytes(50 * 1024 * 1024)} in this first
							pass.
						</li>
						<li className="rounded-2xl bg-white/80 p-4">
							Metadata is written only after the S3 upload succeeds.
						</li>
						<li className="rounded-2xl bg-white/80 p-4">
							The app is intentionally unauthenticated because it is for
							internal use.
						</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}
