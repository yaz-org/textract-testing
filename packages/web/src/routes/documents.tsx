import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import type { DocumentRow } from "#/components/documents/columns";
import { DocumentsTable } from "#/components/documents/documents-table.tsx";
import { DocumentsTableSkeleton } from "#/components/documents/documents-table-skeleton.tsx";
import { PreviewDialog } from "#/components/documents/preview-dialog.tsx";
import type { DocumentRecord } from "#/lib/documents";
import {
	deleteStoredDocument,
	exportDocumentsAsZip,
	getDocuments,
	processDocument,
} from "#/lib/server-fns";

export const Route = createFileRoute("/documents")({
	component: DocumentsPage,
});

function DocumentsPage() {
	const queryClient = useQueryClient();

	const documentsQuery = useQuery({
		queryKey: ["documents"],
		queryFn: () => getDocuments(),
		refetchInterval: 30 * 60 * 1000,
		staleTime: 30 * 60 * 1000,
		refetchIntervalInBackground: true,
	});

	const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
	const [error, setError] = useState<string | null>(null);
	const [previewDocument, setPreviewDocument] = useState<DocumentRow | null>(
		null,
	);
	const [dialogOpen, setDialogOpen] = useState(false);

	const deleteMutation = useMutation({
		mutationFn: (items: { documentId: string; s3Key: string }[]) =>
			deleteStoredDocument({ data: items }),
		onMutate: (items) => {
			setPendingIds((prev) => {
				const next = new Set(prev);
				for (const { documentId } of items) next.add(documentId);
				return next;
			});
			setError(null);
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["documents"] });
		},
		onError: (caught) => {
			setError(caught instanceof Error ? caught.message : "Delete failed.");
		},
		onSettled: (_data, _error, items) => {
			setPendingIds((prev) => {
				const next = new Set(prev);
				for (const { documentId } of items) next.delete(documentId);
				return next;
			});
		},
	});

	const processMutation = useMutation({
		mutationFn: async (items: { documentId: string; s3Key: string }[]) => {
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
			return { successCount, failCount, lastError };
		},
		onSuccess: ({ successCount, failCount, lastError }) => {
			if (failCount === 0) {
				toast.success(
					`Extraction scheduled for ${successCount} document${successCount === 1 ? "" : "s"}.`,
				);
			} else {
				toast.error(
					`${failCount} document${failCount === 1 ? "" : "s"} failed. ${successCount > 0 ? `${successCount} succeeded.` : ""}`,
				);
				if (lastError) setError(lastError);
			}
		},
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ["documents"] });
		},
	});

	const exportZipMutation = useMutation<{ presignedUrl: string }, Error>({
		mutationFn: () => exportDocumentsAsZip(),
		onSuccess: ({ presignedUrl }) => {
			const a = document.createElement("a");
			a.href = presignedUrl;
			a.download = "documents-export.zip";
			a.click();
			toast.success("Download started.");
		},
		onError: (caught) => {
			setError(caught instanceof Error ? caught.message : "Export failed.");
		},
	});

	function handleExportZip() {
		exportZipMutation.mutate();
	}

	function handleDelete(document: DocumentRecord) {
		deleteMutation.mutate([
			{ documentId: document.documentId, s3Key: document.s3Key },
		]);
	}

	function handleDeleteSelected(
		items: { documentId: string; s3Key: string }[],
	) {
		deleteMutation.mutate(items);
	}

	async function handleProcessSelected(
		items: { documentId: string; s3Key: string }[],
	) {
		await processMutation.mutateAsync(items);
		setPendingIds(new Set());
	}

	if (documentsQuery.isLoading) {
		return <DocumentsTableSkeleton />;
	}

  if (documentsQuery.isError) {
    return (
      <div className="p-4 text-red-600">
        <p>Failed to load documents.</p>
        <p className="mt-1 text-sm">
          {documentsQuery.error instanceof Error
            ? documentsQuery.error.message
            : "An unknown error occurred."}
        </p>
      </div>
    );
  }

	const docs = documentsQuery.data ?? [];

	const currentIndex = previewDocument
		? docs.findIndex((d) => d.documentId === previewDocument.documentId)
		: -1;

	const goToPrev = () => {
		if (currentIndex > 0) setPreviewDocument(docs[currentIndex - 1]);
	};

	const goToNext = () => {
		if (currentIndex < docs.length - 1) {
			setPreviewDocument(docs[currentIndex + 1]);
		}
	};

	return (
		<>
			<DocumentsTable
				data={docs}
				onDelete={handleDelete}
				onPreviewSelected={(document) => {
					setPreviewDocument(document);
					setDialogOpen(true);
				}}
				onDeleteSelected={handleDeleteSelected}
				onProcessSelected={handleProcessSelected}
				onExportZip={handleExportZip}
				exportingZip={exportZipMutation.isPending}
				pendingIds={pendingIds}
				processing={processMutation.isPending}
				error={error}
			/>
			<PreviewDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				previewDocument={previewDocument}
				currentIndex={currentIndex}
				totalCount={docs.length}
				goToPrev={goToPrev}
				goToNext={goToNext}
				onClose={() => setPreviewDocument(null)}
			/>
		</>
	);
}
