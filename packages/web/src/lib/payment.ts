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
