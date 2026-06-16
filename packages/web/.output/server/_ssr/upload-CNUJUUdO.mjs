import { o as __toESM } from "../_runtime.mjs";
import { m as require_react, p as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as finalizeDocumentUpload, t as createDocumentUpload } from "./server-fns-TVXYKOlF.mjs";
import { t as formatBytes } from "./format-m9phlI1L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upload-CNUJUUdO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function UploadPage() {
	const [message, setMessage] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [isUploading, setIsUploading] = (0, import_react.useState)(false);
	async function handleSubmit(event) {
		event.preventDefault();
		setMessage(null);
		setError(null);
		const form = event.currentTarget;
		const file = form.elements.namedItem("document")?.files?.[0];
		if (!file) {
			setError("Choose a file to upload.");
			return;
		}
		setIsUploading(true);
		try {
			const upload = await createDocumentUpload({ data: {
				fileName: file.name,
				contentType: file.type || "application/octet-stream",
				size: file.size
			} });
			const response = await fetch(upload.uploadUrl, {
				method: "PUT",
				headers: { "content-type": file.type || "application/octet-stream" },
				body: file
			});
			if (!response.ok) throw new Error(`Upload failed with status ${response.status}.`);
			await finalizeDocumentUpload({ data: {
				documentId: upload.documentId,
				fileName: file.name,
				s3Key: upload.s3Key,
				contentType: file.type || "application/octet-stream",
				size: file.size
			} });
			form.reset();
			setMessage(`${file.name} uploaded successfully.`);
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Upload failed.");
		} finally {
			setIsUploading(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1fr_0.9fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_16px_50px_rgba(15,23,42,0.08)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold uppercase tracking-[0.3em] text-amber-700",
					children: "Upload"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-2xl font-semibold text-slate-900",
					children: "Send a document to S3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-slate-600",
					children: "This uses a presigned URL, so the browser uploads the file directly to the bucket and then saves the metadata record in DynamoDB."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "mt-8 space-y-5",
					onSubmit: handleSubmit,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-2 block text-sm font-medium text-slate-800",
								children: "Document"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "document",
								type: "file",
								className: "block w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-4 text-slate-700 file:mr-4 file:rounded-full file:border-0 file:bg-slate-900 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: isUploading,
							className: "rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400",
							children: isUploading ? "Uploading..." : "Upload document"
						}),
						message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-emerald-700",
							children: message
						}) : null,
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium text-rose-700",
							children: error
						}) : null
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-[2rem] border border-amber-200 bg-amber-50/80 p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold text-slate-900",
				children: "Upload notes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-5 space-y-4 text-sm text-slate-700",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl bg-white/80 p-4",
						children: [
							"Files are limited to ",
							formatBytes(50 * 1024 * 1024),
							" in this first pass."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-2xl bg-white/80 p-4",
						children: "Metadata is written only after the S3 upload succeeds."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-2xl bg-white/80 p-4",
						children: "The app is intentionally unauthenticated because it is for internal use."
					})
				]
			})]
		})]
	});
}
//#endregion
export { UploadPage as component };
