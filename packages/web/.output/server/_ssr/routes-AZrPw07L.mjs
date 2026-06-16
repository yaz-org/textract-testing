import { d as Link, p as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-AZrPw07L.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1.2fr_0.8fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-[0_16px_50px_rgba(15,23,42,0.08)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-semibold uppercase tracking-[0.3em] text-amber-700",
					children: "Workflow"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 text-2xl font-semibold text-slate-900",
					children: "Upload, inspect, and clean up documents from one place."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-slate-600",
					children: "Files are uploaded directly to S3 using presigned URLs. Metadata is stored in DynamoDB so the list page can show what is currently in the system and remove it when needed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/upload",
						className: "rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700",
						children: "Upload a document"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/documents",
						className: "rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-900",
						children: "Browse documents"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-[2rem] border border-amber-200 bg-amber-50/80 p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-lg font-semibold text-slate-900",
				children: "What this app stores"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-6 grid gap-4 text-sm text-slate-700",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-white/80 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-medium text-slate-900",
							children: "S3 object"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1",
							children: "The raw uploaded document lives in the `Documents` bucket."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-white/80 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-medium text-slate-900",
							children: "DynamoDB row"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1",
							children: "Filename, content type, size, key, and created timestamp."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-white/80 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "font-medium text-slate-900",
							children: "Delete behavior"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1",
							children: "Removes both the object from S3 and the matching metadata row."
						})]
					})
				]
			})]
		})]
	});
}
//#endregion
export { Home as component };
