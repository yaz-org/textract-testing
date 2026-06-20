"""
Validate docTR OCR against Pago Móvil payment receipt screenshots.

Runs docTR with the recommended model config on a sample of images
from exports/dream-team-images, extracts structured payment fields,
and prints a comparison table.

Usage:
    uv run validate_doctr.py

Environment variables:
    IMAGES_DIR: override the images directory path (default: ../exports/dream-team-images)
    SAMPLE_SIZE: number of images to process (0 = all, default: 0)
    DOCTR_NUM_THREADS: PyTorch CPU thread limit (0 = no cap, default: 0)
    MAX_WORKERS: parallel worker processes (0 = sequential, default: 0)
"""

from __future__ import annotations

import json
import os
import re
import time
from concurrent.futures import ProcessPoolExecutor, as_completed
from dataclasses import dataclass
from multiprocessing import cpu_count
from pathlib import Path
from typing import Any

import torch
from doctr.io import DocumentFile
from doctr.models import ocr_predictor
from rich.console import Console
from rich.table import Table

console = Console(width=180)  # prevent column truncation for wide tables

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

_SCRIPT_DIR = Path(__file__).resolve().parent
IMAGES_DIR = Path(os.getenv("IMAGES_DIR", str(_SCRIPT_DIR / "../../exports/dream-team-images"))).resolve()
SAMPLE_SIZE = int(os.getenv("SAMPLE_SIZE", "0"))
SCORE_THRESHOLD = 4  # minimum score to consider a valid pago móvil receipt
DOCTR_NUM_THREADS = int(os.getenv("DOCTR_NUM_THREADS", "0"))  # 0 = no cap
MAX_WORKERS = int(os.getenv("MAX_WORKERS", "0"))  # 0 = sequential (default for validation)

# ---------------------------------------------------------------------------
# Venezuelan bank registry (ported from packages/web/src/lib/banks.ts)
# ---------------------------------------------------------------------------

