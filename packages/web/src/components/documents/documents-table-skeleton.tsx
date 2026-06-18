import { Skeleton } from "#/components/ui/skeleton";
import {
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";

const ROWS = 8;

type SkeletonRow = { id: number };

const skeletonRows: SkeletonRow[] = Array.from({ length: ROWS }, (_, i) => ({
	id: i,
}));

function SkeletonCell({ className }: { className?: string }) {
	return <Skeleton className={cn("h-4 w-full", className)} />;
}

import { cn } from "#/lib/utils";

export function DocumentsTableSkeleton() {
	return (
		<div className="flex h-full min-h-0 flex-col gap-6 rounded-xl border bg-card py-6 shadow-sm">
			<div className="flex items-start justify-between px-6">
				<div>
					<p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-700">
						Documents
					</p>
				</div>
				<div className="flex gap-4 items-center">
					<div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
						<Skeleton className="h-4 w-24" />
					</div>
				</div>
			</div>

			<div className="relative h-full min-h-0 overflow-auto rounded-lg border bg-card">
				<table className="grid w-full text-sm">
					<TableHeader className="sticky top-0 z-10 bg-card">
						<TableRow
							data-slot="table-row"
							className="grid w-full grid-cols-[1fr_5fr_1fr_1fr_3fr_3fr_2fr_2fr]"
						>
							<TableHead className="flex items-center tracking-wider justify-center">
								<Skeleton className="size-4 rounded-sm" />
							</TableHead>
							<TableHead className="flex items-center tracking-wider">
								<SkeletonCell className="max-w-24" />
							</TableHead>
							<TableHead className="flex items-center tracking-wider">
								<SkeletonCell className="max-w-16" />
							</TableHead>
							<TableHead className="flex items-center tracking-wider">
								<SkeletonCell className="max-w-12" />
							</TableHead>
							<TableHead className="flex items-center tracking-wider">
								<SkeletonCell className="max-w-20" />
							</TableHead>
							<TableHead className="flex items-center tracking-wider">
								<SkeletonCell className="max-w-20" />
							</TableHead>
							<TableHead className="flex items-center tracking-wider justify-center">
								<Skeleton className="size-12 rounded-md" />
							</TableHead>
							<TableHead className="flex items-center tracking-wider justify-center">
								<Skeleton className="size-8 rounded-md" />
							</TableHead>
						</TableRow>
					</TableHeader>

					<TableBody className="relative grid" style={{ height: ROWS * 65 }}>
						{skeletonRows.map((row) => (
							<TableRow
								key={row.id}
								data-slot="table-row"
								style={{ transform: `translateY(${row.id * 65}px)` }}
								className={cn(
									"absolute grid w-full grid-cols-[1fr_5fr_1fr_1fr_3fr_3fr_2fr_2fr] border-b transition-colors",
									row.id % 2 === 0 && "bg-muted/20",
								)}
							>
								<TableCell className="flex items-center justify-center">
									<Skeleton className="size-4 rounded-sm" />
								</TableCell>
								<TableCell className="flex items-center">
									<SkeletonCell className="max-w-40" />
								</TableCell>
								<TableCell className="flex items-center">
									<SkeletonCell className="max-w-16" />
								</TableCell>
								<TableCell className="flex items-center">
									<SkeletonCell className="max-w-12" />
								</TableCell>
								<TableCell className="flex items-center">
									<SkeletonCell className="max-w-24" />
								</TableCell>
								<TableCell className="flex items-center">
									<SkeletonCell className="max-w-20" />
								</TableCell>
								<TableCell className="flex items-center justify-center">
									<Skeleton className="size-12 rounded-md" />
								</TableCell>
								<TableCell className="flex items-center justify-center">
									<Skeleton className="size-8 rounded-md" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</table>
			</div>
		</div>
	);
}
