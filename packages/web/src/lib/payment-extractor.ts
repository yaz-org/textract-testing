import "@tanstack/react-start/server-only";

import { _BANKS } from "./banks";
import type { PagoMovilPayment } from "./payment";
import type { TextractResult } from "./textract";

const SCORE_THRESHOLD = 4;

function normalizeText(text: string): string {
	return text
		.toLowerCase()
		.replace(/[áàäâ]/g, "a")
		.replace(/[éèëê]/g, "e")
		.replace(/[íìïî]/g, "i")
		.replace(/[óòöô]/g, "o")
		.replace(/[úùüû]/g, "u")
		.replace(/ñ/g, "n")
		.replace(/\s+/g, " ")
		.trim();
}

function fuzzyMatchLabel(text: string, labels: string[]): boolean {
	const t = normalizeText(text);
	const tNoColon = t.replace(/:$/, "");
	return labels.some((l) => {
		const nl = normalizeText(l);
		if (tNoColon === nl) return true;
		if (!nl.includes(" ")) return false;
		return containsWordsInOrder(tNoColon, nl.split(/\s+/));
	});
}

function containsWordsInOrder(text: string, labelWords: string[]): boolean {
	const textWords = text.split(/\s+/);
	let ti = 0;
	for (const lw of labelWords) {
		while (ti < textWords.length && textWords[ti] !== lw) ti++;
		if (ti >= textWords.length) return false;
		ti++;
	}
	return true;
}

function getCleanValue(value: string): string {
	return value.trim().replace(/\s+/g, " ");
}

function findValueNearLabel(
	lines: string[],
	labels: string[],
	valuePattern?: RegExp,
	maxDistance = 2,
): string | null {
	for (let i = 0; i < lines.length; i++) {
		if (fuzzyMatchLabel(lines[i], labels)) {
			for (let j = 1; j <= maxDistance && i + j < lines.length; j++) {
				const candidate = getCleanValue(lines[i + j]);
				if (valuePattern) {
					const m = candidate.match(valuePattern);
					if (m) return m[0];
				} else {
					return candidate;
				}
			}
		}
	}
	return null;
}

function extractFieldFromForms<T>(
	forms: { key: string; value: string }[],
	labels: string[],
	valueFilter: (v: string) => T | null,
): T | null {
	for (const form of forms) {
		if (fuzzyMatchLabel(form.key, labels)) {
			const val = getCleanValue(form.value);
			const filtered = valueFilter(val);
			if (filtered) return filtered;
		}
	}
	return null;
}

const VZLA_PHONE = /0(412|414|416|424|426)[\s-]?\d{7}/;
const MASKED_PHONE = /0\d{1,3}\*[*\s-]*\d{0,4}/;
const CEDULA_PREFIXED = /[VEJG]\s*[-]?\s*\d{5,10}/;
const VZLA_AMOUNT = /(?:Bs?\.?\s*)?([\d.]+[,]\d{2})(?:\s*Bs)?/i;
const EMBEDDED_AMOUNT =
	/(?:Realizaste\s+(?:un\s+)?(?:Pago\s+Móvil|transacción)\s+de\s+Bs\.?\s*)([\d.]+[,]\d{2})/i;
const DATE_PATTERN = /\d{1,2}\/\d{1,2}\/\d{2,4}/;
const TIME_PATTERN = /\d{1,2}:\d{2}(?::\d{2})?\s*(AM|PM|am|pm)?/;
const BANK_CODE_PREFIX = /^\d{4}\s*[-:.]?\s*/;

function extractPhone(text: string): string | null {
	const m = text.match(VZLA_PHONE);
	if (m) return m[0];
	const mm = text.match(MASKED_PHONE);
	if (mm) return mm[0];
	return null;
}

function extractCedula(text: string): string | null {
	const m = text.match(CEDULA_PREFIXED);
	if (m) {
		return m[0].replace(/\s+/g, "").replace(/([VEJG])-?(\d+)/, "$1-$2");
	}
	return null;
}

function parseVzlaAmount(text: string): { text: string; value: number } | null {
	const m = text.match(/([\d.]+[,]\d{2})/);
	if (!m) return null;
	const raw = m[1];
	const numeric = raw.replace(/\./g, "").replace(",", ".");
	const value = Number.parseFloat(numeric);
	if (Number.isNaN(value)) return null;
	return { text: raw, value };
}

