import { Resource } from "sst";
import { extractOnnxTRPayment, saveInference } from "@textract-testing/shared";
import type { OnnxTRRawInference, InferenceRecord } from "@textract-testing/shared";

interface FunctionUrlEvent {
  httpMethod?: string;
  rawPath?: string;
  path?: string;
  body?: string;
  headers: Record<string, string>;
  requestContext: {
    domainName?: string;
    http: { method?: string; path?: string };
  };
}

interface CallbackPayload {
  success: boolean;
  inferenceType?: string;
  extractedAt?: string;
  pageCount?: number;
  pages?: unknown[];
  fullText?: string;
  averageConfidence?: number | null;
  inferenceTimeMs?: number;
  modelInfo?: { detArch: string; recoArch: string };
  error?: string;
}

export const handler = async (event: FunctionUrlEvent) => {
  const p = event.rawPath || event.path || event.requestContext?.http?.path || "";
  const match = p.match(/\/documents\/([^/]+)/);
  const documentId = match?.[1];
  if (!documentId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing documentId in path" }),
      headers: { "Content-Type": "application/json" },
    };
  }

  const payload: CallbackPayload = JSON.parse(event.body || "{}");

  if (!payload.success) {
    console.error(`OCR failed for ${documentId}:`, payload.error);
    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
      headers: { "Content-Type": "application/json" },
    };
  }

  const rawInference = payload as unknown as OnnxTRRawInference;
  const payment = extractOnnxTRPayment(rawInference);

  const inferenceRecord: InferenceRecord = {
    inferenceType: "onnxtr",
    extractedAt: payload.extractedAt || new Date().toISOString(),
    raw: rawInference,
    payment,
  };

  await saveInference(documentId, inferenceRecord);

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
    headers: { "Content-Type": "application/json" },
  };
};
