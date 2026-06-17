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
import { ArrowDown, ArrowUp, ArrowUpDown, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
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
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table.tsx";
import type { DocumentRecord } from "#/lib/documents";
import { formatBytes, formatDate } from "#/lib/format";
import { deleteStoredDocument, getDocuments } from "#/lib/server-fns";

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
				<Button
					type="button"
					variant="destructive"
					size="sm"
					onClick={() =>
						handleDelete(row.original.documentId, row.original.s3Key)
					}
					disabled={pendingIds.has(row.original.documentId)}
				>
					{pendingIds.has(row.original.documentId) ? (
						<Loader2 className="animate-spin" />
					) : (
						<Trash2 />
					)}
				</Button>
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

	const selectedCount = Object.keys(rowSelection).length;

	return (
		<Card>
			<CardHeader className="sm:flex-row sm:items-end sm:justify-between">
				<div>
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
						Documents
					</p>
					<CardTitle className="mt-3 text-2xl">
						Current document records
					</CardTitle>
					<CardDescription className="mt-3 text-base">
						Browse DynamoDB metadata and remove documents from both storage
						layers.
					</CardDescription>
				</div>
				<div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-slate-700">
					{selectedCount > 0
						? `${selectedCount} of ${documents.length} selected`
						: `${documents.length} ${documents.length === 1 ? "document" : "documents"}`}
				</div>
			</CardHeader>

			<CardContent>
				{error ? (
					<p className="mb-5 text-sm font-medium text-rose-700">{error}</p>
				) : null}

				{selectedCount > 0 && (
					<div className="mb-4 flex items-center gap-3">
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
					</div>
				)}

				{documents.length === 0 ? (
					<div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600">
						No documents have been uploaded yet.
					</div>
				) : (
					<div className="overflow-hidden rounded-[1.5rem] border border-slate-200">
						<Table>
							<TableHeader>
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
						</Table>
					</div>
				)}

				<Dialog
					open={dialogOpen}
					onOpenChange={setDialogOpen}
				>
					<DialogTrigger />
					<DialogContent
						className="max-w-[90vw] sm:max-w-6xl"
						onCloseAutoFocus={() => setPreviewDocument(null)}
					>
						<DialogTitle className="sr-only">Document preview</DialogTitle>
						<DialogDescription></DialogDescription>
						{previewDocument && (
							<div className="flex flex-col gap-6 sm:flex-row">
								<div className="flex min-w-0 flex-1 items-start justify-center">
									<img
										src={previewDocument.presignedUrl}
										alt={previewDocument.fileName}
										className="h-auto max-h-[80vh] w-full rounded-md object-contain"
									/>
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
			</CardContent>
		</Card>
	);
}
