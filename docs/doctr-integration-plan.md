# docTR Integration Plan

## Validation Results (2026-06-20)

### Setup

- **Script**: `packages/scripts/validate_doctr.py` (UV-managed Python 3.11)
- **Dependencies**: `python-doctr==1.0.1`, CPU-only PyTorch 2.12.1, Pillow, Rich
- **Run**: `cd packages/scripts && uv run validate_doctr.py`
- **Sequential**: `MAX_WORKERS=0 uv run validate_doctr.py` (default, per-image progress)
- **Parallel**: `MAX_WORKERS=4 uv run validate_doctr.py` (4 workers × 4 threads, ~2 min)
- **Images**: variable — typically 280-401 JPG files in `exports/dream-team-images/` (~25MB total)
- **Flawed output**: low-scoring images (score < 4) auto-copied to `exports/flawed/` for human review

### Results (full run, numbers vary with dataset)

| Metric | Value |
|---|---|
| Valid receipts (score >= 4) | ~70% of images |
| Non-receipts correctly filtered | ~30% — score < 4, auto-copied to `exports/flawed/` |
| Average inference (4 workers × 4 threads) | 1.3s per image |
| Total wall time (4 workers) | **~127s (~2 min)** |
| Average word confidence | 85-89% |
| Field: Reference found (valid receipts) | ~100% |
| Field: Amount found (valid receipts) | ~97% |
| Field: Date found (valid receipts) | varies by bank layout (BNC receipts have no date) |
| Field: Phone found (valid receipts) | ~99% (after regex improvements) |
| Field: Bank found (valid receipts) | ~100% |
| Field: Cedula found (valid receipts) | ~78% |

### Extraction fixes applied

| Fix | What changed | Impact |
|---|---|---|
| Reference: phone exclusion | Skip 04-prefixed 11-digit numbers in reference fallback | Prevents phone masquerading as reference |
| Reference: "nro"/"n°" labels | Added `"nro"`, `"n°"` to `REF_LABELS` for "No XXXXXX" format (Tpago Mercantil) | Catches references labeled as "Nro."/"N°" |
| Phone: loose regex | `LOOSE_PHONE` handles separators anywhere (e.g., `0414-329-7358`) | Catches phones with dashes/dots between digits |
| Phone: separator expansion | `LOOSE_PHONE` expanded from `[\s.-]*` to `[\s.,/-]*` (comma and slash added) | Handles OCR corruption where comma/slash replaces separator |
| Phone: international regex | `INTL_PHONE` (`5841[246]\d{7}`) for international Venezuelan format | Catches `584143297358` → converts to `0414-3297358` |
| Phone: digits-only fallback | `extract_phone_digits_only()` strips all non-digits, matches 6-8 digit suffix | Fixes OCR rendering `/` as a digit separator (e.g., `0414/3297358`) |
| Amount: sort by value | Pick highest amount across all lines (prefers thousands-separator) | Fixes "533,00" → "3.533,00" multi-line case |
| Bank: all-lines scan | Check every line for bank name after labeled search falls short | Bank 89% → 100% among valid receipts |
| Cedula: all-lines scan | Scan all lines for V/E/J/G-prefixed IDs | Cedula 73% → 78% among valid receipts |
| Cedula: case-insensitive | `CEDULA_PREFIXED` regex gets `re.IGNORECASE` for lowercase "v-" | Catches OCR output like "v-12345678" |
| Date: no fallback | Removed fallback to `datetime.now()` when date not found in receipt | Prevents wrong dates on BNC receipts that don't render a transfer date |

### Key Observations