function parseVzlaDate(text: string): string | null {
	const dateMatch = text.match(DATE_PATTERN);
	if (!dateMatch) return null;
	const raw = dateMatch[0];
	const parts = raw.split("/");
	const day = Number.parseInt(parts[0], 10);
	const month = Number.parseInt(parts[1], 10) - 1;
	let year = Number.parseInt(parts[2], 10);
	if (year < 100) year += 2000;
	if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year))
		return null;

	const date = new Date(year, month, day);

	const timeMatch = text.match(TIME_PATTERN);
	if (timeMatch) {
		return `${date.toISOString().split("T")[0]}T${timeMatch[0]}`;
	}

	return date.toISOString().split("T")[0];
}

function matchBank(text: string): string | null {
	const normalized = normalizeText(text);
	for (const bank of _BANKS) {
		const candidates = [
			bank.shortName,
			bank.fullName,
			bank.acronym,
			...bank.alternativeNames,
		];
		for (const candidate of candidates) {
			if (normalized.includes(normalizeText(candidate))) {
				return bank.shortName;
			}
		}
		if (normalized.includes(normalizeText(bank.bankCode))) {
			return bank.shortName;
		}
	}
	return null;
}

function stripBankCode(text: string): string {
	return text.replace(BANK_CODE_PREFIX, "").trim();
}

function parseCompoundBeneficiary(text: string): {
	phone?: string;
	cedula?: string;
	bank?: string;
} {
	const result: {
		phone?: string;
		cedula?: string;
		bank?: string;
	} = {};

	const phone = extractPhone(text);
	if (phone) result.phone = phone;

	const cedula = extractCedula(text);
	if (cedula) result.cedula = cedula;

	const bank = matchBank(text);
	if (bank) result.bank = bank;

	return result;
}

function scoreReceipt(
	allLines: string[],
	forms: { key: string; value: string }[],
): number {
	let score = 0;
	const allText = allLines.join(" ");
	const normalized = normalizeText(allText);

	// Pago móvil keywords
	const kwRegex =
		/pago\s*movil|pago\s*móvil|tpago|tpage|recibo|pagomovilbdv|pagomóvil/;
	if (kwRegex.test(normalized)) score += 3;

	// Reference number found near reference label
	const refLabels = [
		"referencia",
		"nro. de referencia",
		"nro referencia",
		"numero de referencia",
		"número de referencia",
		"ref.",
		"operacion",
		"operación",
		"comprobante",
	];
	const refFound =
		findValueNearLabel(allLines, refLabels, /\d{6,15}/) ??
		extractFieldFromForms(forms, refLabels, (v) => {
			const m = v.match(/\d{6,15}/);
			return m ? m[0] : null;
		});
	if (refFound) score += 3;

	// Venezuelan phone number
	if (VZLA_PHONE.test(allText) || MASKED_PHONE.test(allText)) score += 2;

	// Cedula/RIF pattern
	if (CEDULA_PREFIXED.test(allText)) score += 2;

	// Venezuelan bank name
	const bankFound = _BANKS.some((bank) => {
		const normalized = normalizeText(allText);
		if (normalized.includes(normalizeText(bank.shortName))) return true;
		if (normalized.includes(normalizeText(bank.fullName))) return true;
		if (normalized.includes(normalizeText(bank.bankCode))) return true;
		return bank.alternativeNames.some((a) =>
			normalized.includes(normalizeText(a)),
		);
	});
	if (bankFound) score += 1;

	// Amount in VZLA format
	if (VZLA_AMOUNT.test(allText) || EMBEDDED_AMOUNT.test(allText)) score += 1;

	// Success/process/confirmation keywords
	const successRegex =
		/operación\s*exitosa|operacion\s*exitosa|operación\s*en\s*proceso|pago\s*exitoso|comprobante\s*de\s*pago|resumen\s*pago|transacción\s*exitosa|realizaste\s*un\s*pago|tu\s*pago\s*móvil\s*fue\s*exitoso/;
	if (successRegex.test(normalized)) score += 1;

	return score;
}

