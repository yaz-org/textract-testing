import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Download, Eraser, Loader2, ScanText, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "#/components/ui/button.tsx";
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table.tsx";
import type { DocumentTableRecord } from "#/lib/documents";
import { cn } from "#/lib/utils";
import { type DocumentRow, getColumns } from "./columns";

interface DocumentsTableProps {
	data: DocumentRow[];
	onDelete: (document: DocumentTableRecord) => void;
	onPreviewSelected: (document: DocumentRow) => void;
	onDeleteSelected: (items: { documentId: string; s3Key: string }[]) => void;
	onProcessSelected: (
		items: { documentId: string; s3Key: string }[],
	) => Promise<void>;
	onClearResults: (items: { documentId: string }[]) => void;
	onExportZip: () => void;
	exportingZip: boolean;
	pendingIds: Set<string>;
	processing: boolean;
	error: string | null;
}

export function DocumentsTable({
	data,
	onDelete,
	onPreviewSelected,
	onDeleteSelected,
	onProcessSelected,
	onClearResults,
	onExportZip,
	exportingZip,
	pendingIds,
	processing,
	error,
}: DocumentsTableProps) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [rowSelection, setRowSelection] = useState({});
	const tableContainerRef = useRef<HTMLDivElement>(null);

	const columns = getColumns({
		onPreviewSelected,
		onDelete,
		hasDocId: (docId) => pendingIds.has(docId),
	});

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		onSortingChange: setSorting,
		enableRowSelection: true,
		onRowSelectionChange: setRowSelection,
		getRowId: (row) => row.documentId,
		state: {
			sorting,
			rowSelection,
		},
	});

	const { rows } = table.getRowModel();
	const rowVirtualizer = useVirtualizer({
		count: rows.length,
		estimateSize: () => 65,
		getScrollElement: () => tableContainerRef.current,
		overscan: 10,
		measureElement:
			typeof window !== "undefined" &&
			navigator.userAgent.indexOf("Firefox") === -1
				? (element) => element?.getBoundingClientRect().height
				: undefined,
	});

	function extractSelectedItems() {
		return table.getSelectedRowModel().rows.map((row) => ({
			documentId: row.original.documentId,
			s3Key: row.original.s3Key,
		}));
	}

	async function handleDeleteSelected() {
		onDeleteSelected(extractSelectedItems());
	}

	async function handleProcessSelected() {
		await onProcessSelected(extractSelectedItems());
		setRowSelection({});
	}

	function handleClearResults() {
		const selectedItems = table.getSelectedRowModel().rows.map((row) => ({
			documentId: row.original.documentId,
		}));
		onClearResults(selectedItems);
	}

	const selectedCount = Object.keys(rowSelection).length;
	const hasExtractedResults = data.some((doc) => doc.paymentResult);

	return (
		<div className="flex h-full min-h-0 flex-col gap-6 rounded-xl border bg-card py-6 shadow-sm">
			<div className="flex items-start justify-between px-6">
				<div>
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
						Documents
					</p>
				</div>
				<div className="flex gap-4 items-center">
					{selectedCount > 0 && (
						<Button
							type="button"
							variant="default"
							size="sm"
							onClick={handleProcessSelected}
							disabled={processing}
						>
							{processing ? (
								<Loader2 className="mr-1 animate-spin" />
							) : (
								<ScanText className="mr-1" />
							)}
							Extract text
						</Button>
					)}
					{selectedCount > 0 && (
						<Button
							type="button"
							variant="outline"
							size="sm"
							onClick={handleClearResults}
						>
							<Eraser className="mr-1" />
							Clear results
						</Button>
					)}
					{selectedCount > 0 && (
						<Button
							type="button"
							variant="destructive"
							size="sm"
							onClick={handleDeleteSelected}
							disabled={pendingIds.size > 0}
						>
							{pendingIds.size > 0 ? (
								<Loader2 className="mr-1 animate-spin" />
							) : (
								<Trash2 className="mr-1" />
							)}
							Delete {selectedCount} selected
						</Button>
					)}

					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={onExportZip}
						disabled={!hasExtractedResults || exportingZip}
					>
						{exportingZip ? (
							<Loader2 className="mr-1 animate-spin" />
						) : (
							<Download className="mr-1" />
						)}
						{exportingZip ? "Downloading..." : "Download results"}
					</Button>

					<div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-slate-700">
						{selectedCount > 0
							? `${selectedCount} of ${data.length} selected`
							: `${data.length} ${data.length === 1 ? "document" : "documents"}`}
					</div>
				</div>
			</div>

			{error ? (
				<p className="mb-5 text-sm font-medium text-rose-700">{error}</p>
			) : null}

			{data.length === 0 ? (
				<div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
					No documents have been uploaded yet.
				</div>
			) : (
				<div
					ref={tableContainerRef}
					className="relative h-full min-h-0 overflow-auto rounded-lg border bg-card"
				>
					<table className="grid w-full text-sm">
						<TableHeader className="sticky top-0 z-10 bg-card">
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow
									key={headerGroup.id}
									data-slot="table-row"
									className="grid w-full grid-cols-[1fr_5fr_1fr_1fr_3fr_3fr_2fr_2fr]"
								>
									{headerGroup.headers.map((header) => (
										<TableHead
											key={header.id}
											className="flex items-center tracking-wider"
										>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>

						<TableBody
							className="relative grid"
							style={{
								height: `${rowVirtualizer.getTotalSize()}px`,
							}}
						>
							{rowVirtualizer.getVirtualItems().map((virtualRow) => {
								const row = rows[virtualRow.index];
								return (
									<TableRow
										data-index={virtualRow.index}
										ref={(node) => rowVirtualizer.measureElement(node)}
										key={row.id}
										data-slot="table-row"
										style={{
											transform: `translateY(${virtualRow.start}px)`,
										}}
										data-state={row.getIsSelected() && "selected"}
										className={cn(
											"absolute grid w-full grid-cols-[1fr_5fr_1fr_1fr_3fr_3fr_2fr_2fr] border-b transition-colors hover:bg-muted/50",
											virtualRow.index % 2 === 0 && "bg-muted/20",
										)}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell
												key={cell.id}
												className="flex text-sm whitespace-normal"
											>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								);
							})}
						</TableBody>
					</table>
				</div>
			)}
		</div>
	);
}
