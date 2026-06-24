export type PagoMovilPayment = {
	status: "VALID" | "INVALID";
	extractedAt: string;
	totalScore: number;
	referenceNumber: string;
	date?: string;
	amount: string;
	amountValue: number;
	originPhone?: string;
	destinationPhone?: string;
	destinationCedula?: string;
	originBank?: string;
	destinationBank?: string;
	concept?: string;
};

export type DoctrResult = {
	reference: string;
	amount: string;
	amount_value: number;
	date: string;
	destination_phone: string | null;
	destination_cedula: string | null;
	destination_bank: string | null;
	origin_phone: string | null;
	origin_bank: string | null;
	concept: string | null;
	score: number;
	status: "VALID" | "INVALID";
	confidence: number | null;
	inference_time: number;
	warnings: string[];
};

export type OnnxTRWord = {
	text: string;
	confidence: number;
	geometry: [number, number, number, number];
	objectness_score: number;
	crop_orientation: { value: number | null; confidence: number | null };
};

export type OnnxTRLine = {
	text: string;
	geometry: [number, number, number, number];
	objectness_score: number;
	words: OnnxTRWord[];
};

export type OnnxTRArtefact = {
	type: string;
	confidence: number;
	geometry: [number, number, number, number];
};

export type OnnxTRBlock = {
	text: string;
	objectness_score: number;
	geometry: [number, number, number, number];
	lines: OnnxTRLine[];
	artefacts: OnnxTRArtefact[];
};

export type OnnxTRPage = {
	page_idx: number;
	dimensions: { height: number; width: number };
	orientation: { value: number | null; confidence: number | null };
	language: { value: string | null; confidence: number | null };
	blocks: OnnxTRBlock[];
	text: string;
};

export type OnnxTRRawInference = {
	inferenceType: "onnxtr";
	extractedAt: string;
	pageCount: number;
	pages: OnnxTRPage[];
	fullText: string;
	averageConfidence: number | null;
	inferenceTimeMs: number;
	modelInfo: {
		detArch: string;
		recoArch: string;
	};
};

export type InferenceType = "doctr" | "textract" | "onnxtr";

export type DocTRRawInference = {
	inferenceType: "doctr";
	extractedAt: string;
	pages: number;
	blocks: number;
	lines: number;
	text: string;
	allLines: string[];
	averageConfidence: number | null;
	inferenceTimeMs: number;
	modelInfo: {
		detArch: string;
		recoArch: string;
	};
};

export type TextractRawInference = {
	inferenceType: "textract";
	extractedAt: string;
	layout: { blockType: string; text: string; confidence: number }[];
	forms: { key: string; value: string; confidence: number }[];
};

export type RawInference = DocTRRawInference | TextractRawInference | OnnxTRRawInference;

export type InferenceRecord = {
	inferenceType: InferenceType;
	extractedAt: string;
	raw: RawInference;
	payment?: PagoMovilPayment;
};
