import { createFileRoute } from "@tanstack/react-router";
import { Check, FileWarning, Loader2, Trash2, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
import { CONCURRENCY_MAX, createDocumentUpload, finalizeDocumentUpload } from "#/lib/server-fns";

async function computeSHA256(file: File): Promise<string> {
	const buffer = await file.arrayBuffer();
	const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const Route = createFileRoute("/upload")({
	component: UploadPage,
});

interface FileEntry {
	id: string;
	file: File;
	thumbUrl: string;
	status: "pending" | "uploading" | "success" | "error" | "duplicate";
	error?: string;
}

function UploadPage() {
	const [entries, setEntries] = useState<FileEntry[]>([]);
	const [isUploading, setIsUploading] = useState(false);
	const entriesRef = useRef(entries);
	entriesRef.current = entries;

	useEffect(() => {
		return () => {
			for (const entry of entriesRef.current) {
				URL.revokeObjectURL(entry.thumbUrl);
			}
		};
	}, []);

	function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
		const selected = Array.from(event.currentTarget.files ?? []);
		if (selected.length === 0) return;

		setEntries((prev) => [
			...prev,
			...selected.map((file) => ({
				id: crypto.randomUUID(),
				file,
				thumbUrl: URL.createObjectURL(file),
				status: "pending" as const,
			})),
		]);

		event.currentTarget.value = "";
	}

	function handleRemove(id: string) {
		setEntries((prev) => {
			const entry = prev.find((e) => e.id === id);
			if (entry) URL.revokeObjectURL(entry.thumbUrl);
			return prev.filter((e) => e.id !== id);
		});
	}

	function handleClearAll() {
		for (const entry of entries) {
			URL.revokeObjectURL(entry.thumbUrl);
		}
		setEntries([]);
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

		const hashes = await Promise.all(
			pending.map((entry) => computeSHA256(entry.file)),
		);

		const results = await createDocumentUpload({
			data: pending.map((entry, i) => ({
				fileName: entry.file.name,
				contentType: entry.file.type || "application/octet-stream",
				size: entry.file.size,
				contentHash: hashes[i],
			})),
		});

		type ActiveItem = {
			entry: FileEntry;
			result: { tag: "success"; documentId: string; s3Key: string; uploadUrl: string };
			contentHash: string;
		};

		const active: ActiveItem[] = [];

		for (let i = 0; i < pending.length; i++) {
			const entry = pending[i];
			const result = results[i];

			if (result.tag === "error") {
				const status =
					result.error.includes("already been uploaded") ||
					result.error.includes("currently being uploaded")
						? "duplicate"
						: "error";
				updateEntry(entry.id, { status, error: result.error });
			} else {
				active.push({ entry, result, contentHash: hashes[i] });
			}
		}

		let successCount = 0;

		for (let i = 0; i < active.length; i += CONCURRENCY_MAX) {
			const batch = active.slice(i, i + CONCURRENCY_MAX);
			const outcomes = await Promise.all(
				batch.map(async ({ entry, result, contentHash }) => {
					updateEntry(entry.id, {
						status: "uploading",
						error: undefined,
					});

					try {
						const response = await fetch(result.uploadUrl, {
							method: "PUT",
							headers: {
								"content-type":
									entry.file.type || "application/octet-stream",
							},
							body: entry.file,
						});

						if (!response.ok) {
							throw new Error(
								`Upload failed with status ${response.status}.`,
							);
						}

						await finalizeDocumentUpload({
							data: {
								documentId: result.documentId,
								fileName: entry.file.name,
								s3Key: result.s3Key,
								contentType:
									entry.file.type || "application/octet-stream",
								size: entry.file.size,
								contentHash,
							},
						});

						return { id: entry.id, ok: true as const };
					} catch (caught) {
						const message =
							caught instanceof Error
								? caught.message
								: "Upload failed.";
						return { id: entry.id, ok: false as const, message };
					}
				}),
			);

			for (const outcome of outcomes) {
				if (outcome.ok) {
					updateEntry(outcome.id, { status: "success" });
					successCount++;
				} else {
					const status =
						outcome.message.includes("already been uploaded") ||
						outcome.message.includes("currently being uploaded")
							? "duplicate"
							: "error";
					updateEntry(outcome.id, { status, error: outcome.message });
				}
			}
		}

		setIsUploading(false);

		if (successCount === pending.length) {
			setEntries([]);
		}
	}

	const pendingCount = entries.filter((e) => e.status === "pending").length;

	return (
		<div className="w-full">
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
								accept="image/*"
								name="document"
								type="file"
								id="document"
								onChange={handleFileSelect}
							/>
						</div>

            <div className="flex gap-3">
              <Button
                  type="submit"
                  disabled={isUploading || pendingCount === 0}
              >
                {isUploading
                    ? "Uploading..."
                    : pendingCount > 0
                        ? `Upload ${pendingCount} file${pendingCount === 1 ? "" : "s"}`
                        : "Upload files"}
              </Button>
              {entries.length > 0 && (
                  <Button
                      type="button"
                      variant="outline"
                      onClick={handleClearAll}
                      disabled={isUploading}
                  >
                    <Trash2 className="mr-1.5 size-4" />
                    Clear all
                  </Button>
              )}
            </div>

						{entries.length > 0 && (
							<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
								{entries.map((entry) => (
									<div
										key={entry.id}
										className="group relative rounded-lg border bg-white/60 p-2 text-sm"
									>
										<div className="aspect-square overflow-hidden rounded-md bg-slate-100">
											{(entry.status === "uploading" ||
												entry.status === "success") && (
												<div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 rounded-md">
													{entry.status === "uploading" ? (
														<Loader2 className="size-6 animate-spin text-white" />
													) : (
														<Check className="size-6 text-emerald-400" />
													)}
												</div>
											)}
											<img
												src={entry.thumbUrl}
												alt={entry.file.name}
												className="size-full object-cover"
											/>
										</div>

										<div className="mt-1.5 space-y-0.5">
											<p className="truncate font-medium">{entry.file.name}</p>
											<p className="text-slate-500">
												{formatBytes(entry.file.size)}
											</p>
										</div>

										{entry.status === "duplicate" && (
											<div className="absolute inset-0 flex items-center justify-center bg-amber-500/20 rounded-lg z-10">
												<span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
													<FileWarning className="size-3" />
													Already exists
												</span>
											</div>
										)}
										{entry.status === "error" && (
											<div className="absolute inset-0 flex items-center justify-center bg-rose-500/20 rounded-lg z-10">
												<span className="rounded-full bg-rose-100 px-2 py-0.5 text-xs font-medium text-rose-700">
													{entry.error}
												</span>
											</div>
										)}

										{(entry.status === "pending" || entry.status === "duplicate")
                        && (
											<button
												type="button"
												onClick={() => handleRemove(entry.id)}
												className="absolute right-2 top-2 z-10 rounded-full bg-white/80 p-1 text-slate-400 opacity-0 shadow transition-opacity hover:text-rose-600 group-hover:opacity-100"
											>
												<XIcon className="size-3.5" />
											</button>
										)}
									</div>
								))}
							</div>
						)}
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
