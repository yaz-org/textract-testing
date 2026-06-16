import { n as createServerFn, r as getServerFnById, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { i as finalizeUploadSchema, r as deleteDocumentSchema, s as uploadRequestSchema } from "./documents-BSEWE82V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-fns-TVXYKOlF.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getDocuments = createServerFn({ method: "GET" }).handler(createSsrRpc("b932e7c85398a6c9a6e6569017b4ba89174f6f8a00759894f279678ef9aa81b1"));
var createDocumentUpload = createServerFn({ method: "POST" }).validator(uploadRequestSchema).handler(createSsrRpc("45821968e341458822e481328247a6ec4fc3b20a99e1e45f7cd98da984bbfec9"));
var finalizeDocumentUpload = createServerFn({ method: "POST" }).validator(finalizeUploadSchema).handler(createSsrRpc("60d2f2cdc8e55f1a22e53139a0501170cc01bac7e7a9e779988c4d3e31013c61"));
var deleteStoredDocument = createServerFn({ method: "POST" }).validator(deleteDocumentSchema).handler(createSsrRpc("5fa5797ca75334216e44fa1bc9cdb283f0d094c55ce0ea3ab94aa1d4b24ca855"));
//#endregion
export { getDocuments as i, deleteStoredDocument as n, finalizeDocumentUpload as r, createDocumentUpload as t };
