import { createFileRoute, useRouter } from "@tanstack/react-router";
import {
	type Column,
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import {
	ArrowDown,
	ArrowUp,
	ArrowUpDown,
	ChevronLeft,
	ChevronRight,
	Loader2,
	ScanText,
	Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Badge } from "#/components/ui/badge.tsx";
import { Button } from "#/components/ui/button.tsx";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
} from "#/components/ui/dialog.tsx";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table.tsx";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip.tsx";
import type { DocumentRecord } from "#/lib/documents";
import { formatBytes, formatDate } from "#/lib/format";
import {
	deleteStoredDocument,
	getDocuments,
	processDocument,
} from "#/lib/server-fns";
import { cn } from "#/lib/utils";

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

const columnHelper = createColumnHelper<DocumentRow>();

function IndeterminateCheckbox({
	indeterminate,
	className = "",
	...rest
}: { indeterminate?: boolean } & React.HTMLProps<HTMLInputElement>) {
	const ref = useRef<HTMLInputElement>(null!);

	useEffect(() => {
		if (typeof indeterminate === "boolean") {
			ref.current.indeterminate = !rest.checked && indeterminate;
		}
	}, [indeterminate, rest.checked]);

	return (
		<Label className="flex items-center w-full justify-center p-2">
			<Input
				type="checkbox"
				ref={ref}
				className={cn("cursor-pointer h-4 w-4", className)}
				{...rest}
			/>
		</Label>
	);
}

