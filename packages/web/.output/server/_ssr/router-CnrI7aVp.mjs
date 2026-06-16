import { c as lazyRouteComponent, d as Link, i as HeadContent, l as createFileRoute, o as createRouter, p as require_jsx_runtime, r as Scripts, s as Outlet, u as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route$3 } from "./documents-D4C9QSTE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-CnrI7aVp.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-C3OotHez.css";
var Route$2 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Textract Testing Documents" }
		],
		links: [{
			rel: "stylesheet",
			href: styles_default
		}]
	}),
	shellComponent: RootDocument,
	component: RootLayout
});
function RootDocument({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootLayout() {
	const navClassName = "rounded-full border border-amber-200 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-amber-300 hover:text-amber-700";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "rounded-[2rem] border border-white/80 bg-white/70 px-6 py-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-semibold uppercase tracking-[0.3em] text-amber-700",
								children: "Internal Document Console"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl",
								children: "Upload documents to S3 and manage their metadata in DynamoDB."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-base text-slate-600",
								children: "Built as a small TanStack Start app on SST for internal use."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex flex-wrap gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: navClassName,
								children: "Overview"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/upload",
								className: navClassName,
								children: "Upload"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/documents",
								className: navClassName,
								children: "Documents"
							})
						]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
			})]
		})
	});
}
var $$splitComponentImporter$1 = () => import("./upload-CNUJUUdO.mjs");
var Route$1 = createFileRoute("/upload")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./routes-AZrPw07L.mjs");
var Route = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var UploadRoute = Route$1.update({
	id: "/upload",
	path: "/upload",
	getParentRoute: () => Route$2
});
var DocumentsRoute = Route$3.update({
	id: "/documents",
	path: "/documents",
	getParentRoute: () => Route$2
});
var rootRouteChildren = {
	IndexRoute: Route.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$2
	}),
	DocumentsRoute,
	UploadRoute
};
var routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
	return createRouter({
		routeTree,
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0
	});
}
//#endregion
export { getRouter };