VENEZUELAN_BANKS: list[dict[str, Any]] = [
    {"bankCode": "0102", "acronym": "BDV", "shortName": "Banco de Venezuela", "fullName": "Banco de Venezuela, S.A. Banco Universal", "alternativeNames": ["Banco Comercial de Caracas"]},
    {"bankCode": "0104", "acronym": "BVC", "shortName": "Venezolano de Crédito", "fullName": "Venezolano de Crédito, S.A. Banco Universal", "alternativeNames": ["Banco Venezolano de Crédito"]},
    {"bankCode": "0105", "acronym": "Mercantil", "shortName": "Mercantil", "fullName": "Mercantil Banco, C.A. Banco Universal", "alternativeNames": ["Banco Mercantil y Agrícola"]},
    {"bankCode": "0108", "acronym": "Provincial", "shortName": "BBVA Provincial", "fullName": "BBVA Provincial, S.A. Banco Universal", "alternativeNames": ["Banco Provincial"]},
    {"bankCode": "0114", "acronym": "Bancaribe", "shortName": "Bancaribe", "fullName": "Bancaribe C.A. Banco Universal", "alternativeNames": ["Banco del Caribe"]},
    {"bankCode": "0115", "acronym": "Exterior", "shortName": "Banco Exterior", "fullName": "Banco Exterior C.A. Banco Universal", "alternativeNames": ["Exterior"]},
    {"bankCode": "0128", "acronym": "Caroní", "shortName": "Banco Caroní", "fullName": "Banco Caroní, C.A. Banco Universal", "alternativeNames": []},
    {"bankCode": "0134", "acronym": "Banesco", "shortName": "Banesco", "fullName": "Banesco Banco Universal, S.A.C.A.", "alternativeNames": ["Banco Agroindustrial Venezolano"]},
    {"bankCode": "0137", "acronym": "Sofitasa", "shortName": "Banco Sofitasa", "fullName": "Banco Sofitasa, Banco Universal, C.A.", "alternativeNames": ["Sociedad Financiera del Táchira"]},
    {"bankCode": "0138", "acronym": "Plaza", "shortName": "Banco Plaza", "fullName": "Banco Plaza, Banco Universal, C.A.", "alternativeNames": []},
    {"bankCode": "0146", "acronym": "Bangente", "shortName": "Bangente", "fullName": "Banco de la Gente Emprendedora, C.A.", "alternativeNames": []},
    {"bankCode": "0151", "acronym": "BFC", "shortName": "Banco Fondo Común", "fullName": "BFC Banco Fondo Común, C.A. Banco Universal", "alternativeNames": ["Fondo Común Entidad de Ahorro y Préstamo"]},
    {"bankCode": "0156", "acronym": "100%Banco", "shortName": "100% Banco", "fullName": "100% Banco, Banco Universal, C.A.", "alternativeNames": ["Financiera de Lara"]},
    {"bankCode": "0157", "acronym": "Delsur", "shortName": "Delsur", "fullName": "Delsur Banco Universal, C.A.", "alternativeNames": ["Del Sur Entidad de Ahorro y Préstamo"]},
    {"bankCode": "0163", "acronym": "Tesoro", "shortName": "Banco del Tesoro", "fullName": "Banco del Tesoro, C.A. Banco Universal", "alternativeNames": []},
    {"bankCode": "0166", "acronym": "BAV", "shortName": "Banco Agrícola", "fullName": "Banco Agrícola de Venezuela, C.A. Banco Universal", "alternativeNames": ["Banco Agrícola de Venezuela"]},
    {"bankCode": "0168", "acronym": "Bancrecer", "shortName": "Bancrecer", "fullName": "Bancrecer, S.A. Banco Microfinanciero", "alternativeNames": ["Bancrecer, S.A. Banco de Desarrollo"]},
    {"bankCode": "0169", "acronym": "R4", "shortName": "R4 Banco Microfinanciero", "fullName": "R4, Banco Microfinanciero C.A.", "alternativeNames": ["Mi Banco", "Mi Banco, Banco de Desarrollo C.A."]},
    {"bankCode": "0171", "acronym": "Activo", "shortName": "Banco Activo", "fullName": "Banco Activo, C.A. Banco Universal", "alternativeNames": ["Banco Activo Banco Comercial"]},
    {"bankCode": "0172", "acronym": "Bancamiga", "shortName": "Bancamiga", "fullName": "Bancamiga, Banco Universal, C.A.", "alternativeNames": ["Bancamiga Banco Microfinanciero"]},
    {"bankCode": "0173", "acronym": "BID", "shortName": "Banco Internacional de Desarrollo", "fullName": "Banco Internacional de Desarrollo, C.A. Banco Universal", "alternativeNames": []},
    {"bankCode": "0174", "acronym": "Banplus", "shortName": "Banplus", "fullName": "Banplus Banco Universal, C.A.", "alternativeNames": ["Banplus Banco Comercial"]},
    {"bankCode": "0175", "acronym": "BDT", "shortName": "Banco Digital de los Trabajadores", "fullName": "Banco Digital de los Trabajadores, Banco Universal C.A.", "alternativeNames": ["Banco Bicentenario del Pueblo", "Banco Bicentenario", "Banfoandes", "Confederado", "Central", "Bolívar Banco"]},
    {"bankCode": "0177", "acronym": "BANFANB", "shortName": "BANFANB", "fullName": "Banco de la Fuerza Armada Nacional Bolivariana, Banco Universal, C.A.", "alternativeNames": []},
    {"bankCode": "0178", "acronym": "N58", "shortName": "N58 Banco Digital", "fullName": "N58 Banco Digital, S.A. Banco Microfinanciero", "alternativeNames": []},
    {"bankCode": "0191", "acronym": "BNC", "shortName": "BNC", "fullName": "Banco Nacional de Crédito, C.A. Banco Universal", "alternativeNames": ["BOD", "Banco Occidental de Descuento", "Stanford Bank"]},
    {"bankCode": "0601", "acronym": "IMCP", "shortName": "Crédito Popular", "fullName": "Instituto Municipal de Crédito Popular", "alternativeNames": []},
]

# ---------------------------------------------------------------------------
# Text normalization (ported from payment-extractor.ts:9-20)
# ---------------------------------------------------------------------------

_ACCENT_MAP = {
    "á": "a", "à": "a", "ä": "a", "â": "a",
    "é": "e", "è": "e", "ë": "e", "ê": "e",
    "í": "i", "ì": "i", "ï": "i", "î": "i",
    "ó": "o", "ò": "o", "ö": "o", "ô": "o",
    "ú": "u", "ù": "u", "ü": "u", "û": "u",
    "ñ": "n",
}


def normalize_text(text: str) -> str:
    text = text.lower()
    for accented, plain in _ACCENT_MAP.items():
        text = text.replace(accented, plain)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


# ---------------------------------------------------------------------------
# Regex patterns
# ---------------------------------------------------------------------------