function getColumns({
	onDelete,
	onPreviewSelected,
	hasDocId,
}: {
	onPreviewSelected: (document: DocumentRow) => void;
	onDelete: (document: DocumentRecord) => void;
	hasDocId: (docId: string) => boolean;
}) {
	return [
		columnHelper.display({
			id: "select",
			enableSorting: false,
			enableHiding: false,
			header: ({ table }) => (
				<IndeterminateCheckbox
					{...{
						checked: table.getIsAllPageRowsSelected(),
						indeterminate: table.getIsSomePageRowsSelected(),
						onChange: table.getToggleAllPageRowsSelectedHandler(),
						"aria-label": "Select all",
						title: "Select all",
					}}
				/>
			),
			cell: ({ row }) => (
				<IndeterminateCheckbox
					{...{
						checked: row.getIsSelected(),
						disabled: !row.getCanSelect(),
						indeterminate: row.getIsSomeSelected(),
						onChange: row.getToggleSelectedHandler(),
						"aria-label": `Select row ${row.original.fileName}`,
						title: `Select row ${row.original.fileName}`,
					}}
				/>
			),
		}),
		columnHelper.accessor("fileName", {
			header: ({ column }) => <SortHeader column={column} label="Name" />,
		}),
		columnHelper.accessor("contentType", {
			header: ({ column }) => <SortHeader column={column} label="Type" />,
		}),
		columnHelper.accessor("size", {
			header: ({ column }) => <SortHeader column={column} label="Size" />,
			cell: ({ getValue }) => formatBytes(getValue()),
		}),
		columnHelper.accessor("createdAt", {
			header: ({ column }) => <SortHeader column={column} label="Created" />,
			cell: ({ getValue }) => formatDate(getValue()),
		}),
		columnHelper.display({
			id: "extracted",
			header: "Extracted",
			enableSorting: false,
			cell: ({ row }) => {
				if (!row.original.textractResult) {
					return <span className="text-muted-foreground">—</span>;
				}

				if (!row.original.textractExtractedAt) {
					return (
						<span className="text-muted-foreground">
							No extracted date found
						</span>
					);
				}

				return (
					<div className="flex items-center">
						<Tooltip>
							<TooltipTrigger asChild>
								<Badge variant="default">Extracted</Badge>
							</TooltipTrigger>
							<TooltipContent>
								{formatDate(row.original.textractExtractedAt)}
							</TooltipContent>
						</Tooltip>
					</div>
				);
			},
		}),

		columnHelper.display({
			id: "preview",
			header: "Preview",
			enableSorting: false,
			cell: ({ row }) => (
				<button
					type="button"
					onClick={() => {
						onPreviewSelected(row.original);
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
		}),

		columnHelper.display({
			id: "actions",
			header: "Actions",
			enableSorting: false,
			cell: ({ row }) => (
				<div className="flex justify-center items-center w-full">
					<Button
						type="button"
						variant="destructive"
						size="sm"
						onClick={() => onDelete(row.original)}
						disabled={hasDocId(row.original.documentId)}
						title="delete"
						aria-label="delete"
					>
						{hasDocId(row.original.documentId) ? (
							<Loader2 className="animate-spin" />
						) : (
							<Trash2 />
						)}
					</Button>
				</div>
			),
		}),
	];
}

function DocumentsPage() {
	const { documents } = Route.useLoaderData();
	const router = useRouter();
	const [sorting, setSorting] = useState<SortingState>([]);
	const [rowSelection, setRowSelection] = useState({});
	const [pendingIds, setPendingIds] = useState<Set<string>>(new Set());
	const [processing, setProcessing] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [previewDocument, setPreviewDocument] = useState<DocumentRow | null>(
		null,
	);
	const [dialogOpen, setDialogOpen] = useState(false);
	const lastScrollTime = useRef(0);
	const tableContainerRef = useRef<HTMLDivElement>(null);

	async function handleDelete(documentId: string, s3Key: string) {
		setPendingIds((prev) => new Set(prev).add(documentId));
		setError(null);

		try {
			await deleteStoredDocument({ data: [{ documentId, s3Key }] });
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

	const columns = getColumns({
		onPreviewSelected: (document) => {
			setPreviewDocument(document);
			setDialogOpen(true);
		},
		onDelete: async (document) => {
			await handleDelete(document.documentId, document.s3Key);
		},
		hasDocId: (docId) => pendingIds.has(docId),
	});

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
			await deleteStoredDocument({ data: items });
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

	async function handleProcessSelected() {
		const selectedRows = table.getSelectedRowModel().rows;
		const items = selectedRows.map((row) => ({
			documentId: row.original.documentId,
			s3Key: row.original.s3Key,
		}));

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
		setRowSelection({});
		setProcessing(false);
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

		function handleWheel(e: WheelEvent) {
			if (!e.shiftKey) return;
			e.preventDefault();
			const now = Date.now();
			if (now - lastScrollTime.current < 400) return;
			lastScrollTime.current = now;
			if (e.deltaY > 0) goToNext();
			else if (e.deltaY < 0) goToPrev();
		}

		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("wheel", handleWheel, { passive: false });
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("wheel", handleWheel);
		};
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

	return (
		<>
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

						<div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-slate-700">
							{selectedCount > 0
								? `${selectedCount} of ${documents.length} selected`
								: `${documents.length} ${documents.length === 1 ? "document" : "documents"}`}
						</div>
					</div>
				</div>

				{error ? (
					<p className="mb-5 text-sm font-medium text-rose-700">{error}</p>
				) : null}

				{documents.length === 0 ? (
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
			<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<DialogTrigger />
				<DialogContent
					className="max-w-[90vw] sm:max-w-6xl"
					onCloseAutoFocus={() => setPreviewDocument(null)}
				>
					<DialogTitle className="sr-only">Document preview</DialogTitle>
					<DialogDescription></DialogDescription>
					<div className="-mx-4 no-scrollbar max-h-[90dvh] overflow-y-auto px-4 flex flex-col gap-2">
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

						{previewDocument?.textractResult && (
							<div className="border-t border-slate-200 pt-6 mt-6 space-y-6">
								{previewDocument.textractResult.forms.length > 0 && (
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
													{previewDocument.textractResult.forms.map((f) => (
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

								{previewDocument.textractResult.layout.length > 0 && (
									<section>
										<h3 className="mb-2 font-semibold">Layout</h3>
										<div className="space-y-1 text-sm">
											{previewDocument.textractResult.layout.map((l) => (
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

								{previewDocument.textractResult.forms.length === 0 &&
									previewDocument.textractResult.layout.length === 0 && (
										<p className="text-muted-foreground">
											No text or forms detected.
										</p>
									)}
							</div>
						)}
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
}
