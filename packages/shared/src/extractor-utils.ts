import { _BANKS } from "./banks";

const ACCENT_MAP: Record<string, string> = {
  "á": "a", "à": "a", "ä": "a", "â": "a",
  "é": "e", "è": "e", "ë": "e", "ê": "e",
  "í": "i", "ì": "i", "ï": "i", "î": "i",
  "ó": "o", "ò": "o", "ö": "o", "ô": "o",
  "ú": "u", "ù": "u", "ü": "u", "û": "u",
  "ñ": "n",
};

export function normalizeText(text: string): string {
  let t = text.toLowerCase();
  for (const [accented, plain] of Object.entries(ACCENT_MAP)) {
    t = t.replaceAll(accented, plain);
  }
  return t.replace(/\s+/g, " ").trim();
}

export function fuzzyMatchLabel(text: string, labels: string[]): boolean {
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

export function getCleanValue(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export function findValueNearLabel(
  lines: string[],
  labels: string[],
  valuePattern?: RegExp,
  maxDistance = 4,
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

export const VZLA_PHONE = /0(412|414|416|424|426)[\s-]?\d{7}/;
export const MASKED_PHONE = /0\d{1,3}\*[*\s-]*\d{0,4}/;
export const LOOSE_PHONE = /0(?:412|414|416|424|426)[\s.,/-]*\d[\s.,/-]*\d[\s.,/-]*\d[\s.,/-]*\d[\s.,/-]*\d[\s.,/-]*\d[\s.,/-]*\d/;
export const INTL_PHONE = /5841[246]\d{7}/;
export const CEDULA_PREFIXED = /[VEJG]\s*[-]?\s*(?:\d{1,3}\.)*\d{3,}/i;
export const VZLA_AMOUNT = /(?:Bs?\.?\s*)?((?:\d{1,3}\.\d{3}[,]\d{2})|\d{3,}[,]\d{2})(?:\s*Bs)?/i;
export const EMBEDDED_AMOUNT = /(?:Realizaste\s+(?:un\s+)?(?:Pago\s+Móvil|transacción)\s+de\s+Bs\.?\s*)((?:\d{1,3}\.\d{3}[,]\d{2})|\d{3,}[,]\d{2})/i;
export const DATE_PATTERN = /\d{1,2}\/\d{1,2}\/\d{2,4}/;
export const TIME_PATTERN = /\d{1,2}:\d{2}(?::\d{2})?\s*(AM|PM|am|pm)?/;
export const BANK_CODE_PREFIX = /^\d{4}\s*[-:.]?\s*/;

export function extractPhone(text: string): string | null {
  const m = text.match(VZLA_PHONE);
  if (m) return m[0];
  const mm = text.match(MASKED_PHONE);
  if (mm) return mm[0];
  return null;
}

export function extractPhoneLoose(text: string): string | null {
  const m = text.match(LOOSE_PHONE);
  if (!m) return null;
  const digits = m[0].replace(/[^\d]/g, "");
  return `${digits.slice(0, 4)}-${digits.slice(4)}`;
}

export function extractPhoneDigitsOnly(text: string): string | null {
  const digits = text.replace(/[^\d]/g, "");
  const m = digits.match(/(0(?:412|414|416|424|426))(\d{6,8})/);
  if (!m) return null;
  const raw = m[1] + m[2];
  return `${raw.slice(0, 4)}-${raw.slice(4)}`;
}

export function extractCedula(text: string): string | null {
  const m = text.match(CEDULA_PREFIXED);
  if (!m) return null;
  const cleaned = m[0].replace(/\s+/g, "").replace(/\./g, "");
  const digits = cleaned.replace(/[^\d]/g, "");
  if (digits.length < 5 || digits.length > 12) return null;
  const prefix = cleaned.match(/[VEJG]/i)?.[0].toUpperCase() ?? "";
  return `${prefix}-${digits}`;
}

export function parseVzlaAmount(text: string): { text: string; value: number } | null {
  const m = text.match(/((?:\d{1,3}\.\d{3}[,]\d{2})|\d{3,}[,]\d{2})/);
  if (!m) return null;
  const raw = m[1];
  if (raw.includes(".")) {
    const numeric = raw.replace(/\./g, "").replace(",", ".");
    const value = Number.parseFloat(numeric);
    if (Number.isNaN(value)) return null;
    return { text: raw, value };
  }
  const numeric = raw.replace(",", ".");
  const value = Number.parseFloat(numeric);
  if (Number.isNaN(value)) return null;
  return { text: raw, value };
}

export function parseVzlaDate(text: string): string | undefined {
  const dateMatch = text.match(DATE_PATTERN);
  if (!dateMatch) return undefined;
  const raw = dateMatch[0];
  const parts = raw.split("/");
  const day = Number.parseInt(parts[0], 10);
  const month = Number.parseInt(parts[1], 10) - 1;
  let year = Number.parseInt(parts[2], 10);
  if (year < 100) year += 2000;
  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) return undefined;

  const date = new Date(year, month, day);

  const timeMatch = text.match(TIME_PATTERN);
  if (timeMatch) {
    return `${date.toISOString().split("T")[0]}T${timeMatch[0]}`;
  }

  return date.toISOString().split("T")[0];
}

export function matchBank(text: string): string | null {
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

export function stripBankCode(text: string): string {
  return text.replace(BANK_CODE_PREFIX, "").trim();
}

export const REF_LABELS = [
  "referencia", "nro. de referencia", "nro referencia",
  "numero de referencia", "número de referencia", "ref.",
  "operacion", "operación", "comprobante", "nro", "n°",
];

export const AMOUNT_LABELS = [
  "monto", "monto de la operación", "monto (bs.)", "monte (bs.)",
  "total", "importe",
];

export const DATE_LABELS = [
  "fecha", "fecha y hora del envío", "fecha y hora del envio",
  "fecha y hero del envio", "fecha y hora",
];

export const DEST_PHONE_LABELS = [
  "número celular de destino", "número de celular de destino",
  "numero celular de destino", "numero de celular de destino",
  "telf beneficiario", "telf beneficiario:", "beneficiario", "beneficiario:",
  "destino", "destino:", "número de teléfono", "numero de telefono",
  "número de teléfono:",
];

export const DEST_CEDULA_LABELS = [
  "identificación receptor", "identificacion receptor", "identificación",
  "identificacion", "identificación:", "documento de identidad",
  "documento de identidad:", "decumento de identidad:",
  "ci/rif beneficiario", "ci /rif beneficiario", "ci/rif beneficiario:",
  "ci /rif beneficiario:", "cédula de identidad / rif",
  "cedula de identidad / rif", "cédula de identidad / rif:",
  "ci/rif:", "ci /rif:", "cédula:", "cedula:", "documento:",
  "identificación del receptor", "identificacion del receptor",
];

export const DEST_BANK_LABELS = [
  "banco receptor", "banco destino", "banco destino:",
  "bance destine:", "banco", "banco:",
];

export const BENEFICIARY_LABELS = ["beneficiario", "beneficiario:"];

export const ORIGIN_PHONE_LABELS = [
  "número celular de origen", "número de celular de origen",
  "numero celular de origen", "numero de celular de origen",
  "origen", "origen:",
];

export const ORIGIN_BANK_LABELS = ["banco emisor", "banco origen", "banco de origen"];

export const CONCEPT_LABELS = [
  "concepto", "concepto:", "concepte:", "descripción",
  "descripción:", "motivo", "detalle",
];

export const SCORE_THRESHOLD = 4;

export function scoreReceipt(allLines: string[]): number {
  let score = 0;
  const allText = allLines.join(" ");
  const normalized = normalizeText(allText);

  const kwRegex = /pago\s*movil|pago\s*móvil|tpago|tpage|recibo|pagomovilbdv|pagomóvil/;
  if (kwRegex.test(normalized)) score += 3;

  const refFound = findValueNearLabel(allLines, REF_LABELS, /\d{6,15}/);
  if (refFound) score += 3;

  if (VZLA_PHONE.test(allText) || MASKED_PHONE.test(allText) || LOOSE_PHONE.test(allText)) score += 2;

  if (CEDULA_PREFIXED.test(allText)) score += 2;

  const bankFound = _BANKS.some((bank) => {
    const n = normalizeText(allText);
    if (n.includes(normalizeText(bank.shortName))) return true;
    if (n.includes(normalizeText(bank.fullName))) return true;
    if (n.includes(normalizeText(bank.bankCode))) return true;
    return bank.alternativeNames.some((a) => n.includes(normalizeText(a)));
  });
  if (bankFound) score += 1;

  if (VZLA_AMOUNT.test(allText) || EMBEDDED_AMOUNT.test(allText)) score += 1;

  const successRegex = /operación\s*exitosa|operacion\s*exitosa|operación\s*en\s*proceso|pago\s*exitoso|comprobante\s*de\s*pago|resumen\s*pago|transacción\s*exitosa|realizaste\s*un\s*pago|tu\s*pago\s*móvil\s*fue\s*exitoso/;
  if (successRegex.test(normalized)) score += 1;

  return score;
}

export function parseCompoundBeneficiary(text: string): {
  phone?: string;
  cedula?: string;
  bank?: string;
} {
  const result: { phone?: string; cedula?: string; bank?: string } = {};
  const phone = extractPhone(text);
  if (phone) result.phone = phone;
  const cedula = extractCedula(text);
  if (cedula) result.cedula = cedula;
  const bank = matchBank(text);
  if (bank) result.bank = bank;
  return result;
}