VZLA_PHONE = re.compile(r"0(412|414|416|424|426)[\s-]?\d{7}")
MASKED_PHONE = re.compile(r"0\d{1,3}\*[*\s-]*\d{0,4}")
LOOSE_PHONE = re.compile(
    r"0(?:412|414|416|424|426)[\s.-]*\d[\s.-]*\d[\s.-]*\d[\s.-]*\d[\s.-]*\d[\s.-]*\d[\s.-]*\d"
)
CEDULA_PREFIXED = re.compile(r"[VEJG]\s*[-]?\s*\d{5,10}", re.IGNORECASE)
VZLA_AMOUNT = re.compile(r"(?:Bs?\.?\s*)?((?:\d{1,3}\.\d{3}[,]\d{2})|\d{3,}[,]\d{2})(?:\s*Bs)?", re.IGNORECASE)
EMBEDDED_AMOUNT = re.compile(
    r"(?:Realizaste\s+(?:un\s+)?(?:Pago\s+Móvil|transacción)\s+de\s+Bs\.?\s*)((?:\d{1,3}\.\d{3}[,]\d{2})|\d{3,}[,]\d{2})",
    re.IGNORECASE,
)
DATE_PATTERN = re.compile(r"\d{1,2}/\d{1,2}/\d{2,4}")
TIME_PATTERN = re.compile(r"\d{1,2}:\d{2}(?::\d{2})?\s*(AM|PM|am|pm)?")
BANK_CODE_PREFIX = re.compile(r"^\d{4}\s*[-:.]?\s*")

# ---------------------------------------------------------------------------
# Field extractors (ported from payment-extractor.ts)
# ---------------------------------------------------------------------------


def get_clean_value(value: str) -> str:
    return value.strip().replace(r"\s+", " ")


def fuzzy_match_label(text: str, labels: list[str]) -> bool:
    t = normalize_text(text)
    t_no_colon = t.rstrip(":")
    for label in labels:
        nl = normalize_text(label)
        if t_no_colon == nl:
            return True
        if " " not in nl:
            continue
        label_words = nl.split()
        text_words = t_no_colon.split()
        ti = 0
        for lw in label_words:
            while ti < len(text_words) and text_words[ti] != lw:
                ti += 1
            if ti >= len(text_words):
                break
            ti += 1
        else:
            return True
    return False


def find_value_near_label(
    lines: list[str],
    labels: list[str],
    value_pattern: re.Pattern[str] | None = None,
    max_distance: int = 4,
) -> str | None:
    for i, line in enumerate(lines):
        if fuzzy_match_label(line, labels):
            for j in range(1, max_distance + 1):
                idx = i + j
                if idx >= len(lines):
                    break
                candidate = get_clean_value(lines[idx])
                if value_pattern:
                    m = value_pattern.search(candidate)
                    if m:
                        return m.group(0)
                else:
                    return candidate
    return None


def extract_phone(text: str) -> str | None:
    m = VZLA_PHONE.search(text)
    if m:
        return m.group(0)
    m = MASKED_PHONE.search(text)
    if m:
        return m.group(0)
    return None


def extract_phone_loose(text: str) -> str | None:
    m = LOOSE_PHONE.search(text)
    if m:
        raw = m.group(0)
        digits = re.sub(r"[^\d]", "", raw)
        return f"{digits[:4]}-{digits[4:]}"
    return None


def extract_cedula(text: str) -> str | None:
    m = CEDULA_PREFIXED.search(text)
    if m:
        raw = m.group(0)
        raw = re.sub(r"\s+", "", raw)
        raw = re.sub(r"([VEJG])-?(\d+)", r"\1-\2", raw)
        return raw
    return None


def extract_amount_value(text: str) -> tuple[str, float] | None:
    # First try: thousands-separator format (e.g. 3.533,00)
    m = re.search(r"(\d{1,3}\.\d{3}[,]\d{2})", text)
    if m:
        raw = m.group(1)
        numeric = raw.replace(".", "").replace(",", ".")
        try:
            return (raw, float(numeric))
        except ValueError:
            pass
    # Fallback: any decimal amount with at least 2 digits before comma
    m = re.search(r"(\d{3,}[,]\d{2})", text)
    if not m:
        return None
    raw = m.group(1)
    numeric = raw.replace(",", ".")
    try:
        value = float(numeric)
    except ValueError:
        return None
    return (raw, value)


def parse_vzla_date(text: str) -> str | None:
    date_match = DATE_PATTERN.search(text)
    if not date_match:
        return None
    raw = date_match.group(0)
    parts = raw.split("/")
    day = int(parts[0])
    month = int(parts[1]) - 1
    year = int(parts[2])
    if year < 100:
        year += 2000
    from datetime import datetime

    try:
        date = datetime(year, month + 1, day)
    except ValueError:
        return None

    time_match = TIME_PATTERN.search(text)
    if time_match:
        time_str = time_match.group(0)
        return f"{date.strftime('%Y-%m-%d')}T{time_str}"
    return date.strftime("%Y-%m-%d")


