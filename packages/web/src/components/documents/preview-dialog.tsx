import { ChevronLeft, ChevronRight, Loader2, ScanText } from "lucide-react";
import { useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { Button } from "#/components/ui/button.tsx";
import { formatBytes, formatDate } from "#/lib/format";
import { toast } from "sonner";
import { reprocessPayment } from "#/lib/server-fns";
import type { DocumentRow } from "./columns";

interface PreviewDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	previewDocument: DocumentRow | null;
	currentIndex: number;
	totalCount: number;
	goToPrev: () => void;
	goToNext: () => void;
	onClose: () => void;
}

export function PreviewDialog({
	open,
	onOpenChange,
	previewDocument,
	currentIndex,
	totalCount,
	goToPrev,
	goToNext,
	onClose,
}: PreviewDialogProps) {
  console.log("Doctr result", previewDocument?.doctrResult);
	const lastScrollTime = useRef(0);

	useEffect(() => {
		if (!open) return;

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

	const queryClient = useQueryClient();

	const reprocessMutation = useMutation({
		mutationFn: (input: { documentId: string }) => reprocessPayment({ data: input }),
    onSuccess: async (res) => {
      console.log("onSuccess",res);
    },
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ["documents"] });
		},
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Reprocessing failed.");
    }
	});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger />
			<DialogContent
				className="max-w-[90vw] sm:max-w-6xl"
				onCloseAutoFocus={onClose}
			>
				<DialogTitle className="sr-only">Document preview</DialogTitle>
				<DialogDescription />
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
									disabled={currentIndex === totalCount - 1}
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
								<Button
									type="button"
									variant="outline"
									size="sm"
									className="w-full gap-1.5"
									onClick={() => reprocessMutation.mutate({ documentId: previewDocument.documentId}) }
									disabled={reprocessMutation.isPending}
								>
									{reprocessMutation.isPending ? (
										<Loader2 className="size-4 animate-spin" />
									) : (
										<ScanText className="size-4" />
									)}
									Process again
								</Button>
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

					{previewDocument?.paymentResult?.status === "VALID" && (
						<div className="border-t border-slate-200 pt-6 mt-6 space-y-3">
							<h3 className="font-semibold">Pago Móvil Data</h3>
							<dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
								<div>
									<dt className="text-muted-foreground">Referencia</dt>
									<dd className="font-mono font-medium">
										{previewDocument.paymentResult.referenceNumber}
									</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">Monto</dt>
									<dd className="font-medium">
										Bs. {previewDocument.paymentResult.amount}
									</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">Fecha</dt>
									<dd>{previewDocument.paymentResult.date}</dd>
								</div>
								{previewDocument.paymentResult.originPhone && (
									<div>
										<dt className="text-muted-foreground">Teléfono origen</dt>
										<dd className="font-mono">
											{previewDocument.paymentResult.originPhone}
										</dd>
									</div>
								)}
								{previewDocument.paymentResult.destinationPhone && (
									<div>
										<dt className="text-muted-foreground">Teléfono destino</dt>
										<dd className="font-mono">
											{previewDocument.paymentResult.destinationPhone}
										</dd>
									</div>
								)}
								{previewDocument.paymentResult.destinationCedula && (
									<div>
										<dt className="text-muted-foreground">Cédula destino</dt>
										<dd className="font-mono">
											{previewDocument.paymentResult.destinationCedula}
										</dd>
									</div>
								)}
								{previewDocument.paymentResult.originBank && (
									<div>
										<dt className="text-muted-foreground">Banco origen</dt>
										<dd>{previewDocument.paymentResult.originBank}</dd>
									</div>
								)}
								{previewDocument.paymentResult.destinationBank && (
									<div>
										<dt className="text-muted-foreground">Banco destino</dt>
										<dd>{previewDocument.paymentResult.destinationBank}</dd>
									</div>
								)}
								{previewDocument.paymentResult.concept && (
									<div>
										<dt className="text-muted-foreground">Concepto</dt>
										<dd>{previewDocument.paymentResult.concept}</dd>
									</div>
								)}
							</dl>
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
	);
}
