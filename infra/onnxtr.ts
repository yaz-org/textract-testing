// Direct-invocation target for controlled benchmarks. Production OCR traffic
// continues to enter through the FIFO subscription in queue.ts.
import { documentCallbackHmacSecret } from "./callback-signing";

export const onnxtrFunction = new sst.aws.Function("OnnxTRFunction", {
	handler: "packages/onnxtr-lambda/handler.lambda_handler",
	runtime: "python3.13",
	python: { container: true },
	timeout: "3 minutes",
	memory: "2048 MB",
	environment: {
		ONNXTR_CACHE_DIR: "/opt/onnxtr_cache",
		ONNXTR_MODEL_MANIFEST: "/opt/onnxtr_cache/model-manifest.json",
		ONNXTR_MULTIPROCESSING_DISABLE: "TRUE",
		CFF_HMAC_SECRET_HEX: documentCallbackHmacSecret.value,
	},
});