def match_bank(text: str) -> str | None:
    normalized = normalize_text(text)
    for bank in VENEZUELAN_BANKS:
        candidates = [bank["shortName"], bank["fullName"], bank["acronym"]] + bank["alternativeNames"]
        for candidate in candidates:
            if normalize_text(candidate) in normalized:
                return bank["shortName"]
        if normalize_text(bank["bankCode"]) in normalized:
            return bank["shortName"]
    return None


def strip_bank_code(text: str) -> str:
    return BANK_CODE_PREFIX.sub("", text).strip()


# ---------------------------------------------------------------------------
# Label groups
# ---------------------------------------------------------------------------

REF_LABELS = [
    "referencia", "nro. de referencia", "nro referencia",
    "numero de referencia", "número de referencia", "ref.",
    "operacion", "operación", "comprobante",
]

AMOUNT_LABELS = [
    "monto", "monto de la operación", "monto (bs.)", "monte (bs.)",
    "total", "importe",
]

DATE_LABELS = [
    "fecha", "fecha y hora del envío", "fecha y hora del envio",
    "fecha y hero del envio", "fecha y hora",
]

DEST_PHONE_LABELS = [
    "número celular de destino", "número de celular de destino",
    "numero celular de destino", "numero de celular de destino",
    "telf beneficiario", "telf beneficiario:", "beneficiario", "beneficiario:",
    "destino", "destino:", "número de teléfono", "numero de telefono",
    "número de teléfono:",
]

DEST_CEDULA_LABELS = [
    "identificación receptor", "identificacion receptor", "identificación",
    "identificacion", "identificación:", "documento de identidad",
    "documento de identidad:", "decumento de identidad:",
    "ci/rif beneficiario", "ci /rif beneficiario", "ci/rif beneficiario:",
    "ci /rif beneficiario:", "cédula de identidad / rif",
    "cedula de identidad / rif", "cédula de identidad / rif:",
    "ci/rif:", "ci /rif:", "cédula:", "cedula:", "documento:",
    "identificación del receptor", "identificacion del receptor",
]

DEST_BANK_LABELS = [
    "banco receptor", "banco destino", "banco destino:",
    "bance destine:", "banco", "banco:",
]

BENEFICIARY_LABELS = ["beneficiario", "beneficiario:"]

ORIGIN_PHONE_LABELS = [
    "número celular de origen", "número de celular de origen",
    "numero celular de origen", "numero de celular de origen",
    "origen", "origen:",
]

ORIGIN_BANK_LABELS = ["banco emisor", "banco origen", "banco de origen"]

CONCEPT_LABELS = [
    "concepto", "concepto:", "concepte:", "descripción",
    "descripción:", "motivo", "detalle",
]

# ---------------------------------------------------------------------------
# Receipt scorer (ported from payment-extractor.ts:191-251)
# ---------------------------------------------------------------------------


def score_receipt(all_lines: list[str]) -> int:
    score = 0
    all_text = " ".join(all_lines)
    normalized = normalize_text(all_text)

    kw_regex = re.compile(
        r"pago\s*movil|pago\s*móvil|tpago|tpage|recibo|pagomovilbdv|pagomóvil"
    )
    if kw_regex.search(normalized):
        score += 3

    ref_found = find_value_near_label(all_lines, REF_LABELS, re.compile(r"\d{6,15}"))
    if ref_found:
        score += 3

    if VZLA_PHONE.search(all_text) or MASKED_PHONE.search(all_text) or LOOSE_PHONE.search(all_text):
        score += 2

    if CEDULA_PREFIXED.search(all_text):
        score += 2

    bank_found = match_bank(all_text)
    if bank_found:
        score += 1

    if VZLA_AMOUNT.search(all_text) or EMBEDDED_AMOUNT.search(all_text):
        score += 1

    success_regex = re.compile(
        r"operación\s*exitosa|operacion\s*exitosa|operación\s*en\s*proceso|"
        r"pago\s*exitoso|comprobante\s*de\s*pago|resumen\s*pago|"
        r"transacción\s*exitosa|realizaste\s*un\s*pago|"
        r"tu\s*pago\s*móvil\s*fue\s*exitoso"
    )
    if success_regex.search(normalized):
        score += 1

    return score


# ---------------------------------------------------------------------------
# Full extraction (ported from payment-extractor.ts:253-567)
# ---------------------------------------------------------------------------


@dataclass
class ExtractionResult:
    status: str = "INVALID"
    score: int = 0
    reference: str = ""
    amount: str = ""
    amount_value: float = 0.0
    date: str = ""
    phone: str | None = None
    cedula: str | None = None
    bank: str | None = None
    destination_phone: str | None = None
    destination_cedula: str | None = None
    destination_bank: str | None = None
    origin_phone: str | None = None
    origin_bank: str | None = None
    concept: str | None = None


