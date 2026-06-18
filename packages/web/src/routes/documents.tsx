import { createFileRoute, useRouter } from "@tanstack/react-router";
import { toast } from "sonner";
import { useState } from "react";
import { DocumentsTable } from "#/components/documents/documents-table.tsx";
import { PreviewDialog } from "#/components/documents/preview-dialog.tsx";
import type { DocumentRecord } from "#/lib/documents";
import { deleteStoredDocument, getDocuments, processDocument } from "#/lib/server-fns";
import type { DocumentRow } from "#/components/documents/columns";

export const Route = createFileRoute("/documents")({
	loader: async () => ({
		documents: await getDocuments(),
	}),
	component: DocumentsPage,
});

function DocumentsPage() {
	const { documents } = Route.useLoaderData();
	const router = useRouter();
	const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
	const [processing, setProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [previewDocument, setPreviewDocument] = useState<DocumentRow | null>(
		null,
	);
	const [dialogOpen, setDialogOpen] = useState(false);

	async function handleDelete(document: DocumentRecord) {
		setPendingIds((prev) => new Set(prev).add(document.documentId));
		setError(null);

		try {
			await deleteStoredDocument({ data: [{ documentId: document.documentId, s3Key: document.s3Key }] });
			await router.invalidate();
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Delete failed.");
		} finally {
			setPendingIds((prev) => {
				const next = new Set(prev);
				next.delete(document.documentId);
				return next;
			});
		}
	}

	async function handleDeleteSelected(
		items: { documentId: string; s3Key: string }[],
	) {
		setPendingIds((prev) => {
			const next = new Set(prev);
			for (const { documentId } of items) {
				next.add(documentId);
			}
			return next;
		});
		setError(null);

		try {
			await deleteStoredDocument({ data: items });
			await router.invalidate();
		} catch (caught) {
			setError(
				caught instanceof Error ? caught.message : "Some deletions failed.",
			);
		} finally {
			setPendingIds(new Set());
		}
	}

	async function handleProcessSelected(
		items: { documentId: string; s3Key: string }[],
	) {
		setProcessing(true);
		setError(null);

		const BATCH_SIZE = 10;
		const toastId = toast.loading(
			`Starting extraction for ${items.length} document${items.length === 1 ? "" : "s"}...`,
		);

		let successCount = 0;
		let failCount = 0;
		let lastError: string | null = null;

		for (let i = 0; i < items.length; i += BATCH_SIZE) {
			const batch = items.slice(i, i + BATCH_SIZE);
			const start = i + 1;
			const end = Math.min(i + batch.length, items.length);

			toast.loading(`Processing ${start}\u2013${end} of ${items.length}...`, {
				id: toastId,
			});

			try {
				await processDocument({ data: batch });
				successCount += batch.length;
			} catch (caught) {
				failCount += batch.length;
				lastError = caught instanceof Error ? caught.message : "Batch failed";
			}
		}

		toast.dismiss(toastId);

		if (failCount === 0) {
			toast.success(
				`Extraction complete for ${successCount} document${successCount === 1 ? "" : "s"}.`,
			);
		} else {
			toast.error(
				`${failCount} document${failCount === 1 ? "" : "s"} failed. ${successCount > 0 ? `${successCount} succeeded.` : ""}`,
			);
			if (lastError) setError(lastError);
		}

		await router.invalidate();
		setProcessing(false);
	}

	const currentIndex = previewDocument
		? documents.findIndex(
				(d) => d.documentId === previewDocument.documentId,
			)
		: -1;

	const goToPrev = () => {
		if (currentIndex > 0) setPreviewDocument(documents[currentIndex - 1]);
	};

	const goToNext = () => {
		if (currentIndex < documents.length - 1) {
			setPreviewDocument(documents[currentIndex + 1]);
		}
	};

	return (
		<>
			<DocumentsTable
				data={documents}
				onDelete={handleDelete}
				onPreviewSelected={(document) => {
					setPreviewDocument(document);
					setDialogOpen(true);
				}}
				onDeleteSelected={handleDeleteSelected}
				onProcessSelected={handleProcessSelected}
				pendingIds={pendingIds}
				processing={processing}
				error={error}
			/>
			<PreviewDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				previewDocument={previewDocument}
				currentIndex={currentIndex}
				totalCount={documents.length}
				goToPrev={goToPrev}
				goToNext={goToNext}
				onClose={() => setPreviewDocument(null)}
			/>
		</>
	);
}
