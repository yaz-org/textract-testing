import { n as createServerFn, t as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { a as listDocuments, i as finalizeUploadSchema, n as deleteDocument, o as saveDocumentRecord, r as deleteDocumentSchema, s as uploadRequestSchema, t as createUploadUrl } from "./documents-BSEWE82V.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/server-fns-BgZfeNyP.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getDocuments_createServerFn_handler = createServerRpc({
	id: "b932e7c85398a6c9a6e6569017b4ba89174f6f8a00759894f279678ef9aa81b1",
	name: "getDocuments",
	filename: "src/lib/server-fns.ts"
}, (opts) => getDocuments.__executeServer(opts));
var getDocuments = createServerFn({ method: "GET" }).handler(getDocuments_createServerFn_handler, async () => {
	return listDocuments();
});
var createDocumentUpload_createServerFn_handler = createServerRpc({
	id: "45821968e341458822e481328247a6ec4fc3b20a99e1e45f7cd98da984bbfec9",
	name: "createDocumentUpload",
	filename: "src/lib/server-fns.ts"
}, (opts) => createDocumentUpload.__executeServer(opts));
var createDocumentUpload = createServerFn({ method: "POST" }).validator(uploadRequestSchema).handler(createDocumentUpload_createServerFn_handler, async ({ data }) => {
	return createUploadUrl(data);
});
var finalizeDocumentUpload_createServerFn_handler = createServerRpc({
	id: "60d2f2cdc8e55f1a22e53139a0501170cc01bac7e7a9e779988c4d3e31013c61",
	name: "finalizeDocumentUpload",
	filename: "src/lib/server-fns.ts"
}, (opts) => finalizeDocumentUpload.__executeServer(opts));
var finalizeDocumentUpload = createServerFn({ method: "POST" }).validator(finalizeUploadSchema).handler(finalizeDocumentUpload_createServerFn_handler, async ({ data }) => {
	return saveDocumentRecord(data);
});
var deleteStoredDocument_createServerFn_handler = createServerRpc({
	id: "5fa5797ca75334216e44fa1bc9cdb283f0d094c55ce0ea3ab94aa1d4b24ca855",
	name: "deleteStoredDocument",
	filename: "src/lib/server-fns.ts"
}, (opts) => deleteStoredDocument.__executeServer(opts));
var deleteStoredDocument = createServerFn({ method: "POST" }).validator(deleteDocumentSchema).handler(deleteStoredDocument_createServerFn_handler, async ({ data }) => {
	return deleteDocument(data);
});
//#endregion
export { createDocumentUpload_createServerFn_handler, deleteStoredDocument_createServerFn_handler, finalizeDocumentUpload_createServerFn_handler, getDocuments_createServerFn_handler };
