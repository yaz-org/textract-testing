import { documentsBucket } from "./storage";

export const onnxtrFunction = new sst.aws.Function("OnnxTRFunction", {
	handler: "packages/onnxtr-lambda/handler.lambda_handler",
	runtime: "python3.13",
	python: { container: true },
	timeout: "120 seconds",
	memory: "2048 MB",
	link: [documentsBucket],
	environment: {
		DOCUMENTS_BUCKET_NAME: documentsBucket.name,
		ONNXTR_CACHE_DIR: "/tmp/onnxtr_cache",
		ONNXTR_MULTIPROCESSING_DISABLE: "TRUE",
	},
});
