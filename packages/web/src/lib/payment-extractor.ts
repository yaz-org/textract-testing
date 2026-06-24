import "@tanstack/react-start/server-only";

import {
	AMOUNT_LABELS,
	BENEFICIARY_LABELS,
	CEDULA_PREFIXED,
	CONCEPT_LABELS,
	DATE_LABELS,
	DATE_PATTERN,
	DEBITED_ACCOUNT_LABELS,
	DEST_BANK_LABELS,
	DEST_CEDULA_LABELS,
	DEST_PHONE_LABELS,
	EMBEDDED_AMOUNT,
	extractCedula,
	extractPhone,
	findValueNearLabel,
	fuzzyMatchLabel,
	getCleanValue,
	isTpagoReceipt,
	MASKED_PHONE,
	matchBank,
	normalizeText,
	ORIGIN_BANK_LABELS,
	ORIGIN_PHONE_LABELS,
	parseCompoundBeneficiary,
	parseVzlaAmount,
	parseVzlaDate,
	REF_LABELS,
	SCORE_THRESHOLD,
	stripBankCode,
	VZLA_AMOUNT,
	VZLA_PHONE,
} from "./extractor-utils";
import type { PagoMovilPayment } from "./payment";
import type { TextractResult } from "./textract";

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

function scoreReceiptWithForms(
	allLines: string[],
	forms: { key: string; value: string }[],
): number {
	let score = 0;
	const allText = allLines.join(" ");
	const normalized = normalizeText(allText);

	const kwRegex =
		/pago\s*movil|pago\s*móvil|tpago|tpage|recibo|pagomovilbdv|pagomóvil/;
	if (kwRegex.test(normalized)) score += 3;

	const refFound =
		findValueNearLabel(allLines, REF_LABELS, /\d{6,15}/) ??
		extractFieldFromForms(forms, REF_LABELS, (v) => {
			const m = v.match(/\d{6,15}/);
			return m ? m[0] : null;
		});
	if (refFound) score += 3;

	if (VZLA_PHONE.test(allText) || MASKED_PHONE.test(allText)) score += 2;

	if (CEDULA_PREFIXED.test(allText)) score += 2;

	if (VZLA_AMOUNT.test(allText) || EMBEDDED_AMOUNT.test(allText)) score += 1;

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

	const totalScore = scoreReceiptWithForms(layoutLines, forms);

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

	const refFromForms = extractFieldFromForms(forms, REF_LABELS, (v) => {
		const m = v.match(/\d{6,15}/);
		return m ? m[0] : null;
	});
	const referenceNumber =
		refFromForms ??
		findValueNearLabel(layoutLines, REF_LABELS, /\d{6,15}/) ??
		"";

	// --- Amount ---
	let amountData: { text: string; value: number } | null = null;

	amountData =
		extractFieldFromForms(forms, AMOUNT_LABELS, (v) => parseVzlaAmount(v)) ??
		(() => {
			const raw = findValueNearLabel(layoutLines, AMOUNT_LABELS, VZLA_AMOUNT);
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
	const dateFromForms = extractFieldFromForms(forms, DATE_LABELS, (v) => {
		return parseVzlaDate(v);
	});
	const date =
		dateFromForms ??
		(() => {
			const raw = findValueNearLabel(layoutLines, DATE_LABELS, DATE_PATTERN);
			return raw ? parseVzlaDate(raw) : null;
		})() ??
		new Date().toISOString().split("T")[0];

	// --- Destination data ---
	let destinationPhone =
		extractFieldFromForms(forms, DEST_PHONE_LABELS, (v) => extractPhone(v)) ??
		findValueNearLabel(layoutLines, DEST_PHONE_LABELS, VZLA_PHONE) ??
		findValueNearLabel(layoutLines, DEST_PHONE_LABELS, MASKED_PHONE) ??
		(() => {
			for (const line of layoutLines) {
				if (fuzzyMatchLabel(line, DEST_PHONE_LABELS)) {
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

	let destinationCedula =
		extractFieldFromForms(forms, DEST_CEDULA_LABELS, (v) => extractCedula(v)) ??
		findValueNearLabel(layoutLines, DEST_CEDULA_LABELS, CEDULA_PREFIXED) ??
		(() => {
			for (const line of layoutLines) {
				if (fuzzyMatchLabel(line, DEST_CEDULA_LABELS)) {
					const after = line.replace(/^[^:]+:\s*/, "");
					const m = after.match(CEDULA_PREFIXED);
					if (m)
						return m[0].replace(/\s+/g, "").replace(/([VEJG])-?(\d+)/, "$1-$2");
				}
			}
			return null;
		})() ??
		(() => {
			const labelsForBare = ["identificación", "identificacion"];
			return findValueNearLabel(layoutLines, labelsForBare, /\d{6,10}/);
		})() ??
		undefined;

	let destinationBank =
		extractFieldFromForms(forms, DEST_BANK_LABELS, (v) => {
			const stripped = stripBankCode(v);
			return matchBank(stripped) ?? matchBank(v);
		}) ??
		(() => {
			const raw = findValueNearLabel(layoutLines, DEST_BANK_LABELS);
			if (!raw) return null;
			const stripped = stripBankCode(raw);
			return matchBank(stripped) ?? matchBank(raw);
		})() ??
		undefined;

	if (!destinationPhone || !destinationCedula || !destinationBank) {
		const formsCompoundValue = extractFieldFromForms(
			forms,
			BENEFICIARY_LABELS,
			(v) => v,
		);

		const layoutParsed = (() => {
			let found = false;
			const parts: string[] = [];
			for (let i = 0; i < layoutLines.length; i++) {
				if (fuzzyMatchLabel(layoutLines[i], BENEFICIARY_LABELS)) {
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
	let originPhone: string | undefined =
		extractFieldFromForms(forms, ORIGIN_PHONE_LABELS, (v) => extractPhone(v)) ??
		findValueNearLabel(layoutLines, ORIGIN_PHONE_LABELS, VZLA_PHONE, 2) ??
		findValueNearLabel(layoutLines, ORIGIN_PHONE_LABELS, MASKED_PHONE, 2) ??
		undefined;

	let originBank: string | undefined =
		extractFieldFromForms(forms, ORIGIN_BANK_LABELS, (v) => {
			const stripped = stripBankCode(v);
			return matchBank(stripped) ?? matchBank(v);
		}) ??
		(() => {
			const raw = findValueNearLabel(layoutLines, ORIGIN_BANK_LABELS);
			if (!raw) return null;
			const stripped = stripBankCode(raw);
			return matchBank(stripped) ?? matchBank(raw);
		})() ??
		undefined;

	if (!originPhone && !originBank) {
		const origValue =
			extractFieldFromForms(forms, ORIGIN_PHONE_LABELS, (v) => v) ??
			findValueNearLabel(layoutLines, ORIGIN_PHONE_LABELS);
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

	if (!originBank) {
		const debitedValue = findValueNearLabel(
			layoutLines,
			DEBITED_ACCOUNT_LABELS,
		);
		if (debitedValue) {
			const bank = matchBank(debitedValue);
			if (bank) originBank = bank;
		}
	}

	if (!originBank && isTpagoReceipt(layoutLines)) {
		originBank = "0105";
	}

	if (!originBank) {
		for (const line of layoutLines) {
			const bank = matchBank(line);
			if (bank) {
				originBank = bank;
				break;
			}
		}
	}

	// --- Concept ---
	const concept =
		extractFieldFromForms(forms, CONCEPT_LABELS, (v) => getCleanValue(v)) ??
		findValueNearLabel(layoutLines, CONCEPT_LABELS) ??
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