def extract_all_fields(lines: list[str]) -> ExtractionResult:
    result = ExtractionResult()
    result.score = score_receipt(lines)

    if result.score < SCORE_THRESHOLD:
        return result

    # Reference
    ref = find_value_near_label(lines, REF_LABELS, re.compile(r"\d{6,15}"))
    if ref:
        result.reference = ref
    if not ref:
        # Fallback: scan all lines for an 8-15 digit number (skip phone numbers)
        for line in lines:
            m = re.search(r"\d{8,15}", line)
            if m:
                candidate = m.group(0)
                if re.match(r"0(?:412|414|416|424|426)\d{7}$", candidate):
                    continue
                result.reference = candidate
                break

    # Amount
    amount_data = None
    raw = find_value_near_label(lines, AMOUNT_LABELS, VZLA_AMOUNT)
    if raw:
        amount_data = extract_amount_value(raw)
    if not amount_data:
        candidates: list[tuple[str, float] | None] = []
        for line in lines:
            ad = extract_amount_value(line)
            if ad:
                candidates.append(ad)
        if candidates:
            candidates.sort(key=lambda x: x[1], reverse=True)
            amount_data = candidates[0]
    if amount_data:
        result.amount = amount_data[0]
        result.amount_value = amount_data[1]

    # Date
    raw = find_value_near_label(lines, DATE_LABELS, DATE_PATTERN)
    if raw:
        parsed = parse_vzla_date(raw)
        if parsed:
            result.date = parsed
    if not result.date:
        for line in lines:
            parsed = parse_vzla_date(line)
            if parsed:
                result.date = parsed
                break
    if not result.date:
        from datetime import datetime

        result.date = datetime.now().strftime("%Y-%m-%d")

    # Destination phone
    dest_phone = find_value_near_label(lines, DEST_PHONE_LABELS, VZLA_PHONE)
    if not dest_phone:
        dest_phone = find_value_near_label(lines, DEST_PHONE_LABELS, MASKED_PHONE)
    if not dest_phone:
        for line in lines:
            if fuzzy_match_label(line, DEST_PHONE_LABELS):
                after = re.sub(r"^[^:]+:\s*", "", line)
                phone = extract_phone(after)
                if phone:
                    dest_phone = phone
                    break
    result.destination_phone = dest_phone

    # Destination cedula
    dest_cedula = find_value_near_label(lines, DEST_CEDULA_LABELS, CEDULA_PREFIXED)
    if not dest_cedula:
        for line in lines:
            if fuzzy_match_label(line, DEST_CEDULA_LABELS):
                after = re.sub(r"^[^:]+:\s*", "", line)
                cedula = extract_cedula(after)
                if cedula:
                    dest_cedula = cedula
                    break
    if not dest_cedula:
        raw = find_value_near_label(lines, ["identificación", "identificacion"], re.compile(r"\d{6,10}"))
        if raw:
            dest_cedula = raw
    if not dest_cedula:
        # Fallback: scan for bare 6-8 digit numbers near ID-related keywords
        id_keywords = ["identificacion", "identificación", "documento", "ci/rif", "cédula", "cedula"]
        for line in lines:
            if any(kw in normalize_text(line) for kw in id_keywords):
                m = re.search(r"\d{6,8}", line)
                if m:
                    dest_cedula = m.group(0)
                    break
    if not dest_cedula:
        # Broader fallback: scan all lines for V/E/J/G-prefixed IDs
        for line in lines:
            cedula = extract_cedula(line)
            if cedula:
                dest_cedula = cedula
                break
    result.destination_cedula = dest_cedula

    # Destination bank
    raw = find_value_near_label(lines, DEST_BANK_LABELS)
    if raw:
        stripped = strip_bank_code(raw)
        dest_bank = match_bank(stripped) or match_bank(raw)
        result.destination_bank = dest_bank

    # Compound beneficiary fallback
    if not (dest_phone and dest_cedula and result.destination_bank):
        compound_parts = []
        for line in lines:
            if fuzzy_match_label(line, BENEFICIARY_LABELS):
                continue
            if len(compound_parts) > 0 or any(
                fuzzy_match_label(prev, BENEFICIARY_LABELS)
                for prev in lines[max(0, lines.index(line) - 2) : lines.index(line)]
            ):
                if line.strip():
                    compound_parts.append(line.strip())
                if len(compound_parts) >= 4:
                    break
        compound = " ".join(compound_parts) if compound_parts else None
        if compound:
            if not dest_phone:
                dest_phone = extract_phone(compound)
                if not dest_phone:
                    dest_phone = extract_phone_loose(compound)
                result.destination_phone = dest_phone
            if not dest_cedula:
                dest_cedula = extract_cedula(compound)
                result.destination_cedula = dest_cedula
            if not result.destination_bank:
                result.destination_bank = match_bank(compound)

    # All-lines bank fallback: scan every line for a bank name
    if not result.destination_bank:
        for line in lines:
            dest_bank = match_bank(line)
            if dest_bank:
                result.destination_bank = dest_bank
                break

    # General phone fallback: if a phone exists in the full text but wasn't labeled
    if not result.destination_phone:
        all_text = " ".join(lines)
        if VZLA_PHONE.search(all_text) or MASKED_PHONE.search(all_text) or LOOSE_PHONE.search(all_text):
            for line in lines:
                phone = extract_phone(line)
                if phone:
                    result.destination_phone = phone
                    break
            if not result.destination_phone:
                for line in lines:
                    phone = extract_phone_loose(line)
                    if phone:
                        result.destination_phone = phone
                        break

    # Origin phone
    origin_phone = find_value_near_label(lines, ORIGIN_PHONE_LABELS, VZLA_PHONE)
    if not origin_phone:
        origin_phone = find_value_near_label(lines, ORIGIN_PHONE_LABELS, MASKED_PHONE)
    result.origin_phone = origin_phone

    # Origin bank
    raw = find_value_near_label(lines, ORIGIN_BANK_LABELS)
    if raw:
        stripped = strip_bank_code(raw)
        origin_bank = match_bank(stripped) or match_bank(raw)
        result.origin_bank = origin_bank

    # Fallback: if no origin phone or bank, try matching on the raw value
    if not origin_phone and not result.origin_bank:
        orig_value = find_value_near_label(lines, ORIGIN_PHONE_LABELS)
        if orig_value:
            phone = extract_phone(orig_value)
            if phone:
                result.origin_phone = phone
            else:
                result.origin_bank = match_bank(orig_value)

    # Concept
    concept = find_value_near_label(lines, CONCEPT_LABELS)
    result.concept = concept

    result.status = "VALID"
    return result


