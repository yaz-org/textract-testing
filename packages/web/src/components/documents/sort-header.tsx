import type { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export function SortHeader<TData, TValue>({
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
