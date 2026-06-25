import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	ChevronLeft,
	ChevronRight,
	Copy,
	Loader2,
	ScanText,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { Button } from "#/components/ui/button.tsx";
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
import { _BANKS } from "#/lib/banks";
import { formatBytes, formatDate } from "#/lib/format";
import type { DocTRRawInference, OnnxTRRawInference } from "#/lib/payment";
import { processDocument } from "#/lib/server-fns";
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
	function getBankDisplay(code: string | undefined): string {
		if (!code) return "";
		const bank = _BANKS.find((b) => b.bankCode === code);
		return bank
			? `${bank.bankCode} — ${bank.acronym} — ${bank.fullName}`
			: code;
	}

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
		mutationFn: (input: { documentId: string; s3Key: string }) =>
			processDocument({ data: [input] }),
		onSettled: async () => {
			await queryClient.invalidateQueries({ queryKey: ["documents"] });
		},
		onError: (error) => {
			toast.error(
				error instanceof Error ? error.message : "Reprocessing failed.",
			);
		},
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
							<div className="w-85 shrink-0 space-y-4">
								<h2 className="wrap-break-word text-xs font-semibold">
									{previewDocument.fileName}
								</h2>
								<Button
									type="button"
									variant="outline"
									size="sm"
									className="w-full gap-1.5"
									onClick={() =>
										reprocessMutation.mutate({
											documentId: previewDocument.documentId,
											s3Key: previewDocument.s3Key,
										})
									}
									disabled={reprocessMutation.isPending}
								>
									{reprocessMutation.isPending ? (
										<Loader2 className="size-4 animate-spin" />
									) : (
										<ScanText className="size-4" />
									)}
									Run OCR
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

								{(() => {
									const doc = previewDocument;
									const latestInference = doc?.inferenceHistory?.at(-1);
									const payment =
										latestInference?.payment ?? doc?.paymentResult;
                  if (payment?.status !== "VALID") return null;
									return (
										<div className="border-t border-slate-200 pt-6 mt-6 space-y-3">
											<h3 className="font-semibold">Pago Móvil Data</h3>
											{latestInference && (
												<p className="text-xs text-muted-foreground">
													Engine:{" "}
													{latestInference.inferenceType}
													{" · "}
													Confidence:{" "}
                          {`${latestInference.raw.averageConfidence?.toFixed(3)}%`}
												</p>
											)}
											<dl className="grid grid-cols-1 gap-x-4 gap-y-2 text-sm sm:grid-cols-2">
												<div>
													<dt className="text-muted-foreground">Referencia</dt>
													<dd className="font-mono font-medium">
														{payment.referenceNumber}
													</dd>
												</div>
												<div>
													<dt className="text-muted-foreground">Monto</dt>
													<dd className="font-medium">Bs. {payment.amount}</dd>
												</div>
												<div>
													<dt className="text-muted-foreground">Fecha</dt>
													<dd>{payment.date ?? ""}</dd>
												</div>
												<div>
													<dt className="text-muted-foreground">Concepto</dt>
													<dd>{payment.concept ?? ""}</dd>
												</div>
												<div>
													<dt className="text-muted-foreground">
														Teléfono origen
													</dt>
													<dd className="font-mono">
														{payment.originPhone ?? ""}
													</dd>
												</div>
												<div>
													<dt className="text-muted-foreground">
														Banco origen
													</dt>
													<dd>{getBankDisplay(payment.originBank)}</dd>
												</div>
												<div>
													<dt className="text-muted-foreground">
														Teléfono destino
													</dt>
													<dd className="font-mono">
														{payment.destinationPhone ?? ""}
													</dd>
												</div>
												<div>
													<dt className="text-muted-foreground">
														Banco destino
													</dt>
													<dd>{getBankDisplay(payment.destinationBank)}</dd>
												</div>
												<div>
													<dt className="text-muted-foreground">
														Cédula destino
													</dt>
													<dd className="font-mono">
														{payment.destinationCedula ?? ""}
													</dd>
												</div>
											</dl>
										</div>
									);
								})()}
							</div>
						</div>
					)}

					{previewDocument?.inferenceHistory &&
						previewDocument.inferenceHistory.length > 0 && (
							<div className="border-t border-slate-200 pt-6 mt-6 space-y-4">
								<h3 className="font-semibold">Inference History</h3>
								{previewDocument.inferenceHistory.map((inf, idx) => (
									<details
										key={`${inf.inferenceType}-${inf.extractedAt}`}
										className="rounded-lg border border-slate-200 text-sm"
									>
										<summary className="cursor-pointer flex flex-row gap-2 px-3 py-2 font-medium hover:bg-slate-50">
											<span>
												#{idx + 1} — {inf.inferenceType}
											</span>
											{inf.payment?.status === "VALID" && (
												<span className="ml-2 text-green-600">✓ Parsed</span>
											)}
											<span>{inf.extractedAt}</span>
										</summary>
										<div className="border-t border-slate-200 px-3 py-2 space-y-2">
											{inf.inferenceType === "doctr" && (
												<>
													<p>
														Pages: {(inf.raw as DocTRRawInference).pages ?? "—"}
													</p>
													<p>
														Lines: {(inf.raw as DocTRRawInference).lines ?? "—"}
													</p>
													<p>
														Confidence:{" "}
														{(
															(inf.raw as DocTRRawInference)
																.averageConfidence ?? 100
														).toFixed(4)}
														%
													</p>
													<p>
														Inference time:{" "}
														{(inf.raw as DocTRRawInference).inferenceTimeMs ??
															"—"}
														ms
													</p>
													<details className="relative">
														<summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
															Raw text (
															{(inf.raw as DocTRRawInference).allLines.length}{" "}
															lines)
														</summary>
														<button
															type="button"
															onClick={(e) => {
																e.stopPropagation();
																navigator.clipboard.writeText(
																	(inf.raw as DocTRRawInference).allLines.join(
																		"\n",
																	),
																);
																toast.success("Copiado");
															}}
															className="absolute right-2 top-2 z-10 rounded p-1 text-muted-foreground hover:bg-slate-100 hover:text-foreground transition"
															aria-label="Copy raw text"
														>
															<Copy className="size-3.5" />
														</button>
														<pre className="mt-1 max-h-48 overflow-auto rounded bg-slate-50 p-2 text-xs font-mono">
															{(inf.raw as DocTRRawInference).allLines.join(
																"\n",
															)}
														</pre>
													</details>
												</>
											)}
											{inf.inferenceType === "onnxtr" && (
												<>
													<p>
														Pages:{" "}
														{(inf.raw as OnnxTRRawInference).pageCount ?? "—"}
													</p>
													<p>
														Confidence:{" "}
														{(
															(inf.raw as OnnxTRRawInference)
																.averageConfidence ?? 100
														).toFixed(4)}
														%
													</p>
													<p>
														Inference time:{" "}
														{(inf.raw as OnnxTRRawInference).inferenceTimeMs ??
															"—"}
														ms
													</p>
													<p>
														Model:{" "}
														{(inf.raw as OnnxTRRawInference).modelInfo.detArch}{" "}
														/{" "}
														{(inf.raw as OnnxTRRawInference).modelInfo.recoArch}
													</p>
													<details className="relative">
														<summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
															Raw inference JSON
														</summary>
														<button
															type="button"
															onClick={(e) => {
																e.stopPropagation();
																navigator.clipboard.writeText(
																	JSON.stringify(
																		inf.raw as OnnxTRRawInference,
																		null,
																		2,
																	),
																);
																toast.success("Copiado");
															}}
															className="absolute right-2 top-2 z-10 rounded p-1 text-muted-foreground hover:bg-slate-100 hover:text-foreground transition"
															aria-label="Copy raw inference"
														>
															<Copy className="size-3.5" />
														</button>
														<pre className="mt-1 max-h-48 overflow-auto rounded bg-slate-50 p-2 text-xs font-mono">
															{JSON.stringify(
																inf.raw as OnnxTRRawInference,
																null,
																2,
															)}
														</pre>
													</details>
												</>
											)}
										</div>
									</details>
								))}
							</div>
						)}

					{previewDocument?.textractResult &&
						!previewDocument.inferenceHistory && (
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
