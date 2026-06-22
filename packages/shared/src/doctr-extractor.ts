import type { PagoMovilPayment } from "./payment";
import {
  AMOUNT_LABELS,
  BENEFICIARY_LABELS,
  CEDULA_PREFIXED,
  CONCEPT_LABELS,
  DATE_LABELS,
  DATE_PATTERN,
  DEST_BANK_LABELS,
  DEST_CEDULA_LABELS,
  DEST_PHONE_LABELS,
  extractCedula,
  extractPhone,
  extractPhoneDigitsOnly,
  extractPhoneLoose,
  findValueNearLabel,
  fuzzyMatchLabel,
  INTL_PHONE,
  LOOSE_PHONE,
  MASKED_PHONE,
  matchBank,
  ORIGIN_BANK_LABELS,
  ORIGIN_PHONE_LABELS,
  parseVzlaAmount,
  parseVzlaDate,
  REF_LABELS,
  SCORE_THRESHOLD,
  scoreReceipt,
  stripBankCode,
  VZLA_AMOUNT,
  VZLA_PHONE,
} from "./extractor-utils";

export function extractDocTRPayment(allLines: string[]): PagoMovilPayment {
  const totalScore = scoreReceipt(allLines);

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

  let referenceNumber = findValueNearLabel(allLines, REF_LABELS, /\d{6,15}/) ?? "";
  if (!referenceNumber) {
    for (const line of allLines) {
      const m = line.match(/\d{8,15}/);
      if (m) {
        const candidate = m[0];
        if (/0(?:412|414|416|424|426)\d{7}$/.test(candidate)) continue;
        referenceNumber = candidate;
        break;
      }
    }
  }

  let amountData: { text: string; value: number } | null = null;

  const rawAmount = findValueNearLabel(allLines, AMOUNT_LABELS, VZLA_AMOUNT);
  if (rawAmount) {
    amountData = parseVzlaAmount(rawAmount);
  }
  if (!amountData) {
    const candidates: { text: string; value: number }[] = [];
    for (const line of allLines) {
      const ad = parseVzlaAmount(line);
      if (ad) candidates.push(ad);
    }
    if (candidates.length > 0) {
      candidates.sort((a, b) => b.value - a.value);
      amountData = candidates[0];
    }
  }
  const amount = amountData?.text ?? "";
  const amountValue = amountData?.value ?? 0;

  let date: string | undefined = undefined;
  const rawDate = findValueNearLabel(allLines, DATE_LABELS, DATE_PATTERN);
  if (rawDate) {
    date = parseVzlaDate(rawDate);
  }

  if (!date) {
    for (const line of allLines) {
      const parsed = parseVzlaDate(line);
      if (parsed) {
        date = parsed;
        break;
      }
    }
  }

  let destinationPhone = findValueNearLabel(allLines, DEST_PHONE_LABELS, VZLA_PHONE);
  if (!destinationPhone) {
    destinationPhone = findValueNearLabel(allLines, DEST_PHONE_LABELS, MASKED_PHONE);
  }
  if (!destinationPhone) {
    for (const line of allLines) {
      if (fuzzyMatchLabel(line, DEST_PHONE_LABELS)) {
        const after = line.replace(/^[^:]+:\s*/, "");
        const phone = extractPhone(after);
        if (phone) {
          destinationPhone = phone;
          break;
        }
      }
    }
  }

  let destinationCedula: string | undefined;
  const rawCedula = findValueNearLabel(allLines, DEST_CEDULA_LABELS, CEDULA_PREFIXED);
  if (rawCedula) {
    destinationCedula = extractCedula(rawCedula) ?? undefined;
  }
  if (!destinationCedula) {
    for (const line of allLines) {
      if (fuzzyMatchLabel(line, DEST_CEDULA_LABELS)) {
        const after = line.replace(/^[^:]+:\s*/, "");
        const cedula = extractCedula(after);
        if (cedula) {
          destinationCedula = cedula;
          break;
        }
      }
    }
  }
  if (!destinationCedula) {
    const raw = findValueNearLabel(allLines, ["identificación", "identificacion"], /\d{6,10}/);
    if (raw) {
      destinationCedula = raw;
    }
  }
  if (!destinationCedula) {
    const idKeywords = ["identificacion", "identificación", "documento", "ci/rif", "cédula", "cedula"];
    for (const line of allLines) {
      const normalized = line.toLowerCase().replace(/[áàäâ]/g, "a").replace(/[éèëê]/g, "e").replace(/[íìïî]/g, "i").replace(/[óòöô]/g, "o").replace(/[úùüû]/g, "u").replace(/ñ/g, "n");
      if (idKeywords.some((kw) => normalized.includes(kw))) {
        const m = line.match(/\d{6,8}/);
        if (m) {
          destinationCedula = m[0];
          break;
        }
      }
    }
  }
  if (!destinationCedula) {
    for (const line of allLines) {
      const cedula = extractCedula(line);
      if (cedula) {
        destinationCedula = cedula;
        break;
      }
    }
  }

  let destinationBank: string | undefined;
  const rawDestBank = findValueNearLabel(allLines, DEST_BANK_LABELS);
  if (rawDestBank) {
    const stripped = stripBankCode(rawDestBank);
    destinationBank = matchBank(stripped) ?? matchBank(rawDestBank) ?? undefined;
  }

  if (!destinationPhone || !destinationCedula || !destinationBank) {
    const compoundParts: string[] = [];
    for (let i = 0; i < allLines.length; i++) {
      const isBeneficiary =
          fuzzyMatchLabel(allLines[i], BENEFICIARY_LABELS) ||
          (i > 0 && fuzzyMatchLabel(allLines[i - 1], BENEFICIARY_LABELS)) ||
          (i > 1 && fuzzyMatchLabel(allLines[i - 2], BENEFICIARY_LABELS));
      if (isBeneficiary && !fuzzyMatchLabel(allLines[i], BENEFICIARY_LABELS)) {
        const line = allLines[i].trim();
        if (line.length > 0) compoundParts.push(line);
        if (compoundParts.length >= 4) break;
      }
    }
    const compound = compoundParts.length > 0 ? compoundParts.join(" ") : null;
    if (compound) {
      if (!destinationPhone) {
        destinationPhone = extractPhone(compound) ?? extractPhoneLoose(compound) ?? extractPhoneDigitsOnly(compound);
      }
      if (!destinationCedula) {
        destinationCedula = extractCedula(compound) ?? undefined;
      }
      if (!destinationBank) {
        destinationBank = matchBank(compound) ?? undefined;
      }
    }
  }

  if (!destinationBank) {
    for (const line of allLines) {
      const bank = matchBank(line);
      if (bank) {
        destinationBank = bank;
        break;
      }
    }
  }

  if (!destinationPhone) {
    const allText = allLines.join(" ");
    const hasPhone = VZLA_PHONE.test(allText) || MASKED_PHONE.test(allText) || LOOSE_PHONE.test(allText) || INTL_PHONE.test(allText);
    if (hasPhone) {
      for (const line of allLines) {
        const phone = extractPhone(line);
        if (phone) {
          destinationPhone = phone;
          break;
        }
      }
      if (!destinationPhone) {
        for (const line of allLines) {
          const phone = extractPhoneLoose(line);
          if (phone) {
            destinationPhone = phone;
            break;
          }
        }
      }
      if (!destinationPhone) {
        for (const line of allLines) {
          const m = line.match(INTL_PHONE);
          if (m) {
            destinationPhone = "0" + m[0].slice(2);
            break;
          }
        }
      }
      if (!destinationPhone) {
        for (const line of allLines) {
          const phone = extractPhoneDigitsOnly(line);
          if (phone) {
            destinationPhone = phone;
            break;
          }
        }
      }
    }
  }

  let originPhone = findValueNearLabel(allLines, ORIGIN_PHONE_LABELS, VZLA_PHONE) ?? undefined;
  if (!originPhone) {
    originPhone = findValueNearLabel(allLines, ORIGIN_PHONE_LABELS, MASKED_PHONE) ?? undefined;
  }

  let originBank: string | undefined;
  const rawOriginBank = findValueNearLabel(allLines, ORIGIN_BANK_LABELS);
  if (rawOriginBank) {
    const stripped = stripBankCode(rawOriginBank);
    originBank = matchBank(stripped) ?? matchBank(rawOriginBank) ?? undefined;
  }

  if (!originPhone && !originBank) {
    const origValue = findValueNearLabel(allLines, ORIGIN_PHONE_LABELS);
    if (origValue) {
      const phone = extractPhone(origValue);
      if (phone) {
        originPhone = phone;
      } else {
        originBank = matchBank(origValue) ?? undefined;
      }
    }
  }

  const concept = findValueNearLabel(allLines, CONCEPT_LABELS) ?? undefined;

  return {
    status: "VALID",
    extractedAt: new Date().toISOString(),
    totalScore,
    referenceNumber,
    date,
    amount,
    amountValue,
    originPhone,
    destinationPhone: destinationPhone ?? undefined,
    destinationCedula: destinationCedula ?? undefined,
    originBank,
    destinationBank,
    concept,
  };
}
