import { createColumnHelper, type Row } from "@tanstack/react-table";
import { Loader2, Trash2 } from "lucide-react";
import { Badge } from "#/components/ui/badge.tsx";
import { Button } from "#/components/ui/button.tsx";
import { Checkbox } from "#/components/ui/checkbox.tsx";
import { Label } from "#/components/ui/label";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip.tsx";
import type { DocumentTableRecord } from "#/lib/documents";
import { formatBytes, formatDate } from "#/lib/format";
import { useDocumentsContext } from "./documents-context";
import { SortHeader } from "./sort-header";

export type DocumentRow = DocumentTableRecord & { presignedUrl: string };

const columnHelper = createColumnHelper<DocumentRow>();

function PreviewCell({ row }: { row: Row<DocumentRow> }) {
	const { handlePreviewSelected, prefetchDocument } = useDocumentsContext();

	return (
		<button
			type="button"
			onMouseEnter={() => prefetchDocument(row.original.documentId)}
			onClick={() => {
				handlePreviewSelected(row.original);
			}}
			className="block size-12 overflow-hidden rounded-md border border-slate-200 transition-shadow hover:ring-2 hover:ring-amber-500 focus:ring-2 focus:ring-amber-500 focus:outline-none"
		>
			<img
				src={row.original.presignedUrl}
				alt={row.original.fileName}
				className="size-full object-cover"
			/>
		</button>
	);
}

function ActionsCell({ row }: { row: Row<DocumentRow> }) {
	const { handleDelete, pendingIds } = useDocumentsContext();
	const isLoading = pendingIds.has(row.original.documentId);

	return (
		<div className="flex justify-center items-center w-full">
			<Button
				type="button"
				variant="destructive"
				size="sm"
				onClick={() => handleDelete(row.original)}
				disabled={isLoading}
				title="delete"
				aria-label="delete"
			>
				{isLoading ? <Loader2 className="animate-spin" /> : <Trash2 />}
			</Button>
		</div>
	);
}

export function getColumns() {
	return [
		columnHelper.display({
			id: "select",
			enableSorting: false,
			enableHiding: false,
			header: ({ table }) => (
				<Label className="flex items-center w-full justify-center p-3 cursor-pointer">
					<Checkbox
						className="size-4 cursor-pointer"
						checked={
							table.getIsSomeRowsSelected()
								? "indeterminate"
								: table.getIsAllRowsSelected()
						}
						onCheckedChange={(checked) =>
							table.toggleAllRowsSelected(checked === true)
						}
						aria-label="Select all"
						title="Select all"
					/>
				</Label>
			),
			cell: ({ row }) => (
				<Label className="flex items-center w-full justify-center p-3 cursor-pointer">
					<Checkbox
						className="size-4 cursor-pointer"
						checked={row.getIsSelected()}
						disabled={!row.getCanSelect()}
						onCheckedChange={row.getToggleSelectedHandler()}
						aria-label={`Select row ${row.original.fileName}`}
						title={`Select row ${row.original.fileName}`}
					/>
				</Label>
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
				const doc = row.original;
				const payment = doc.paymentResult;

				if (!payment) {
					return <span className="text-muted-foreground">—</span>;
				}

				if (payment.status === "VALID") {
					return (
						<div className="flex items-center gap-1.5">
							<Tooltip>
								<TooltipTrigger asChild>
									<Badge>Pago Móvil</Badge>
								</TooltipTrigger>
								<TooltipContent>
									<span>
										Ref: {payment.referenceNumber}
										<br />
										Monto: Bs. {payment.amount}
									</span>
								</TooltipContent>
							</Tooltip>
						</div>
					);
				}

				return (
					<div className="flex items-center gap-1.5">
						<Tooltip>
							<TooltipTrigger asChild>
								<Badge variant="outline">No payment</Badge>
							</TooltipTrigger>
							<TooltipContent>No pago móvil data found</TooltipContent>
						</Tooltip>
					</div>
				);
			},
		}),

		columnHelper.display({
			id: "preview",
			header: "Preview",
			enableSorting: false,
			cell: ({ row }) => <PreviewCell row={row} />,
		}),

		columnHelper.display({
			id: "actions",
			header: "Actions",
			enableSorting: false,
			cell: ({ row }) => <ActionsCell row={row} />,
		}),
	];
}