export function extractPagoMovil(result: TextractResult): PagoMovilPayment {
	const layoutLines = result.layout
		.filter((l) => l.blockType === "LINE" && l.text.trim().length > 0)
		.map((l) => l.text.trim());
	const forms = result.forms
		.filter((f) => f.value && f.value.trim().length > 0)
		.map((f) => ({ key: f.key, value: f.value }));

	const totalScore = scoreReceipt(layoutLines, forms);

	if (totalScore < SCORE_THRESHOLD) {
		return {
			status: "INVALID",
			extractedAt: new Date().toISOString(),
			totalScore,
			referenceNumber: "",
			date: "",
			amount: "",
			amountValue: 0,
		};
	}

	const refLabels = [
		"referencia",
		"nro. de referencia",
		"nro referencia",
		"numero de referencia",
		"número de referencia",
		"ref.",
		"operacion",
		"operación",
		"comprobante",
	];

	const refFromForms = extractFieldFromForms(forms, refLabels, (v) => {
		const m = v.match(/\d{6,15}/);
		return m ? m[0] : null;
	});
	const referenceNumber =
		refFromForms ??
		findValueNearLabel(layoutLines, refLabels, /\d{6,15}/) ??
		"";

	// --- Amount ---
	const amountLabels = [
		"monto",
		"monto de la operación",
		"monto (bs.)",
		"monte (bs.)",
		"total",
		"importe",
	];
	let amountData: { text: string; value: number } | null = null;

	amountData =
		extractFieldFromForms(forms, amountLabels, (v) => parseVzlaAmount(v)) ??
		(() => {
			const raw = findValueNearLabel(layoutLines, amountLabels, VZLA_AMOUNT);
			return raw ? parseVzlaAmount(raw) : null;
		})() ??
		(() => {
			const m = layoutLines.join(" ").match(EMBEDDED_AMOUNT);
			return m ? parseVzlaAmount(m[1]) : null;
		})() ??
		(() => {
			for (const line of layoutLines) {
				const parsed = parseVzlaAmount(line);
				if (parsed) return parsed;
			}
			return null;
		})();

	const amount = amountData?.text ?? "";
	const amountValue = amountData?.value ?? 0;

	// --- Date ---
	const dateLabels = [
		"fecha",
		"fecha y hora del envío",
		"fecha y hora del envio",
		"fecha y hero del envio",
		"fecha y hora",
	];

	const dateFromForms = extractFieldFromForms(forms, dateLabels, (v) => {
		return parseVzlaDate(v);
	});
	const date =
		dateFromForms ??
		(() => {
			const raw = findValueNearLabel(layoutLines, dateLabels, DATE_PATTERN);
			return raw ? parseVzlaDate(raw) : null;
		})() ??
		new Date().toISOString().split("T")[0];

	// --- Destination data ---
	const destPhoneLabels = [
		"número celular de destino",
		"número de celular de destino",
		"numero celular de destino",
		"numero de celular de destino",
		"telf beneficiario",
		"telf beneficiario:",
		"beneficiario",
		"beneficiario:",
		"destino",
		"destino:",
		"número de teléfono",
		"numero de telefono",
		"número de teléfono:",
	];

	const destCedulaLabels = [
		"identificación receptor",
		"identificacion receptor",
		"identificación",
		"identificacion",
		"identificación:",
		"documento de identidad",
		"documento de identidad:",
		"decumento de identidad:",
		"ci/rif beneficiario",
		"ci /rif beneficiario",
		"ci/rif beneficiario:",
		"ci /rif beneficiario:",
		"cédula de identidad / rif",
		"cedula de identidad / rif",
		"cédula de identidad / rif:",
	];

	const destBankLabels = [
		"banco receptor",
		"banco destino",
		"banco destino:",
		"bance destine:",
		"banco",
		"banco:",
	];

	let destinationPhone =
		extractFieldFromForms(forms, destPhoneLabels, (v) => extractPhone(v)) ??
		findValueNearLabel(layoutLines, destPhoneLabels, VZLA_PHONE) ??
		findValueNearLabel(layoutLines, destPhoneLabels, MASKED_PHONE) ??
		(() => {
			for (const line of layoutLines) {
				if (fuzzyMatchLabel(line, destPhoneLabels)) {
					const after = line.replace(/^[^:]+:\s*/, "");
					const m = after.match(VZLA_PHONE);
					if (m) return m[0];
					const mm = after.match(MASKED_PHONE);
					if (mm) return mm[0];
				}
			}
			return null;
		})() ??
		undefined;

	// If destination data not found in separate fields, try compound beneficiary
	let destinationCedula =
		extractFieldFromForms(forms, destCedulaLabels, (v) => extractCedula(v)) ??
		findValueNearLabel(layoutLines, destCedulaLabels, CEDULA_PREFIXED) ??
		(() => {
			for (const line of layoutLines) {
				if (fuzzyMatchLabel(line, destCedulaLabels)) {
					const after = line.replace(/^[^:]+:\s*/, "");
					const m = after.match(CEDULA_PREFIXED);
					if (m)
						return m[0].replace(/\s+/g, "").replace(/([VEJG])-?(\d+)/, "$1-$2");
				}
			}
			return null;
		})() ??
		// For bare cedulas near identification labels
		(() => {
			const labelsForBare = ["identificación", "identificacion"];
			return findValueNearLabel(layoutLines, labelsForBare, /\d{6,10}/);
		})() ??
		undefined;

	let destinationBank =
		extractFieldFromForms(forms, destBankLabels, (v) => {
			const stripped = stripBankCode(v);
			return matchBank(stripped) ?? matchBank(v);
		}) ??
		(() => {
			const raw = findValueNearLabel(layoutLines, destBankLabels);
			if (!raw) return null;
			const stripped = stripBankCode(raw);
			return matchBank(stripped) ?? matchBank(raw);
		})() ??
		undefined;

	// If we're missing destination data, try compound beneficiary parsing
	const beneficiaryLabels = ["beneficiario", "beneficiario:"];
	if (!destinationPhone || !destinationCedula || !destinationBank) {
		// First try forms
		const formsCompoundValue = extractFieldFromForms(
			forms,
			beneficiaryLabels,
			(v) => v,
		);

		// Also scan layout lines near beneficiary label
		const layoutParsed = (() => {
			let found = false;
			const parts: string[] = [];
			for (let i = 0; i < layoutLines.length; i++) {
				if (fuzzyMatchLabel(layoutLines[i], beneficiaryLabels)) {
					found = true;
					continue;
				}
				if (found) {
					const line = layoutLines[i].trim();
					if (line.length > 0) parts.push(line);
					if (parts.length >= 4) break;
				}
			}
			return parts.length > 0 ? parts.join(" ") : null;
		})();

		// Merge: prefer forms, but augment with layout if needed
		const compoundValue = (() => {
			if (formsCompoundValue && layoutParsed) {
				return `${formsCompoundValue} ${layoutParsed}`;
			}
			return formsCompoundValue ?? layoutParsed;
		})();

		if (compoundValue) {
			const compound = parseCompoundBeneficiary(compoundValue);
			if (!destinationPhone && compound.phone)
				destinationPhone = compound.phone;
			if (!destinationCedula && compound.cedula)
				destinationCedula = compound.cedula;
			if (!destinationBank && compound.bank) destinationBank = compound.bank;
		}
	}

	// --- Origin data ---
	const originPhoneLabels = [
		"número celular de origen",
		"número de celular de origen",
		"numero celular de origen",
		"numero de celular de origen",
		"origen",
		"origen:",
	];

	const originBankLabels = ["banco emisor", "banco origen", "banco de origen"];

	let originPhone: string | undefined =
		extractFieldFromForms(forms, originPhoneLabels, (v) => extractPhone(v)) ??
		findValueNearLabel(layoutLines, originPhoneLabels, VZLA_PHONE) ??
		findValueNearLabel(layoutLines, originPhoneLabels, MASKED_PHONE) ??
		undefined;

	let originBank: string | undefined =
		extractFieldFromForms(forms, originBankLabels, (v) => {
			const stripped = stripBankCode(v);
			return matchBank(stripped) ?? matchBank(v);
		}) ??
		(() => {
			const raw = findValueNearLabel(layoutLines, originBankLabels);
			if (!raw) return null;
			const stripped = stripBankCode(raw);
			return matchBank(stripped) ?? matchBank(raw);
		})() ??
		undefined;

	// If "Origen:" value doesn't match a phone but bank match is missing, try bank match
	if (!originPhone && !originBank) {
		const origValue =
			extractFieldFromForms(forms, originPhoneLabels, (v) => v) ??
			findValueNearLabel(layoutLines, originPhoneLabels);
		if (origValue) {
			const phoneP = extractPhone(origValue);
			if (phoneP) {
				originPhone = phoneP;
			} else {
				const bankP = matchBank(origValue);
				if (bankP) originBank = bankP;
			}
		}
	}

	// --- Concept ---
	const conceptLabels = [
		"concepto",
		"concepto:",
		"concepte:",
		"descripción",
		"descripción:",
		"motivo",
		"detalle",
	];
	const concept =
		extractFieldFromForms(forms, conceptLabels, (v) => getCleanValue(v)) ??
		findValueNearLabel(layoutLines, conceptLabels) ??
		undefined;

	return {
		status: "VALID",
		extractedAt: new Date().toISOString(),
		totalScore,
		referenceNumber,
		date,
		amount,
		amountValue,
		originPhone,
		destinationPhone,
		destinationCedula,
		originBank,
		destinationBank,
		concept,
	};
}