# ---------------------------------------------------------------------------
# Confidence helper
# ---------------------------------------------------------------------------


def compute_average_confidence(result_doc) -> float | None:
    """Compute average word confidence from a docTR Document object."""
    confidences = []
    for page in result_doc.pages:
        for block in page.blocks:
            for line in block.lines:
                for word in line.words:
                    if word.confidence is not None:
                        confidences.append(word.confidence)
    if not confidences:
        return None
    return sum(confidences) / len(confidences)


# ---------------------------------------------------------------------------
# Model loading
# ---------------------------------------------------------------------------


def load_model():
    if DOCTR_NUM_THREADS > 0:
        torch.set_num_threads(DOCTR_NUM_THREADS)
        console.print(f"[dim]PyTorch threads capped at {DOCTR_NUM_THREADS} (DOCTR_NUM_THREADS)[/dim]")
    console.print("[bold]Loading docTR model...[/bold]")
    console.print("  Detection:      [cyan]db_mobilenet_v3_large[/cyan] (4.2M params)")
    console.print("  Recognition:    [cyan]crnn_mobilenet_v3_small[/cyan] (2.1M params)")
    console.print("  Assumptions:    straight pages, no orientation classification")
    console.print()

    model = ocr_predictor(
        det_arch="db_mobilenet_v3_large",
        reco_arch="crnn_mobilenet_v3_small",
        pretrained=True,
        assume_straight_pages=True,
        preserve_aspect_ratio=True,
        disable_page_orientation=True,
        disable_crop_orientation=True,
        det_bs=1,
    )

    console.print("[green]✓ Model loaded[/green]")

    # Warmup: dummy inference to trigger PyTorch JIT compilation
    console.print("  Warming up model...", end="")
    from PIL import Image
    from io import BytesIO
    buf = BytesIO()
    Image.new("RGB", (100, 100), "white").save(buf, format="JPEG")
    dummy = DocumentFile.from_images(buf.getvalue())
    model(dummy)
    console.print(" done")
    return model


# ---------------------------------------------------------------------------
# Multiprocessing worker
# ---------------------------------------------------------------------------


