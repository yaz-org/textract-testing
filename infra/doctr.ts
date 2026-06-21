import { documentsBucket, documentsTable } from "./storage";

export const doctrFunction = new sst.aws.Function("DoctrFunction", {
	handler: "packages/doctr-lambda/handler.lambda_handler",
	runtime: "python3.13",
	python: { container: true },
	timeout: "60 seconds",
	memory: "4096 MB",
	link: [documentsBucket, documentsTable],
	environment: {
		DOCUMENTS_BUCKET_NAME: documentsBucket.name,
		DOCUMENTS_TABLE_NAME: documentsTable.name,
		DOCTR_MULTIPROCESSING_DISABLE: "TRUE",
		DOCTR_CACHE_DIR: "/opt/doctr_cache",
	},
});
