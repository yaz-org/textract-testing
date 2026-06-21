import "@tanstack/react-start/server-only";

export type PagoMovilPayment = {
	status: "VALID" | "INVALID";
	extractedAt: string;
	totalScore: number;
	// Core fields
	referenceNumber: string;
	date: string;
	amount: string;
	amountValue: number;
	// Optional fields
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
