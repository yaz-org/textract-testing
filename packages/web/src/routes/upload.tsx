import { createFileRoute } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
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

interface FileEntry {
	id: string;
	file: File;
	status: "pending" | "uploading" | "success" | "error";
	error?: string;
}

function UploadPage() {
	const [entries, setEntries] = useState<FileEntry[]>([]);
	const [isUploading, setIsUploading] = useState(false);

	function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
		const selected = Array.from(event.currentTarget.files ?? []);
		if (selected.length === 0) return;

		setEntries((prev) => [
			...prev,
			...selected.map((file) => ({
				id: crypto.randomUUID(),
				file,
				status: "pending" as const,
			})),
		]);

		event.currentTarget.value = "";
	}

	function handleRemove(id: string) {
		setEntries((prev) => prev.filter((e) => e.id !== id));
	}

	function updateEntry(id: string, patch: Partial<FileEntry>) {
		setEntries((prev) =>
			prev.map((e) => (e.id === id ? { ...e, ...patch } : e)),
		);
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const pending = entries.filter((e) => e.status === "pending");
		if (pending.length === 0) return;

		setIsUploading(true);

		let successCount = 0;

		for (const entry of pending) {
			updateEntry(entry.id, { status: "uploading", error: undefined });

			try {
				const upload = await createDocumentUpload({
					data: {
						fileName: entry.file.name,
						contentType: entry.file.type || "application/octet-stream",
						size: entry.file.size,
					},
				});

				const response = await fetch(upload.uploadUrl, {
					method: "PUT",
					headers: {
						"content-type": entry.file.type || "application/octet-stream",
					},
					body: entry.file,
				});

				if (!response.ok) {
					throw new Error(`Upload failed with status ${response.status}.`);
				}

				await finalizeDocumentUpload({
					data: {
						documentId: upload.documentId,
						fileName: entry.file.name,
						s3Key: upload.s3Key,
						contentType: entry.file.type || "application/octet-stream",
						size: entry.file.size,
					},
				});

				updateEntry(entry.id, { status: "success" });
				successCount++;
			} catch (caught) {
				updateEntry(entry.id, {
					status: "error",
					error: caught instanceof Error ? caught.message : "Upload failed.",
				});
			}
		}

		setIsUploading(false);

		if (successCount === pending.length) {
			setEntries([]);
		}
	}

	const pendingCount = entries.filter((e) => e.status === "pending").length;

	return (
		<div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
			<Card>
				<CardHeader>
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
						Upload
					</p>
					<CardTitle className="mt-3 text-2xl">Send documents to S3</CardTitle>
					<CardDescription className="text-base">
						This uses a presigned URL, so the browser uploads the file directly
						to the bucket and then saves the metadata record in DynamoDB.
					</CardDescription>
				</CardHeader>

				<CardContent>
					<form className="space-y-5" onSubmit={handleSubmit}>
						<div>
							<Label htmlFor="document" className="mb-2 block">
								Documents
							</Label>
							<Input
								multiple
								name="document"
								type="file"
								id="document"
								onChange={handleFileSelect}
							/>
						</div>

						{entries.length > 0 && (
							<ul className="space-y-2">
								{entries.map((entry) => (
									<li
										key={entry.id}
										className="flex items-center justify-between gap-3 rounded-lg border bg-white/60 px-3 py-2 text-sm"
									>
										<span className="min-w-0 truncate">{entry.file.name}</span>
										<span className="shrink-0 text-slate-500">
											{formatBytes(entry.file.size)}
										</span>

										{entry.status === "uploading" && (
											<span className="size-4 animate-spin rounded-full border-2 border-slate-300 border-t-amber-600" />
										)}
										{entry.status === "success" && (
											<span className="shrink-0 text-emerald-600">&check;</span>
										)}
										{entry.status === "error" && (
											<span
												className="shrink-0 text-rose-600"
												title={entry.error}
											>
												&cross;
											</span>
										)}

										{entry.status !== "uploading" && (
											<button
												type="button"
												onClick={() => handleRemove(entry.id)}
												className="shrink-0 rounded p-0.5 text-slate-400 hover:text-rose-600"
											>
												<XIcon className="size-4" />
											</button>
										)}
									</li>
								))}
							</ul>
						)}

						<Button type="submit" disabled={isUploading || pendingCount === 0}>
							{isUploading
								? "Uploading..."
								: pendingCount > 0
									? `Upload ${pendingCount} file${pendingCount === 1 ? "" : "s"}`
									: "Upload files"}
						</Button>
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