1. **docTR OCR quality is good** — 85-89% average confidence on all detected text. Works well on Banplus, BNC, Banesco, and Mercantil receipt layouts.
2. **Non-receipt images correctly filtered** — ~30% of images (chat screenshots, thumbnails, other banking UIs) scored < 4 and auto-copied to `exports/flawed/`.
3. **Phone gaps root-caused** — 8 images initially missing phone detection. 6 fixed via regex improvements (INTL_PHONE, extract_phone_digits_only, LOOSE_PHONE separator expansion). 2 accepted as unfixable (BDV layout doesn't render phone, OCR letter confusion).
4. **BNC receipts have layout quirks** — Monto/Comision/Total sections (commission won't be confused with amount since "Monto:" appears first in labeled search). Some BNC receipts don't display a transfer date.
5. **Average inference 0.8s (warm, sequential)** / **1.3s (4 workers)** — well within Lambda timeout tolerance.
6. **Model config works** — `assume_straight_pages=True`, orientation disabled, `preserve_aspect_ratio=True` all correct for phone screenshots.

### Raw OCR Samples (correctly captured)

```
Banplus receipt:
  Banplus
  Comprobante de Pago
  Bs. 3.774,00
  Numero de referencia: 120189866792
  Beneficiario: 0414-3297358
  E- 82078228
  Mercantil - 0105
  Fecha: 28/03/2026 11:18 AM

Banesco receipt:
  Recibo
  Operacion Exitosa!
  NUMERO DE REFERENCIA
  FECHA
  07/04/2026 09:48 PM
  NUMERO CELULAR DE DESTINO
  059127965701
  IDENTIFICACION RECEPTOR
  V31031988
  BANCO RECEPTOR BANESCO
  MONTO DE LA OPERACION BS 2.623,00
```

### Validation Conclusion

docTR is ready for Lambda deployment. The recommended model combo (`db_mobilenet_v3_large` + `crnn_mobilenet_v3_small`) handles phone screenshot OCR well. Field extraction can be ported from the existing TypeScript logic with minimal changes.

---

## Overview

Replace (or run alongside) AWS Textract with [docTR](https://github.com/mindee/doctr) — an open-source, PyTorch-based OCR library — for extracting structured payment data from Pago Móvil receipt screenshots.

**Current state**: 367 phone screenshots in `exports/dream-team-images/`, processed via AWS Textract `AnalyzeDocumentCommand` called from a TanStack Start web app (SST v4). Results stored in DynamoDB.

**Goal**: Deploy a Python Lambda running docTR, callable manually, saving results alongside Textract output for comparison.

---

## Phase 0: Validation (immediate)

Before any AWS work, validate docTR accuracy against the actual receipt images.

### File: `packages/scripts/validate_doctr.py`

A Python script using UV for dependency management.

### Dependencies (`packages/scripts/pyproject.toml`)

```toml
[project]
name = "doctr-validate"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
    "python-doctr>=1.0",
    "torch",
    "pillow",
    "rich",
]

[[tool.uv.indexes]]
name = "pytorch-cpu"
url = "https://download.pytorch.org/whl/cpu"

[tool.uv.sources]
torch = { index = "pytorch-cpu" }
```

- `python-doctr>=1.0` — OCR library (latest is 1.0.1 as of Feb 2026)
- `torch` — PyTorch backend (CPU-only to match Lambda environment)
- `pillow` — Image loading
- `rich` — Pretty console tables

### Run command

```bash
cd packages/scripts
uv run validate_doctr.py
```

First run installs deps + downloads model weights (~150MB to `~/.cache/doctr`).

### Script sections

#### 1. Imports and config

```python
from pathlib import Path
from doctr.io import DocumentFile
from doctr.models import ocr_predictor
from PIL import Image
from rich.console import Console
from rich.table import Table
import re, time
```

Constants (all overridable via env vars):
- `IMAGES_DIR` — from `IMAGES_DIR` env or `../../exports/dream-team-images` relative to script
- `SAMPLE_SIZE` — from `SAMPLE_SIZE` env, default 0 (process all images)
- `SCORE_THRESHOLD` — minimum score for valid receipt, default 4
- `DOCTR_NUM_THREADS` — PyTorch CPU thread limit, default 0 (no cap)
- `MAX_WORKERS` — parallel worker processes, default 0 (sequential)
- Model arch: `db_mobilenet_v3_large` + `crnn_mobilenet_v3_small`

#### 2. Venezuelan bank list (ported from `packages/web/src/lib/banks.ts`)

Full list of 28 Venezuelan banks as Python dicts:
```python
VENEZUELAN_BANKS = [
    {
        "bankCode": "0102",
        "acronym": "BDV",
        "shortName": "Banco de Venezuela",
        "fullName": "Banco de Venezuela, S.A. Banco Universal",
        "alternativeNames": ["Banco Comercial de Caracas"],
    },
    # ... 27 more banks
]
```

Includes: BDV, Venezolano de Crédito, Mercantil, BBVA Provincial, Bancaribe, Banco Exterior, Caroní, Banesco, Sofitasa, Plaza, Bangente, BFC, 100% Banco, Delsur, Tesoro, BAV, Bancrecer, R4, Activo, Bancamiga, BID, Banplus, BDT, BANFANB, N58, BNC, Crédito Popular.

#### 3. Text normalization (ported from `payment-extractor.ts:9-20`)

```python
def normalize_text(text: str) -> str:
    text = text.lower()
    for accented, plain in _ACCENT_MAP.items():
        text = text.replace(accented, plain)
    text = re.sub(r"\s+", " ", text)
    return text.strip()
```
Uses a `_ACCENT_MAP` dict for accent-to-plain character mapping, and `re.sub` (not `str.replace`) for whitespace collapse.

#### 4. Field extractors (ported from `payment-extractor.ts`)

All extraction logic lives in a single `extract_all_fields(lines)` function (~200 lines) that returns an `ExtractionResult` dataclass. It does NOT use standalone `extract_reference()`/`extract_amount()` functions — extraction happens inline with labeled search + multi-pass fallbacks.

**Helper functions used by the extractor:**

| Function | Purpose |
|---|---|
| `fuzzy_match_label(text, labels)` | Checks if `text` matches any label string (exact or word-order tolerant) |
| `find_value_near_label(lines, labels, pattern?, max_distance)` | Scans lines for a label, then returns the matching value pattern within `max_distance` lines |
| `extract_phone(text)` | Matches `VZLA_PHONE` (`0(412\|414\|416\|424\|426)[\\s-]?\\d{7}`) or `MASKED_PHONE` (`0\\d{1,3}\\*[*\\s-]*\\d{0,4}`) |
| `extract_phone_loose(text)` | Uses `LOOSE_PHONE` with `[\\s.,/-]*` separators (handles OCR comma/slash corruption) |
| `extract_phone_digits_only(text)` | Strips all non-digits, matches `04xx` + 6-8 trailing digits (fixes OCR digit splitting) |
| `extract_amount_value(text)` | Matches `1.234,56` thousands-separator format, or `123456,78` compact format |
| `parse_vzla_date(text)` | Matches `dd/mm/yyyy` pattern, normalizes 2-digit years to 2000+, extracts optional time |
| `extract_cedula(text)` | Matches `[VEJG]\\s*[-]?\\s*\\d{5,10}`, normalizes to `V-12345678` format (case-insensitive) |
| `match_bank(text)` | Normalizes text, matches against bank shortName/fullName/acronym/alternativeNames/bankCode |

**Extraction flow for each field:**

| Field | Primary | Fallback 1 | Fallback 2+ |
|---|---|---|---|
| Reference | `find_value_near_label(lines, REF_LABELS, \\d{6,15})` | Scan all lines for 8-15 digit numbers (skip phone) | — |
| Amount | `find_value_near_label(lines, AMOUNT_LABELS, VZLA_AMOUNT)` | Scan all lines, pick highest `extract_amount_value` | — |
| Date | `find_value_near_label(lines, DATE_LABELS, DATE_PATTERN)` | Scan all lines for `parse_vzla_date` | (no today fallback) |
| Dest Phone | `find_value_near_label(lines, DEST_PHONE_LABELS, VZLA_PHONE)` (×2: VZLA then MASKED) | Inline phone on label line | Compound beneficiary → loose → intl → digits-only → general full-text scan |
| Dest Cedula | `find_value_near_label(lines, DEST_CEDULA_LABELS, CEDULA_PREFIXED)` (×4 layers) | Inline on label line | "identificación" label → ID keywords → bare V/E/J/G in all lines |
| Dest Bank | `find_value_near_label(lines, DEST_BANK_LABELS)` → strip bank code → match | All-lines scan every line for bank name | Compound beneficiary fallback |
| Origin Phone | `find_value_near_label(lines, ORIGIN_PHONE_LABELS, VZLA_PHONE)` | MASKED_PHONE attempt | Raw value attempt |
| Origin Bank | `find_value_near_label(lines, ORIGIN_BANK_LABELS)` → strip bank code → match | — | — |
| Concept | `find_value_near_label(lines, CONCEPT_LABELS)` | — | — |

#### 5. Receipt scorer (ported from `payment-extractor.ts:191-251`)

```python
def score_receipt(lines: list[str]) -> int:
```

Scores from 0:
- **+3**: Keywords "pago móvil", "tpago", "tpage", "recibo", "pagomovilbdv"
- **+3**: Reference number found (6-15 digits)
- **+2**: Venezuelan phone pattern found
- **+2**: Cedula/RIF pattern found
- **+1**: Venezuelan bank name found
- **+1**: Amount in Venezuelan format found
- **+1**: Success keywords ("operación exitosa", "pago exitoso", "transacción exitosa", etc.)

Max score: 13. Current threshold in TS code: 4 (considered valid pago móvil receipt).

#### 6. Model loading

```python
model = ocr_predictor(
    det_arch='db_mobilenet_v3_large',
    reco_arch='crnn_mobilenet_v3_small',
    pretrained=True,
    assume_straight_pages=True,        # screenshots are upright
    preserve_aspect_ratio=True,        # don't distort phone aspect ratio
    disable_page_orientation=True,     # skip rotation classifier
    disable_crop_orientation=True,     # skip word rotation classifier
    det_bs=1,                          # single image batch
)
```

Optimizations:
- `assume_straight_pages=True` — phone screenshots are never rotated
- `disable_page_orientation=True` — skips the page orientation model, saves ~20% inference time
- `disable_crop_orientation=True` — skips per-crop orientation, saves ~10% inference time
- `preserve_aspect_ratio=True` — keeps phone screenshot proportions (typically ~591x1280 or ~498x1080)

#### 7. Image loading

All `*.jpg`, `*.jpeg`, `*.png` files from `IMAGES_DIR` are processed. Default behavior is to process ALL images (`SAMPLE_SIZE=0`). To process a subset, set `SAMPLE_SIZE=N` — takes the first N images alphabetically:

```python
all_images: list[Path] = []
for ext in ("*.jpg", "*.jpeg", "*.png"):
    all_images.extend(sorted(images_dir.glob(ext)))
if SAMPLE_SIZE > 0 and SAMPLE_SIZE < len(all_images):
    processed_images = all_images[:SAMPLE_SIZE]
```

#### 8. Processing loop (two modes)

**Sequential mode** (`MAX_WORKERS=0`, default):
1. `load_model()` — loads docTR predictor with warmup (dummy 100×100 JPEG to trigger JIT compilation)
2. For each image: load → OCR → render → extract → compute confidence → collect

**Parallel mode** (`MAX_WORKERS=N`):
1. Split images into N batches
2. Spawn `ProcessPoolExecutor` with N workers, each running `process_batch(batch)`
3. Each worker loads its own model + warmup in the subprocess
4. Auto-set thread budget: `max(4, 12 // workers)` per worker (unless `DOCTR_NUM_THREADS` explicitly set)
5. Results collected, sorted by filename

```python
def process_batch(batch: list[Path]) -> list[dict]:
    """Process a batch of images in a worker process."""
    # Load model + warmup in subprocess
    model = ocr_predictor(...)
    # ... dummy JPEG warmup ...
    for img_path in batch:
        doc = DocumentFile.from_images(str(img_path))
        result_doc = model(doc)
        text_lines = result_doc.render().splitlines()
        extraction = extract_all_fields(text_lines)
        avg_conf = compute_average_confidence(result_doc)
    return results
```

**Model warmup** (runs in both modes before first real inference):
```python
from PIL import Image
from io import BytesIO
buf = BytesIO()
Image.new("RGB", (100, 100), "white").save(buf, format="JPEG")
dummy = DocumentFile.from_images(buf.getvalue())
model(dummy)  # triggers PyTorch JIT compilation upfront
```

Without warmup, the first 10-20 images pay a ~2-3s JIT compilation penalty each. Warmup absorbs this at model load time.

#### 9. Report output (Rich table)

```python
table = Table(title="docTR Validation Results")
table.add_column("Image", style="cyan")
table.add_column("Score", style="yellow")
table.add_column("Ref#", style="green")
table.add_column("Amount", style="green")
table.add_column("Date", style="green")
table.add_column("Phone", style="green")
table.add_column("Bank", style="green")
table.add_column("Time", style="magenta")
table.add_column("Conf", style="blue")
```

Each row shows field values or `--` for missing fields. Time in seconds, confidence as percentage.

#### 10. Summary

After the table, print aggregate stats:
```
  Images processed      : 282
  Valid receipts        : 282/282 (score >= 4)
  Average inference     : 1.2s
  Total wall time      : 87.5s (0.3s avg)
  Average confidence    : 89%

  Field detection rates:
    Reference       : 281/282 (100%)
    Amount          : 274/282 (97%)
    Date            : 242/282 (86%)
    Dest Phone      : 280/282 (99%)
    Dest Bank       : 282/282 (100%)
    Dest Cedula     : 221/282 (78%)

  Model: db_mobilenet_v3_large + crnn_mobilenet_v3_small
  Config: assume_straight_pages=True, orientation disabled

  Issues flagged (1):
    • 1771689547-...: low confidence (63%)
```

#### 11. Edge case reporting

Low-confidence images (`avg_conf < 70%`) are flagged as issues in the summary output.

#### 12. Confidence computation

```python
def compute_average_confidence(result_doc) -> float | None:
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
```

Walks the docTR result tree (pages → blocks → lines → words) and averages per-word confidence.

#### 13. Flawed images archive

After the table and summary, low-scoring images (score < 4) are auto-copied to `exports/flawed/` for human review:

```python
flawed_dir = IMAGES_DIR.parent / "flawed"
if flawed_dir.exists():
    shutil.rmtree(flawed_dir)
flawed_dir.mkdir(parents=True, exist_ok=True)
for data in all_results:
    if data["extraction"].score < SCORE_THRESHOLD:
        src = IMAGES_DIR / data["path"]
        shutil.copy2(src, flawed_dir / src.name)
```

Previous contents of `exports/flawed/` are deleted on each run, then re-populated from the current results.

---

## Phase 1: Lambda Deployment

After validation confirms docTR works on the images:

### Architecture

```
┌──────────┐     ┌──────────────┐     ┌─────────────┐
│ Web UI   │────▶│ processWith  │────▶│ Docker/ECR  │     ┌──────┐
│ (TS)     │     │ doctr (TS)   │     │ Python      │────▶│  S3  │
│          │     │ server fn    │     │ Lambda      │     │      │
└──────────┘     └──────────────┘     └──────┬──────┘     └──────┘
                                             │
                                             ▼
                                        ┌──────────┐
                                        │ DynamoDB │
                                        └──────────┘
```

### File: `packages/doctr-lambda/`

```
packages/doctr-lambda/
  Dockerfile              ← Multi-stage build (Python 3.13, UV, pre-downloaded models)
  handler.py              ← Lambda handler (lazy model loading, shared extractor)
  download_models.py      ← Pre-downloads model weights at Docker build time
  pyproject.toml          ← UV dependencies (core-extractor, python-doctr, torch)
```

### Shared extraction module

The canonical extraction logic lives in `packages/core/core/extractor/extractor.py` — a single source of truth imported by both `validate_doctr.py` and the Lambda handler.

```
packages/core/core/extractor/
  __init__.py           ← Re-exports: ExtractionResult, extract_all_fields, compute_average_confidence, etc.
  extractor.py          ← Canonical extraction logic: field extractors, regex patterns, scorer, ExtractionResult dataclass
```

The `core-extractor` package is defined in `packages/core/pyproject.toml` as a local workspace package. The Lambda's `pyproject.toml` references it:

```toml
[project]
dependencies = [
    "core-extractor",  # workspace dependency
    "python-doctr>=1.0,<2.0",
    "torch",
    "boto3",
    "pillow",
]

[tool.uv.sources]
core-extractor = { workspace = true }
```

No `copyFiles` needed in SST config — SST v4 copies the entire workspace as the Docker build context, so `packages/core/` is available at `COPY` time in the Dockerfile.

### `Dockerfile`

Multi-stage build: builder has compile tools + model download, final stage has only runtime libraries. Reduces image size by ~200MB.

```dockerfile
FROM public.ecr.aws/lambda/python:3.13 AS builder

# Build tools + runtime shared libs (needed by torch/opencv at import time for model download)
RUN dnf install -y gcc gcc-c++ make python3-devel libxcb mesa-libGL && dnf clean all

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

COPY packages/core /tmp/core-extractor
RUN uv pip install --system /tmp/core-extractor --no-cache-dir

RUN uv pip install --system \
    --extra-index-url https://download.pytorch.org/whl/cpu \
    --index-strategy unsafe-best-match \
    python-doctr==1.0.1 torch boto3 pillow --no-cache-dir

ENV DOCTR_CACHE_DIR=/opt/doctr_cache
ENV DOCTR_MULTIPROCESSING_DISABLE=TRUE
COPY download_models.py .
RUN python download_models.py


FROM public.ecr.aws/lambda/python:3.13

# Only runtime shared libraries (~10MB vs ~200MB for build tools)
RUN dnf install -y libxcb mesa-libGL && dnf clean all

ENV DOCTR_MULTIPROCESSING_DISABLE=TRUE
ENV DOCTR_CACHE_DIR=/opt/doctr_cache

COPY --from=builder /var/lang/lib/python3.13/site-packages/. /var/lang/lib/python3.13/site-packages/
COPY --from=builder /opt/doctr_cache /opt/doctr_cache
COPY handler.py ${LAMBDA_TASK_ROOT}/handler.py

CMD ["handler.lambda_handler"]
```

### `handler.py`

Lazy model loading + lazy imports: heavy frameworks (torch, docTR) imported at function call time, not module level. INIT phase loads only stdlib + boto3 → completes in ~5.5s (under 10s Lambda init limit).

```python
import json
import os
import time
from datetime import datetime
from pathlib import Path

import boto3
from core.extractor import (
    ExtractionResult,
    compute_average_confidence,
    extract_all_fields,
)

_model = None


def get_model():
    global _model
    if _model is None:
        from doctr.models import ocr_predictor
        _model = ocr_predictor(
            det_arch="db_mobilenet_v3_large",
            reco_arch="crnn_mobilenet_v3_small",
            pretrained=True,
            assume_straight_pages=True,
            preserve_aspect_ratio=True,
            disable_page_orientation=True,
            disable_crop_orientation=True,
            det_bs=1,
        )
    return _model


s3 = boto3.client("s3")
dynamo = boto3.client("dynamodb")

DOCTR_CACHE_DIR = os.getenv("DOCTR_CACHE_DIR", "/tmp/doctr_cache")
DOCUMENTS_TABLE = os.getenv("DOCUMENTS_TABLE_NAME", "DocumentsTable")
DOCUMENTS_BUCKET = os.getenv("DOCUMENTS_BUCKET_NAME", "")


def lambda_handler(event, context):
    """
    Always returns extracted data + metadata. Downstream decides
    what to do based on status, confidence, and warnings.

    event: { "documentId": "...", "s3Key": "..." }
    """
    document_id = event.get("documentId")
    s3_key = event.get("s3Key")
    bucket = event.get("bucket", DOCUMENTS_BUCKET)

    if not document_id or not s3_key:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "documentId and s3Key are required"}),
        }

    start = time.time()
    warnings: list[str] = []

    # Download image from S3 to /tmp
    tmp_path = f"/tmp/{Path(s3_key).name}"
    try:
        s3.download_file(bucket, s3_key, tmp_path)
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": f"Failed to download from S3: {str(e)}"}),
        }

    # Run docTR OCR (lazy import inside handler body)
    try:
        from doctr.io import DocumentFile
        doc = DocumentFile.from_images(tmp_path)
        result_doc = get_model()(doc)
        lines = result_doc.render().splitlines()
        lines = [t.strip() for t in lines if t.strip()]
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": f"OCR failed: {str(e)}"}),
        }

    inference_time = time.time() - start
    avg_conf = compute_average_confidence(result_doc)

    # Extract payment fields (always runs, regardless of score)
    fields = extract_all_fields(lines)
    fields.confidence = avg_conf
    fields.inference_time = inference_time

    # Build warnings
    if avg_conf is not None and avg_conf < 0.7:
        warnings.append("low_confidence")
    if fields.score < 4:
        warnings.append("low_score")
    if not fields.date:
        warnings.append("missing_date")
    if not fields.amount:
        warnings.append("missing_amount")

    fields.warnings = warnings

    # Build response dict
    result = {
        "reference": fields.reference,
        "amount": fields.amount,
        "amount_value": fields.amount_value,
        "date": fields.date,
        "destination_phone": fields.destination_phone,
        "destination_cedula": fields.destination_cedula,
        "destination_bank": fields.destination_bank,
        "origin_phone": fields.origin_phone,
        "origin_bank": fields.origin_bank,
        "concept": fields.concept,
        "score": fields.score,
        "status": fields.status,
        "confidence": fields.confidence,
        "inference_time": fields.inference_time,
        "warnings": fields.warnings,
    }

    # Save doctrResult to DynamoDB
    table_name = os.environ.get("DOCUMENTS_TABLE_NAME")
    if table_name:
        try:
            dynamo.update_item(
                TableName=table_name,
                Key={"documentId": {"S": document_id}},
                UpdateExpression="SET doctrResult = :result, doctrExtractedAt = :ts",
                ExpressionAttributeValues={
                    ":result": {"S": json.dumps(result)},
                    ":ts": {"S": datetime.utcnow().isoformat()},
                },
            )
        except Exception as e:
            warnings.append(f"dynamo_save_failed: {str(e)}")

    return result
```

### Lambda config

| Setting | Value | Rationale |
|---|---|---|
| Runtime | Python 3.13 (Docker) | AL2023 base image, GCC 11.x for torch |
| Memory | 2048 MB | PyTorch model + image processing needs ~1200 MB peak |
| Timeout | 60 seconds | Cold start + inference |
| Ephemeral storage | 1024 MB | `/tmp` for image download |
| Architecture | x86_64 | PyTorch compatibility |
| Env: `DOCTR_MULTIPROCESSING_DISABLE` | `TRUE` | Lambda has no `/dev/shm` |
| Env: `DOCTR_CACHE_DIR` | `/opt/doctr_cache` | Baked into image at build time |
| Model weights | Pre-downloaded at Docker build time via `download_models.py` | Zero network fetch on cold start |
| Init phase | ~5.5s (no timeout), loads only stdlib + boto3 | Lazy imports avoid torch/doctr in INIT |

### SST infrastructure (`infra/doctr.ts`)

```typescript
import { documentsBucket, documentsTable } from "./storage";

export const doctrFunction = new sst.aws.Function("DoctrFunction", {
	handler: "packages/doctr-lambda/handler.lambda_handler",
	runtime: "python3.13",
	python: { container: true },
	timeout: "60 seconds",
	memory: "2048 MB",
	link: [documentsBucket, documentsTable],
	environment: {
		DOCUMENTS_BUCKET_NAME: documentsBucket.name,
		DOCUMENTS_TABLE_NAME: documentsTable.name,
		DOCTR_MULTIPROCESSING_DISABLE: "TRUE",
		DOCTR_CACHE_DIR: "/opt/doctr_cache",
	},
});

```

---

## Cold Start Optimizations

### Problem

Lambda cold starts were initially timing out at 10s init phase — heavy frameworks (torch, docTR) imported at module level. The model was also being re-downloaded from the internet on every cold start (~2s network fetch).

### Optimization 1: Multi-stage Docker build

Builder stage has `gcc gcc-c++ make python3-devel libxcb mesa-libGL` for compiling native extensions. Final stage copies site-packages and model cache, installs only `libxcb mesa-libGL` (~10MB vs ~200MB for build tools).

```dockerfile
FROM public.ecr.aws/lambda/python:3.13 AS builder
# ...
FROM public.ecr.aws/lambda/python:3.13
# ...
COPY --from=builder /var/lang/lib/python3.13/site-packages/. /var/lang/lib/python3.13/site-packages/
COPY --from=builder /opt/doctr_cache /opt/doctr_cache
```

**Savings**: ~200MB removed from final image.

### Optimization 2: Lazy model loading + lazy imports

`ocr_predictor()` moved into `get_model()` function, called on first invocation. `import doctr.io` and `import doctr.models` moved inside handler body. Module-level imports are only stdlib + boto3.

```python
_model = None

def get_model():
    global _model
    if _model is None:
        from doctr.models import ocr_predictor
        _model = ocr_predictor(...)
    return _model
```

**Result**: INIT phase loads only stdlib + boto3 → completes in ~5.5s (no timeout). Without lazy imports, INIT was timing out at 10s.

### Optimization 3: Pre-downloaded model weights

`download_models.py` runs at Docker build time, saving weights to `/opt/doctr_cache`:

```python
from doctr.models import ocr_predictor
ocr_predictor(
    det_arch="db_mobilenet_v3_large",
    reco_arch="crnn_mobilenet_v3_small",
    pretrained=True,
)
```

Runtime `ENV DOCTR_CACHE_DIR=/opt/doctr_cache` points to the same location. First invocation calls `get_model()` which loads from disk cache — no network fetches.

**Savings**: Eliminates ~2s network download on every cold start.

### Performance measurements

| Phase | Time | What's happening |
|---|---|---|
| **Init** (cold start) | **5.5s** | Lambda container init + stdlib/boto3 import |
| **First invoke** (cold start) | **~7.5s** | `get_model()` loads weights from disk cache + OCR + extraction |
| **Total cold start** | **~13s** | Init + first real invocation |
| **Warm invoke** | **~2.3s** | Model cached in global `_model` variable |
| **Init timeout limit** | 10s (AWS) | 5.5s actual — well under limit |

### Key takeaway

With these three optimizations, the Lambda functions reliably within AWS constraints. Cold starts are acceptable for a manual-trigger workflow. If sub-5s cold starts become necessary, Provisioned Concurrency is the next step (at ~$0.000004 per GB-second idle).

## Phase 2: Web integration

### DynamoDB schema addition

Add a new column to the `DocumentRecord` type and DynamoDB schema:

```typescript
// In documents.ts DocumentRecord
doctrResult?: {
  reference: string;
  amount: string;
  amount_value: number;
  date: string;
  destination_phone?: string;
  destination_cedula?: string;
  destination_bank?: string;
  origin_phone?: string;
  origin_bank?: string;
  concept?: string;
  score: number;
  status: string;
  confidence: number;
  inference_time: number;
  warnings: string[];
};
doctrExtractedAt?: string;
```

### Server function (`server-fns.ts`)

```typescript
export const processWithDoctr = createServerFn({ method: "POST" })
  .validator(
    z.array(z.object({ documentId: z.string().uuid(), s3Key: z.string() })),
  )
  .handler(async ({ data }) => {
    const results = [];
    for (const { documentId, s3Key } of data) {
      const result = await doctrFunction.invoke({
        documentId,
        s3Key,
        bucket: Resource.Documents.name,
      });
      results.push({ documentId, success: true, result });
    }
    return results;
  });
```

### Web UI

Add a "Process with docTR" button next to the existing "Process" button in the documents list view. Show results side-by-side with Textract results for comparison.

### Comparison view

```
┌─────────────────────────────────────────────────────────┐
│ Document: 1770477591.jpg                                │
├────────────────────┬────────────────────┬───────────────┤
│ Field              │ Textract           │ docTR          │
├────────────────────┼────────────────────┼───────────────┤
│ Reference#         │ 12345678           │ 12345678       │
│ Amount             │ 1.234,56           │ 1.234,56       │
│ Date               │ 12/03/2025         │ 12/03/2025     │
│ Phone              │ 0412-1234567       │ 0412-1234567   │
│ Cedula             │ V-12345678         │ --             │
│ Bank               │ Banesco            │ Banesco        │
│ ────────────────── │ ────────────────── │ ────────────── │
│ Score              │ 10                 │ 8               │
│ Confidence         │ 97%                │ 91%             │
│ Cost               │ $0.0015 (API)     │ ~$0.0002 (LCU)  │
│ Warnings           │ --                 │ --              │
└────────────────────┴────────────────────┴───────────────┘
```

### Lambda response contract

The Lambda always returns extracted data with metadata. It never short-circuits
on low score or low confidence — downstream consumers decide the action.

```typescript
type DoctrResult = {
  // Extracted fields (empty string / null if not found)
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

  // Metadata
  score: number;                    // 0-13 receipt validity score
  status: "VALID" | "INVALID";     // VALID if score >= 4
  confidence: number | null;        // avg word confidence (0.0-1.0)
  inference_time: number;           // seconds
  warnings: string[];               // "low_confidence", "low_score", "missing_date", etc.
};
```

---

## Phase 3: Cost analysis

### AWS Textract (current)
- AnalyzeDocument: $0.015 per page (first 1M pages)
- 367 images × $0.015 = $5.50 one-time, ~$5-50/month ongoing

### docTR Lambda (proposed)
- 2048 MB Lambda: ~$0.0000333334 per GB-second
- Average 3s per invocation (warm) = $0.0001 per image
- 367 images = $0.018
- Plus S3 GET ($0.0004/1000) and DynamoDB writes
- **~50-80x cheaper** than Textract for this volume

---

## Model Selection Rationale

### Chosen: `db_mobilenet_v3_large` + `crnn_mobilenet_v3_small`

| Layer | Model | Params | CPU time (benchmark) |
|---|---|---|---|
| Detection | `db_mobilenet_v3_large` | 4.2M | 0.5s/it |
| Recognition | `crnn_mobilenet_v3_small` | 2.1M | 0.05s/batch64 |
| **Total** | — | **6.3M** | **~0.55s ||

### Why not larger models?

- `db_resnet50` (25.4M): 6x larger, only 2% better precision on FUNSD forms. Not worth Lambda cold start penalty.
- `crnn_vgg16_bn` (15.8M): 8x larger, only 1% better recognition accuracy on structured text.
- `parseq` (23.8M): Excellent accuracy but CPU-bound, 2.2s/batch64 vs 0.05s. Overkill for receipt fields (mostly numbers + short labels).

### Why not FAST models?

FAST models (tiny/small/base) have good accuracy but target rotated/scene text. Our screenshots are upright with clean backgrounds — DB models handle this fine with fewer params.

### Optimization flags active

`disable_page_orientation=True` + `disable_crop_orientation=True` skip two classifier models, saving ~30% inference time. Valid because phone screenshots are always upright.

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Spanish accent characters not recognized | Existing `normalize_text()` already strips accents; payment extraction works on normalized text |
| Model init timeout | **Mitigated**: Init phase 5.5s, first invoke ~7.5s — well within Lambda 10s init limit. Multi-stage build + lazy imports + pre-downloaded weights. Provisioned Concurrency available if needed |
| docTR misses form fields that Textract gets | Run both side-by-side; compare results in Phase 2; fall back to Textract for missing fields |
| Docker image >10GB (Lambda limit) | Multi-stage build saves ~200MB; final image ~800MB. Well under 10GB limit |
| `MemorySize` constraint error on first deploy after major Dockerfile change | Retry `sst deploy` (transient AWS API issue — resolves on retry) |
| Bank logo/text in screenshot confuses detection | Detection only finds text, not logos; bank name in text is what we match on |
| Different bank apps have different layouts | Even sampling by file size in validation covers multiple layouts; regex-based extraction is layout-agnostic |

---

## Performance Optimizations

### Current baseline (366 images)

| Config | Total wall time | Avg inference | Speedup |
|---|---|---|---|
| Sequential (no thread cap) | 1672s (28 min) | 4.6s | 1× |
| Sequential (`DOCTR_NUM_THREADS=20`) | 213s (3.5 min) | 0.6s | 7.8× |
| **4 workers, 4 threads each** | **127s (2 min)** | 1.3s | **13×** |

### Option 1: Multiprocessing (implemented)

**Status:** ✅ Implemented in `validate_doctr.py`

Split images into batches and process with `ProcessPoolExecutor` (4 workers × 4 threads each).

```bash
# Default (sequential) — compatible with original behavior
uv run validate_doctr.py

# Parallel with 4 workers (auto-calculates 4 threads each)
MAX_WORKERS=4 uv run validate_doctr.py

# Parallel with 2 workers, override threads
MAX_WORKERS=2 DOCTR_NUM_THREADS=8 uv run validate_doctr.py
```

**Thread budget auto-calculation** (`max(4, 12 // workers)`):

| Workers | Threads per worker | Total threads |
|---|---|---|
| 1 | 12 (effectively uncapped) | 12 |
| 2 | 6 | 12 |
| 3 | 4 | 12 |
| 4+ | 4 | 16+ |

**How it works:**
- Images split into `MAX_WORKERS` equal batches
- Each worker loads its own model + warmup in a subprocess
- Workers run in parallel via `ProcessPoolExecutor` (fork)
- Results collected, sorted by filename, then table/summary built

**Tradeoffs:**
- Each worker loads ~150MB model → 4 workers = ~600MB RAM peak
- No per-image progress during parallel phase (progress shown after each batch completes)
- With fork, workers inherit parent's memory — ensure no large objects before forking

### Option 2: Model warmup (implemented)

**Status:** ✅ Added to `load_model()` and `process_batch()`

After loading model weights, runs a dummy 100×100 white JPEG through the model to
trigger PyTorch JIT compilation upfront. Without warmup, the first 10-20 images
pay a ~2-3s JIT compilation penalty each. Warmup absorbs this at model load time.

```python
buf = BytesIO()
Image.new("RGB", (100, 100), "white").save(buf, format="JPEG")
dummy = DocumentFile.from_images(buf.getvalue())
model(dummy)
```

### Option 3: Image resize before inference (plan)

**Status:** 📝 Not yet implemented — planned for ONNX path

Resize images to a consistent max dimension before feeding to the model to reduce
computation on large screenshots.

```python
from PIL import Image
import numpy as np

MAX_DIM = 720  # max pixels on longest side

def resize_for_doctr(img_path: Path) -> np.ndarray:
    img = Image.open(img_path)
    w, h = img.size
    if max(w, h) > MAX_DIM:
        ratio = MAX_DIM / max(w, h)
        new_size = (int(w * ratio), int(h * ratio))
        img = img.resize(new_size, Image.LANCZOS)
    return np.array(img)

# Use instead of DocumentFile.from_images:
arr = resize_for_doctr(img_path)
doc = DocumentFile.from_images(arr)
```

**When to apply:** After ONNX export (which needs fixed-shape inputs). For the
PyTorch path, docTR already resizes internally to 1024px, so this only saves
the internal resize step (~5-10% speedup). With ONNX (fixed 640×640 detection
input), the speedup is more significant (~30%).

**Current image sizes:** Phone screenshots range from 498×1080 to 1000×1280.
Resizing to 720px on the longest side reduces pixel count by ~2× while
preserving text readability for screenshots.

### Option 4: ONNX Runtime (plan)

**Status:** 📝 Not yet implemented — outlined for future optimization

**Goal:** Export docTR models to ONNX and run via ONNX Runtime for 2-3× per-image speedup on CPU.

**Steps:**

1. **Add dependencies** to `pyproject.toml`:
```toml
onnxruntime>=1.20
onnx>=1.17
```

2. **Export models** — docTR supports `exportable=True`:
```python
from doctr.models import detection, recognition

det_model = detection.db_mobilenet_v3_large(
    pretrained=True, exportable=True
)
reco_model = recognition.crnn_mobilenet_v3_small(
    pretrained=True, exportable=True
)

import torch
dummy_det = torch.randn(1, 3, 1024, 1024)
torch.onnx.export(det_model, dummy_det, "det_model.onnx",
                  opset_version=17, input_names=["input"], output_names=["output"])

dummy_reco = torch.randn(64, 3, 32, 128)
torch.onnx.export(reco_model, dummy_reco, "reco_model.onnx",
                  opset_version=17, input_names=["input"], output_names=["output"])
```

3. **Run ONNX inference** instead of `ocr_predictor`:
```python
import onnxruntime as ort

session_det = ort.InferenceSession("det_model.onnx")
session_reco = ort.InferenceSession("reco_model.onnx")

def predict_onnx(image):
    # Reuse docTR pre/post-processing, replace forward pass
    ...
```

**Complexity:** Moderate. docTR's pre/post-processing can be reused; only the
PyTorch forward pass is replaced with ONNX Runtime calls.

**Estimated speedup:** 2-3× per inference (stacked with multiprocessing: ~45s total)

**Tradeoffs:**
- Adds ~100MB to Lambda image (ONNX runtime)
- Model re-export needed when updating docTR versions
- Some docTR ops may not export cleanly (need to verify)

### Implementation order recommendation

| Step | Effort | Speedup | Cumulative |
|---|---|---|---|
| 1. Warmup ✅ | 2 lines | ~15s | 213 → 198s |
| 2. Multiprocessing ✅ | ~40 lines | ~85s | 198 → 127s |
| 3. ONNX Runtime ⏳ | Medium | ~70s | 127 → 60s |
| 4. Image resize ⏳ | 3 lines | ~10s | 60 → 50s |
