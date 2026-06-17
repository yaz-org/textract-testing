import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
	type Column,
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import {
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	ChevronLeft,
	ChevronRight,
	Loader2,
	TextInitial,
	Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "#/components/ui/button.tsx";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card.tsx";
import { Checkbox } from "#/components/ui/checkbox.tsx";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "#/components/ui/dialog.tsx";
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table.tsx";
import type { DocumentRecord } from "#/lib/documents";
import { formatBytes, formatDate } from "#/lib/format";
import {
	deleteStoredDocument,
	getDocuments,
	processDocument,
} from "#/lib/server-fns";
import type { TextractResult } from "#/lib/textract";

type DocumentRow = DocumentRecord & { presignedUrl: string };

export const Route = createFileRoute("/documents")({
	loader: async () => ({
		documents: await getDocuments(),
	}),
	component: DocumentsPage,
});

function SortHeader<TData, TValue>({
	column,
	label,
}: {
	column: Column<TData, TValue>;
	label: string;
}) {
	return (
		<button
			type="button"
			onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
			className="flex items-center gap-1 font-medium"
		>
			{label}
			{column.getIsSorted() === "asc" ? (
				<ArrowUp className="size-4" />
			) : column.getIsSorted() === "desc" ? (
				<ArrowDown className="size-4" />
			) : (
				<ArrowUpDown className="size-4" />
			)}
		</button>
	);
}

function DocumentsPage() {
	const { documents } = Route.useLoaderData();
	const router = useRouter();
	const [sorting, setSorting] = useState<SortingState>([]);
	const [rowSelection, setRowSelection] = useState({});
	const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
	const [error, setError] = useState<string | null>(null);
	const [previewDocument, setPreviewDocument] = useState<DocumentRow | null>(
		null,
	);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [textractProcessingId, setTextractProcessingId] = useState<
		string | null
	>(null);
	const [textractResult, setTextractResult] = useState<TextractResult | null>(
		null,
	);
	const [textractDialogOpen, setTextractDialogOpen] = useState(false);

	async function handleDelete(documentId: string, s3Key: string) {
		setPendingIds((prev) => new Set(prev).add(documentId));
		setError(null);

		try {
			await deleteStoredDocument({ data: { documentId, s3Key } });
			await router.invalidate();
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Delete failed.");
		} finally {
			setPendingIds((prev) => {
				const next = new Set(prev);
				next.delete(documentId);
				return next;
			});
		}
	}

	const columns: ColumnDef<DocumentRow>[] = [
		{
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={table.getIsAllPageRowsSelected()}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
				/>
			),
			enableSorting: false,
		},
		{
			accessorKey: "fileName",
			header: ({ column }) => <SortHeader column={column} label="Name" />,
		},
		{
			accessorKey: "contentType",
			header: ({ column }) => <SortHeader column={column} label="Type" />,
		},
		{
			accessorKey: "size",
			header: ({ column }) => <SortHeader column={column} label="Size" />,
			cell: ({ row }) => formatBytes(row.getValue<number>("size")),
		},
		{
			accessorKey: "createdAt",
			header: ({ column }) => <SortHeader column={column} label="Created" />,
			cell: ({ row }) => formatDate(row.getValue<string>("createdAt")),
		},
		{
			accessorKey: "s3Key",
			header: ({ column }) => <SortHeader column={column} label="S3 Key" />,
		},
		{
			id: "preview",
			header: "Preview",
			cell: ({ row }) => (
				<button
					type="button"
					onClick={() => {
						setPreviewDocument(row.original);
						setDialogOpen(true);
					}}
					className="block size-12 overflow-hidden rounded-md border border-slate-200 transition-shadow hover:ring-2 hover:ring-amber-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
				>
					<img
						src={row.original.presignedUrl}
						alt={row.original.fileName}
						className="size-full object-cover"
					/>
				</button>
			),
			enableSorting: false,
		},
		{
			id: "action",
			header: "Action",
			cell: ({ row }) => (
				<div className="flex items-center gap-2">
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => handleTextract(row.original)}
						disabled={textractProcessingId === row.original.documentId}
						title="extract text from document"
						aria-label="Extract text from document"
					>
						{textractProcessingId === row.original.documentId ? (
							<Loader2 className="animate-spin" />
						) : (
							<TextInitial />
						)}
					</Button>
					<Button
						type="button"
						variant="destructive"
						size="sm"
						onClick={() =>
							handleDelete(row.original.documentId, row.original.s3Key)
						}
						disabled={pendingIds.has(row.original.documentId)}
						title="delete"
						aria-label="delete"
					>
						{pendingIds.has(row.original.documentId) ? (
							<Loader2 className="animate-spin" />
						) : (
							<Trash2 />
						)}
					</Button>
				</div>
			),
			enableSorting: false,
		},
	];

	const table = useReactTable({
		data: documents,
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

	async function handleDeleteSelected() {
		const selectedRows = table.getSelectedRowModel().rows;
		const items = selectedRows.map((row) => ({
			documentId: row.original.documentId,
			s3Key: row.original.s3Key,
		}));

		setPendingIds((prev) => {
			const next = new Set(prev);
			for (const { documentId } of items) {
				next.add(documentId);
			}
			return next;
		});
		setError(null);

		try {
			await Promise.all(
				items.map(({ documentId, s3Key }) =>
					deleteStoredDocument({ data: { documentId, s3Key } }),
				),
			);
			await router.invalidate();
			setRowSelection({});
		} catch (caught) {
			setError(
				caught instanceof Error ? caught.message : "Some deletions failed.",
			);
		} finally {
			setPendingIds(new Set());
		}
	}

	async function handleTextract(doc: DocumentRow) {
		setTextractProcessingId(doc.documentId);
		setError(null);
		try {
			const result = await processDocument({
				data: { documentId: doc.documentId, s3Key: doc.s3Key },
			});
			setTextractResult(result);
			setTextractDialogOpen(true);
		} catch (caught) {
			setError(
				caught instanceof Error
					? caught.message
					: "Textract processing failed.",
			);
		} finally {
			setTextractProcessingId(null);
		}
	}

	const selectedCount = Object.keys(rowSelection).length;

	const currentIndex = previewDocument
		? documents.findIndex((d) => d.documentId === previewDocument.documentId)
		: -1;

	const goToPrev = () => {
		if (currentIndex > 0) setPreviewDocument(documents[currentIndex - 1]);
	};

	const goToNext = () => {
		if (currentIndex < documents.length - 1) {
			setPreviewDocument(documents[currentIndex + 1]);
		}
	};

	useEffect(() => {
		if (!dialogOpen) return;
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === "ArrowLeft") goToPrev();
			else if (e.key === "ArrowRight") goToNext();
		}
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	});

	return (
		<Card className="h-full">
			<CardHeader className="sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
						Documents
					</p>
					<CardTitle className="mt-3 text-2xl"></CardTitle>
					<CardDescription className="mt-3 text-base"></CardDescription>
				</div>
				<div className="flex gap-4 items-center">
					<div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-slate-700">
						{selectedCount > 0
							? `${selectedCount} of ${documents.length} selected`
							: `${documents.length} ${documents.length === 1 ? "document" : "documents"}`}
					</div>

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
				</div>
			</CardHeader>

			<CardContent className="flex flex-1 flex-col overflow-hidden">
				{error ? (
					<p className="mb-5 text-sm font-medium text-rose-700">{error}</p>
				) : null}

				{documents.length === 0 ? (
					<div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
						No documents have been uploaded yet.
					</div>
				) : (
					<div className="flex-1 overflow-y-auto rounded border border-slate-200">
						<table className="min-w-full table-fixed text-sm">
							<TableHeader className="sticky top-0 z-10 bg-card">
								{table.getHeaderGroups().map((headerGroup) => (
									<TableRow key={headerGroup.id}>
										{headerGroup.headers.map((header) => (
											<TableHead key={header.id}>
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
							<TableBody>
								{table.getRowModel().rows.map((row) => (
									<TableRow
										key={row.id}
										data-state={row.getIsSelected() && "selected"}
									>
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext(),
												)}
											</TableCell>
										))}
									</TableRow>
								))}
							</TableBody>
						</table>
					</div>
				)}

				<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
					<DialogTrigger />
					<DialogContent
						className="max-w-[90vw] sm:max-w-6xl"
						onCloseAutoFocus={() => setPreviewDocument(null)}
					>
						<DialogTitle className="sr-only">Document preview</DialogTitle>
						<DialogDescription></DialogDescription>
						{previewDocument && (
							<div className="flex flex-col gap-6 sm:flex-row">
								<div className="relative flex min-w-0 flex-1 items-start justify-center">
									<button
										type="button"
										aria-label="Previous document"
										onClick={goToPrev}
										disabled={currentIndex === 0}
										className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60 disabled:opacity-20 disabled:cursor-not-allowed"
									>
										<ChevronLeft className="size-6" />
									</button>
									<img
										src={previewDocument.presignedUrl}
										alt={previewDocument.fileName}
										className="h-auto max-h-[80vh] w-full rounded-md object-contain"
									/>
									<button
										type="button"
										aria-label="Next document"
										onClick={goToNext}
										disabled={currentIndex === documents.length - 1}
										className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white transition hover:bg-black/60 disabled:opacity-20 disabled:cursor-not-allowed"
									>
										<ChevronRight className="size-6" />
									</button>
								</div>
								<div className="w-72 shrink-0 space-y-4">
									<div>
										<h2 className="break-words text-lg font-semibold">
											{previewDocument.fileName}
										</h2>
									</div>
									<div className="space-y-1 text-sm">
										<p className="text-muted-foreground">Type</p>
										<p>{previewDocument.contentType}</p>
									</div>
									<div className="space-y-1 text-sm">
										<p className="text-muted-foreground">Size</p>
										<p>{formatBytes(previewDocument.size)}</p>
									</div>
									<div className="space-y-1 text-sm">
										<p className="text-muted-foreground">Created</p>
										<p>{formatDate(previewDocument.createdAt)}</p>
									</div>
								</div>
							</div>
						)}
					</DialogContent>
				</Dialog>
				<Dialog open={textractDialogOpen} onOpenChange={setTextractDialogOpen}>
					<DialogTrigger />
					<DialogContent className="max-w-[90vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto">
						<DialogTitle>Textract Results</DialogTitle>
						<DialogDescription>
							Layout and form data extracted via Amazon Textract
						</DialogDescription>

						{textractResult && (
							<div className="space-y-6">
								{textractResult.forms.length > 0 && (
									<section>
										<h3 className="mb-2 font-semibold">
											Forms (Key-Value pairs)
										</h3>
										<div className="overflow-x-auto rounded-2xl border border-slate-200">
											<table className="min-w-full text-sm">
												<TableHeader>
													<TableRow>
														<TableHead>Key</TableHead>
														<TableHead>Value</TableHead>
														<TableHead>Confidence</TableHead>
													</TableRow>
												</TableHeader>
												<TableBody>
													{textractResult.forms.map((f) => (
														<TableRow key={f.key}>
															<TableCell className="font-medium">
																{f.key}
															</TableCell>
															<TableCell>{f.value}</TableCell>
															<TableCell>
																{(f.confidence * 100).toFixed(1)}%
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											</table>
										</div>
									</section>
								)}

								{textractResult.layout.length > 0 && (
									<section>
										<h3 className="mb-2 font-semibold">Layout</h3>
										<div className="space-y-1 text-sm">
											{textractResult.layout.map((l) => (
												<div
													key={`${l.blockType}-${l.text}`}
													className="flex items-start gap-2"
												>
													<span className="w-36 shrink-0 font-mono text-xs text-muted-foreground">
														{l.blockType}
													</span>
													<span className="flex-1">{l.text}</span>
													<span className="shrink-0 text-xs text-muted-foreground">
														{(l.confidence * 100).toFixed(1)}%
													</span>
												</div>
											))}
										</div>
									</section>
								)}

								{textractResult.forms.length === 0 &&
									textractResult.layout.length === 0 && (
										<p className="text-muted-foreground">
											No text or forms detected.
										</p>
									)}
							</div>
						)}
					</DialogContent>
				</Dialog>
			</CardContent>
		</Card>
	);
}