def process_batch(batch: list[Path]) -> list[dict]:
    """Process a batch of images in a worker process."""
    num_threads = int(os.getenv("DOCTR_NUM_THREADS", "0"))
    if num_threads > 0:
        torch.set_num_threads(num_threads)
    model = ocr_predictor(
        det_arch="db_mobilenet_v3_large",
        reco_arch="crnn_mobilenet_v3_small",
        pretrained=True,
        assume_straight_pages=True,
        preserve_aspect_ratio=True,
        disable_page_orientation=True,
        disable_crop_orientation=True,
        det_bs=1,
    )
    # Warmup
    from PIL import Image
    from io import BytesIO
    buf = BytesIO()
    Image.new("RGB", (100, 100), "white").save(buf, format="JPEG")
    dummy = DocumentFile.from_images(buf.getvalue())
    model(dummy)

    results: list[dict] = []
    for img_path in batch:
        entry: dict = {"path": img_path.name}
        try:
            doc = DocumentFile.from_images(str(img_path))
            start = time.time()
            result_doc = model(doc)
            elapsed = time.time() - start
            text_lines = result_doc.render().splitlines()
            text_lines = [t.strip() for t in text_lines if t.strip()]
            extraction = extract_all_fields(text_lines)
            avg_conf = compute_average_confidence(result_doc)
            entry.update({
                "elapsed": elapsed,
                "extraction": extraction,
                "avg_conf": avg_conf,
                "text_lines": text_lines,
            })
        except Exception as e:
            entry["error"] = str(e)
        results.append(entry)
    return results


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main():
    console.print()
    console.rule("[bold]docTR Validation — Pago Móvil Receipts[/bold]")
    console.print()

    # Directory check
    images_dir = IMAGES_DIR
    if not images_dir.exists():
        console.print(f"[red]✗ Images directory not found: {images_dir}[/red]")
        return

    ext_patterns = ("*.jpg", "*.jpeg", "*.png")
    all_images: list[Path] = []
    for ext in ext_patterns:
        all_images.extend(sorted(images_dir.glob(ext)))
    if not all_images:
        console.print(f"[red]✗ No images found in {images_dir}[/red]")
        return

    console.print(f"Found [cyan]{len(all_images)}[/cyan] images in [bold]{images_dir}[/bold]")

    # Determine which images to process
    if SAMPLE_SIZE > 0 and SAMPLE_SIZE < len(all_images):
        processed_images = all_images[:SAMPLE_SIZE]
        label = f"Processing first [cyan]{len(processed_images)}[/cyan] of [cyan]{len(all_images)}[/cyan] images"
    else:
        processed_images = all_images
        label = f"Processing all [cyan]{len(processed_images)}[/cyan] images"

    console.print(f"  {label}")
    console.print()

    main_start = time.time()
    all_results: list[dict] = []

    if MAX_WORKERS > 0:
        workers = min(MAX_WORKERS, len(processed_images))
        # Auto-set thread budget per worker to avoid CPU oversubscription
        if int(os.getenv("DOCTR_NUM_THREADS", "0")) == 0:
            budget = max(4, 12 // max(1, workers))
            os.environ["DOCTR_NUM_THREADS"] = str(budget)
        batch_size = (len(processed_images) + workers - 1) // workers
        batches = [processed_images[i:i + batch_size] for i in range(0, len(processed_images), batch_size)]
        console.print(f"  Using [cyan]{workers}[/cyan] parallel workers, [cyan]{os.environ['DOCTR_NUM_THREADS']}[/cyan] threads each")
        console.print()

        with ProcessPoolExecutor(max_workers=workers) as executor:
            futures = {executor.submit(process_batch, batch): i for i, batch in enumerate(batches)}
            for future in as_completed(futures):
                try:
                    batch_results = future.result()
                    all_results.extend(batch_results)
                except Exception as e:
                    console.print(f"[red]✗ Worker failed: {e}[/red]")
        all_results.sort(key=lambda r: r["path"])
    else:
        model = load_model()
        for idx, img_path in enumerate(processed_images):
            rel_path = img_path.name
            entry: dict = {"path": rel_path}
            console.print(f"  [{idx + 1}/{len(processed_images)}] {rel_path} ...")
            try:
                doc = DocumentFile.from_images(str(img_path))
                start = time.time()
                result_doc = model(doc)
                elapsed = time.time() - start
                text_lines = result_doc.render().splitlines()
                text_lines = [t.strip() for t in text_lines if t.strip()]
                extraction = extract_all_fields(text_lines)
                avg_conf = compute_average_confidence(result_doc)
                entry.update({
                    "elapsed": elapsed,
                    "extraction": extraction,
                    "avg_conf": avg_conf,
                    "text_lines": text_lines,
                })
            except Exception as e:
                entry["error"] = str(e)
            all_results.append(entry)
            c = entry.get("avg_conf")
        conf_display = f"{c:.0%}" if c is not None else "--"
        console.print(f"  [{idx + 1}/{len(processed_images)}] {rel_path} — {entry.get('elapsed', 0):.1f}s, score={entry.get('extraction', ExtractionResult()).score}, conf={conf_display}")

    # Build table
    results_table = Table(title="docTR Extraction Results", title_style="bold")
    results_table.add_column("Image", style="cyan", no_wrap=True)
    results_table.add_column("Score", style="yellow")
    results_table.add_column("Ref#", style="green")
    results_table.add_column("Amount", style="green")
    results_table.add_column("Date", style="green")
    results_table.add_column("Dest Phone", style="magenta")
    results_table.add_column("Dest Bank", style="magenta")
    results_table.add_column("Time", style="blue")
    results_table.add_column("Conf", style="blue")
    results_table.add_column("Lines", style="white")

    field_counts: dict[str, int] = {}
    total_time = 0.0
    total_conf = 0.0
    conf_count = 0
    valid_count = 0
    issues: list[str] = []
    processed_count = len(all_results)

    for data in all_results:
        rel_path = data["path"]
        if "error" in data:
            issues.append(f"{rel_path}: {data['error']}")
            results_table.add_row(rel_path, "ERR", "", "", "", "", "", "", "", "")
            continue

        elapsed = data["elapsed"]
        extraction = data["extraction"]
        avg_conf = data["avg_conf"]
        text_lines = data["text_lines"]

        total_time += elapsed
        if avg_conf is not None:
            total_conf += avg_conf
            conf_count += 1

        is_valid = extraction.status == "VALID"
        if is_valid:
            valid_count += 1

        for key in ["reference", "amount", "date", "phone"]:
            val = getattr(extraction, key, None)
            if val:
                field_counts[key] = field_counts.get(key, 0) + 1

        if extraction.destination_phone:
            field_counts["dest_phone"] = field_counts.get("dest_phone", 0) + 1
        if extraction.destination_bank:
            field_counts["dest_bank"] = field_counts.get("dest_bank", 0) + 1
        if extraction.destination_cedula:
            field_counts["dest_cedula"] = field_counts.get("dest_cedula", 0) + 1

        score_str = f"{extraction.score}" if is_valid else f"[dim]{extraction.score}[/dim]"
        ref_str = extraction.reference or "[dim]--[/dim]"
        amount_str = extraction.amount or "[dim]--[/dim]"
        date_str = extraction.date or "[dim]--[/dim]"
        dest_phone_str = extraction.destination_phone or "[dim]--[/dim]"
        dest_bank_str = extraction.destination_bank or "[dim]--[/dim]"
        time_str = f"{elapsed:.1f}s"
        conf_str = f"{avg_conf:.0%}" if avg_conf is not None else "[dim]--[/dim]"
        lines_str = str(len(text_lines))

        results_table.add_row(
            rel_path, score_str, ref_str, amount_str, date_str,
            dest_phone_str, dest_bank_str, time_str, conf_str, lines_str,
        )

        if avg_conf is not None and avg_conf < 0.7:
            issues.append(f"{rel_path}: low confidence ({avg_conf:.0%})")

    # Print results
    console.print()
    console.print(results_table)
    console.print()

    # Summary
    console.rule("[bold]Summary[/bold]")
    console.print()
    console.print(f"  Images processed      : {processed_count}")
    console.print(f"  Valid receipts        : {valid_count}/{processed_count} (score >= {SCORE_THRESHOLD})")
    console.print(f"  Average inference     : {total_time / processed_count:.1f}s")
    total_elapsed = time.time() - main_start
    console.print(f"  Total wall time      : {total_elapsed:.1f}s ({total_elapsed / processed_count:.1f}s avg)")
    console.print(f"  Average confidence    : {total_conf / conf_count:.0%}" if conf_count else "  Average confidence    : [dim]N/A[/dim]")
    console.print()
    console.print("  [bold]Field detection rates:[/bold]")
    for key in ["reference", "amount", "date", "dest_phone", "dest_bank", "dest_cedula"]:
        count = field_counts.get(key, 0)
        pct = count / processed_count * 100
        label = key.replace("_", " ").title()
        console.print(f"    {label:<15} : {count}/{processed_count} ({pct:.0f}%)")

    console.print()
    console.print(f"  Model: [cyan]db_mobilenet_v3_large[/cyan] + [cyan]crnn_mobilenet_v3_small[/cyan]")
    console.print(f"  Config: assume_straight_pages=True, orientation disabled")

    if issues:
        console.print()
        console.print("  [yellow]Issues flagged:[/yellow]")
        for issue in issues:
            console.print(f"    • {issue}")

    console.print()
    console.rule()
    console.print()


if __name__ == "__main__":
    main()
