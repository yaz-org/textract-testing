import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { DocumentsProvider } from "#/components/documents/documents-context.tsx";
import { DocumentsTable } from "#/components/documents/documents-table.tsx";
import { DocumentsTableSkeleton } from "#/components/documents/documents-table-skeleton.tsx";
import { PreviewDialog } from "#/components/documents/preview-dialog.tsx";
import { Button } from "#/components/ui/button.tsx";
import { useDocuments } from "#/hooks/use-documents";

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
	const ctx = useDocuments();

	return (
		<DocumentsProvider
			value={{
				rows: ctx.rows,
				pendingIds: ctx.pendingIds,
				error: ctx.error,
				processing: ctx.processing,
				exportingZip: ctx.exportingZip,
				handleDelete: ctx.handleDelete,
				handleDeleteSelected: ctx.handleDeleteSelected,
				handleProcessSelected: ctx.handleProcessSelected,
				handleClearResults: ctx.handleClearResults,
				handleExportZip: ctx.handleExportZip,
				handlePreviewSelected: ctx.handlePreviewSelected,
				prefetchDocument: ctx.prefetchDocument,
			}}
		>
			<DocumentsTable />
			<PreviewDialog
				open={ctx.dialogOpen}
				onOpenChange={ctx.setDialogOpen}
				documentId={ctx.previewDocument?.documentId ?? null}
				currentIndex={ctx.currentIndex}
				totalCount={ctx.rows.length}
				goToPrev={ctx.goToPrev}
				goToNext={ctx.goToNext}
				onClose={() => ctx.setPreviewDocument(null)}
			/>
		</DocumentsProvider>
	);
}
