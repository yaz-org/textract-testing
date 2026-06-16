import { o as __toESM } from "../_runtime.mjs";
import { f as useRouter, m as require_react, p as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as deleteStoredDocument } from "./server-fns-TVXYKOlF.mjs";
import { t as Route } from "./documents-D4C9QSTE.mjs";
import { n as formatDate, t as formatBytes } from "./format-m9phlI1L.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-lbfbJnxq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DocumentsPage() {
	const { documents } = Route.useLoaderData();
	const router = useRouter();
	const [pendingId, setPendingId] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	async function handleDelete(documentId, s3Key) {
		setPendingId(documentId);
		setError(null);
		try {
			await deleteStoredDocument({ data: {
				documentId,
				s3Key
			} });
			await router.invalidate();
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Delete failed.");
		} finally {
			setPendingId(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_16px_50px_rgba(15,23,42,0.08)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold uppercase tracking-[0.3em] text-amber-700",
						children: "Documents"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-2xl font-semibold text-slate-900",
						children: "Current document records"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-slate-600",
						children: "Browse DynamoDB metadata and remove documents from both storage layers."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-slate-700",
					children: [
						documents.length,
						" ",
						documents.length === 1 ? "document" : "documents"
					]
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-sm font-medium text-rose-700",
				children: error
			}) : null,
			documents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-10 text-center text-slate-600",
				children: "No documents have been uploaded yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 overflow-hidden rounded-[1.5rem] border border-slate-200",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "min-w-full divide-y divide-slate-200",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-slate-50",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "text-left text-sm text-slate-600",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Name"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Type"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Size"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Created"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "S3 Key"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "px-4 py-3 font-medium",
										children: "Action"
									})
								]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-slate-200 bg-white text-sm text-slate-700",
							children: documents.map((document) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-4 font-medium text-slate-900",
									children: document.fileName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-4",
									children: document.contentType
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-4",
									children: formatBytes(document.size)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-4",
									children: formatDate(document.createdAt)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-4 text-xs text-slate-500",
									children: document.s3Key
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => handleDelete(document.documentId, document.s3Key),
										disabled: pendingId === document.documentId,
										className: "rounded-full border border-rose-200 px-4 py-2 font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60",
										children: pendingId === document.documentId ? "Deleting..." : "Delete"
									})
								})
							] }, document.documentId))
						})]
					})
				})
			})
		]
	});
}
//#endregion
export { DocumentsPage as component };
