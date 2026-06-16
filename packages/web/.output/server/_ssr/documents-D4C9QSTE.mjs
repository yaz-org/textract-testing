import { c as lazyRouteComponent, l as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as getDocuments } from "./server-fns-TVXYKOlF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/documents-D4C9QSTE.js
var $$splitComponentImporter = () => import("./documents-lbfbJnxq.mjs");
var Route = createFileRoute("/documents")({
	loader: async () => ({ documents: await getDocuments() }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
