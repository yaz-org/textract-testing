import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import type { DocumentRow } from "#/components/documents/columns";
import { DocumentsTable } from "#/components/documents/documents-table.tsx";
import { DocumentsTableSkeleton } from "#/components/documents/documents-table-skeleton.tsx";
import { PreviewDialog } from "#/components/documents/preview-dialog.tsx";
import { Button } from "#/components/ui/button.tsx";
import type { DocumentTableRecord } from "#/lib/documents";
import {
	clearStoredDocumentResults,
	deleteStoredDocument,
	exportDocumentsAsZip,
	getDocumentRecord,
	getDocuments,
	processDocument,
} from "#/lib/server-fns";

export const Route = createFileRoute("/documents")({
	pendingMinMs: 300,
	pendingComponent: DocumentsTableSkeleton,
	errorComponent: ({ error, reset }) => (
		<div className="flex items-center justify-center p-8">
			<div className="flex flex-col items-center gap-3">
				<AlertTriangle className="size-8 text-destructive" />
				<p className="font-semibold">Failed to load documents.</p>
				<p className="text-sm text-muted-foreground">
					{error instanceof Error
						? error.message
						: "An unknown error occurred."}
				</p>
				{reset && (
					<Button variant="outline" size="sm" onClick={reset}>
						<RefreshCw className="size-4" />
						Try again
					</Button>
				)}
			</div>
		</div>
	),
	component: DocumentsPage,
});

function DocumentsPage() {
	const queryClient = useQueryClient();

	const documentsQuery = useSuspenseQuery({
		queryKey: ["documents"],
		queryFn: () => getDocuments(),
		refetchInterval: 30 * 60 * 1000,
		staleTime: 30 * 60 * 1000,
	});


	const docs = documentsQuery.data;

	const rows: DocumentRow[] = useMemo(
		() =>
			docs,
		[docs],
	);

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

	const exportZipMutation = useMutation({
		mutationFn: () => exportDocumentsAsZip(),
		onSuccess: ({ presignedUrl, docSize }) => {
			const a = document.createElement("a");
			a.href = presignedUrl;
			a.download = "documents-export.zip";
			a.click();
			toast.success(`Download started. Docs: ${docSize}`);
		},
		onError: (caught) => {
			setError(caught instanceof Error ? caught.message : "Export failed.");
		},
	});

	const clearResultsMutation = useMutation({
		mutationFn: (items: { documentId: string }[]) =>
			clearStoredDocumentResults({ data: items }),
		onSuccess: async (_data, variables) => {
			await queryClient.invalidateQueries({ queryKey: ["documents"] });
			toast.success(
				`Results cleared for ${variables.length} document${variables.length === 1 ? "" : "s"}.`,
			);
		},
		onError: (caught) => {
			setError(
				caught instanceof Error ? caught.message : "Clear results failed.",
			);
		},
	});

	function handleExportZip() {
		exportZipMutation.mutate();
	}

	function handleDelete(document: DocumentTableRecord) {
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

	function handleClearResults(items: { documentId: string }[]) {
		clearResultsMutation.mutate(items);
	}

	const currentIndex = previewDocument
		? rows.findIndex((d) => d.documentId === previewDocument.documentId)
		: -1;

	const prefetchDocument = (documentId: string) => {
		queryClient.prefetchQuery({
			queryKey: ["document", documentId],
			queryFn: () => getDocumentRecord({ data: documentId })
      .then((doc) => {
        if (doc?.presignedUrl) {
          const img = new Image();
          img.src = doc.presignedUrl;
        }

        return doc;
      }),
			staleTime: 5 * 60 * 1000,
		});
	};

	const goToPrev = () => {
		if (currentIndex > 0) {
			setPreviewDocument(rows[currentIndex - 1]);
			if (currentIndex - 2 >= 0) prefetchDocument(rows[currentIndex - 2].documentId);
		}
	};

	const goToNext = () => {
		if (currentIndex < rows.length - 1) {
			setPreviewDocument(rows[currentIndex + 1]);
			if (currentIndex + 2 < rows.length) prefetchDocument(rows[currentIndex + 2].documentId);
		}
	};

	return (
		<>
			<DocumentsTable
				data={rows}
				onDelete={handleDelete}
				onPrefetchDocument={prefetchDocument}
				onPreviewSelected={(document) => {
					setPreviewDocument(document);
					setDialogOpen(true);
				}}
				onDeleteSelected={handleDeleteSelected}
				onProcessSelected={handleProcessSelected}
				onClearResults={handleClearResults}
				onExportZip={handleExportZip}
				exportingZip={exportZipMutation.isPending}
				pendingIds={pendingIds}
				processing={processMutation.isPending}
				error={error}
			/>
			<PreviewDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				documentId={previewDocument?.documentId ?? null}
				currentIndex={currentIndex}
				totalCount={rows.length}
				goToPrev={goToPrev}
				goToNext={goToNext}
				onClose={() => setPreviewDocument(null)}
			/>
		</>
	);
}
