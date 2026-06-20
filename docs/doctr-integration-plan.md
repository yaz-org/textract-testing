# docTR Integration Plan

## Validation Results (2026-06-20)

### Setup

- **Script**: `packages/scripts/validate_doctr.py` (UV-managed Python 3.11)
- **Dependencies**: `python-doctr==1.0.1`, CPU-only PyTorch 2.12.1, Pillow, Rich
- **Run**: `cd packages/scripts && uv run validate_doctr.py`
- **Images**: 366 JPG files in `exports/dream-team-images/` (~25MB total)
- **Sample**: 10 images picked by even file-size distribution (covers different bank UIs)

### Results

| Metric | Value |
|---|---|
| Images with text detected | 9/10 (90%) |
| Valid receipts (score >= 4) | 8/10 (80%) |
| Average inference time (warm) | 2.9s |
| Average word confidence | 89% |
| Field: Amount found | 8/10 (80%) |
| Field: Date found | 8/10 (80%) |
| Field: Bank found | 7/10 (70%) |
| Field: Phone found | 6/10 (60%) |
| Field: Cedula found | 6/10 (60%) |
| Field: Reference found | 5/10 (50%) |

### Key Observations

1. **docTR OCR quality is good** — 89% average confidence on all detected text. Works well on Banplus, BNC, Banesco, and Mercantil receipt layouts.
2. **Non-receipt images correctly filtered** — 1 image was a chat screenshot (score 0, no payment keywords), 1 was a 12KB thumbnail (207x244px, no text to detect).
3. **Reference detection (50%) is an extraction logic issue, not OCR** — some bank layouts (e.g., Banesco) put the reference number on a different relative line position than our `find_value_near_label` function expects. The OCR captures the text correctly, but the parser misses it.
4. **Average inference 2.9s** — acceptable for manual invocation, fine for Lambda with cold start tolerance.
5. **Model config works** — `assume_straight_pages=True`, orientation disabled, `preserve_aspect_ratio=True` all correct for phone screenshots.

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

Constants:
- `IMAGES_DIR = Path("../exports/dream-team-images")`
- `SAMPLE_SIZE = 10`
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
    return (
        text.lower()
        .replace("á", "a").replace("à", "a").replace("ä", "a").replace("â", "a")
        .replace("é", "e").replace("è", "e").replace("ë", "e").replace("ê", "e")
        .replace("í", "i").replace("ì", "i").replace("ï", "i").replace("î", "i")
        .replace("ó", "o").replace("ò", "o").replace("ö", "o").replace("ô", "o")
        .replace("ú", "u").replace("ù", "u").replace("ü", "u").replace("û", "u")
        .replace("ñ", "n")
        .replace(r"\s+", " ").strip()
    )
```

#### 4. Field extractors (ported from `payment-extractor.ts`)

Each function takes `lines: list[str]` and returns `str | None`.

**`extract_reference()`**: Matches `\d{6,15}` near labels like "referencia", "nro. de referencia", "operacion", "comprobante".

**`extract_amount()`**: Matches Venezuelan currency format `Bs. X.XXX,XX` or `X.XXX,XX`. Uses regex `(?:Bs?\.?\s*)?([\d.]+[,]\d{2})(?:\s*Bs)?` and embedded pattern `Realizaste\s+(?:un\s+)?(?:Pago\s+Móvil|transacción)\s+de\s+Bs\.?\s*([\d.]+[,]\d{2})`. Returns both `{text, value}` where value is the numeric float.

**`extract_date()`**: Matches `\d{1,2}/\d{1,2}/\d{2,4}`. Also extracts optional time via `\d{1,2}:\d{2}(?::\d{2})?\s*(AM|PM|am|pm)?`. Normalizes 2-digit years to 2000+.

**`extract_phone()`**: Matches Venezuelan phone patterns: `0(412|414|416|424|426)[\s-]?\d{7}` and masked `0\d{1,3}\*[*\s-]*\d{0,4}`.

**`extract_cedula()`**: Matches `[VEJG]\s*[-]?\s*\d{5,10}` and normalizes to `V-12345678` format.

**`match_bank()`**: Normalizes all text and checks if any bank's `shortName`, `fullName`, `acronym`, `alternativeNames`, or `bankCode` appears in the text. Returns `shortName`.

**`extract_all_fields(lines)`**: Runs all extractors, returns `dict` with keys: `reference`, `amount`, `amount_value`, `date`, `phone`, `cedula`, `bank`, `lines_count`.

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

#### 7. Image sampling

Pick `SAMPLE_SIZE` (10) images evenly distributed by file size:
```python
all_images = sorted(IMAGES_DIR.glob("*.jpg"), key=lambda p: p.stat().st_size)
step = max(1, len(all_images) // SAMPLE_SIZE)
samples = all_images[::step][:SAMPLE_SIZE]
```

Rationale: Different bank apps produce different-sized screenshots. Even file-size sampling increases the chance of covering different app UIs/layouts.

#### 8. Processing loop

For each sampled image:
1. Load: `doc = DocumentFile.from_images(str(img_path))`
2. Time and run: `start = time.time(); result = model(doc); elapsed = time.time() - start`
3. Render text: `lines = result.render().splitlines()`
4. Extract fields: `fields = extract_all_fields(lines)`
5. Compute average confidence from `result.pages[0]` blocks/words
6. Compute receipt score: `score = score_receipt(lines)`
7. Collect into results list

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
Summary
───────
  Samples processed  : 10
  Valid receipts     : 8/10 (score >= 4)
  Avg score          : 7.2
  Field detection rate:
    Reference#  : 9/10 (90%)
    Amount      : 8/10 (80%)
    Date        : 10/10 (100%)
    Phone       : 7/10 (70%)
    Cedula      : 6/10 (60%)
    Bank        : 9/10 (90%)
  ─────────────────────────────────
  Avg inference time : 2.1s
  Avg confidence     : 91%
  Model              : db_mobilenet_v3_large + crnn_mobilenet_v3_small
```

#### 11. Edge case reporting

Flag any images where:
- No text detected at all (blank result)
- Confidence < 70% on any word
- Score < 4 (likely not a valid pago móvil screenshot)
- Spanish characters garbled (ñ → n, accents missing)

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
  Dockerfile              ← Python 3.11 + docTR + model weights
  handler.py              ← Lambda handler
  requirements.txt        ← Pip dependencies
  pyproject.toml          ← UV alternative
```

### `Dockerfile`

```dockerfile
FROM public.ecr.aws/lambda/python:3.11

RUN pip install python-doctr torch boto3 Pillow --no-cache-dir

# Pre-download models during build (avoids cold-start download)
ENV DOCTR_CACHE_DIR=/tmp/doctr_cache
RUN python -c "from doctr.models import ocr_predictor; \
    ocr_predictor(det_arch='db_mobilenet_v3_large', reco_arch='crnn_mobilenet_v3_small', pretrained=True)"

COPY handler.py ${LAMBDA_TASK_ROOT}
CMD ["handler.lambda_handler"]
```

### `handler.py`

```python
import json
import boto3
from pathlib import Path
from doctr.io import DocumentFile
from doctr.models import ocr_predictor

# Model loaded once (warm start benefit)
model = ocr_predictor(
    det_arch='db_mobilenet_v3_large',
    reco_arch='crnn_mobilenet_v3_small',
    pretrained=True,
    assume_straight_pages=True,
    preserve_aspect_ratio=True,
    disable_page_orientation=True,
    disable_crop_orientation=True,
    det_bs=1,
)

s3 = boto3.client('s3')
dynamo = boto3.client('dynamodb')

# Same field extractors as validate_doctr.py (imported or inlined)

def lambda_handler(event, context):
    """
    event: { "documentId": "...", "s3Key": "..." }
    """
    document_id = event['documentId']
    s3_key = event['s3Key']
    bucket = event.get('bucket', 'DOCUMENTS_BUCKET_NAME')

    # Download image from S3 to /tmp
    tmp_path = f'/tmp/{Path(s3_key).name}'
    s3.download_file(bucket, s3_key, tmp_path)

    # Run docTR
    doc = DocumentFile.from_images(tmp_path)
    result = model(doc)
    lines = result.render().splitlines()

    # Extract payment fields
    fields = extract_all_fields(lines)

    # Save doctrResult to DynamoDB
    dynamo.update_item(
        TableName='DOCUMENTS_TABLE_NAME',
        Key={'documentId': {'S': document_id}},
        UpdateExpression='SET doctrResult = :result, doctrExtractedAt = :ts',
        ExpressionAttributeValues={
            ':result': {'S': json.dumps(fields)},
            ':ts': {'S': datetime.utcnow().isoformat()},
        },
    )

    return fields
```

### Lambda config

| Setting | Value | Rationale |
|---|---|---|
| Runtime | Python 3.11 (Docker) | Required by docTR |
| Memory | 1024 MB | PyTorch + model ~500MB in memory |
| Timeout | 60 seconds | Cold start + inference |
| Ephemeral storage | 1024 MB | `/tmp` for image + model cache |
| Architecture | x86_64 | PyTorch compatibility |
| Env: `DOCTR_MULTIPROCESSING_DISABLE` | `TRUE` | Lambda no `/dev/shm` |
| Env: `DOCTR_CACHE_DIR` | `/tmp/doctr_cache` | Lambda only writes `/tmp` |

### SST infrastructure (`infra/doctr.ts`)

```typescript
import { documentsBucket, documentsTable } from "./storage";

export const doctrFunction = new sst.aws.Function("DoctrFunction", {
  handler: "packages/doctr-lambda/handler.lambda_handler",
  runtime: "python3.11",
  docker: true,
  timeout: "60 seconds",
  memory: "1024 MB",
  link: [documentsBucket, documentsTable],
  environment: {
    DOCTR_MULTIPROCESSING_DISABLE: "TRUE",
    DOCTR_CACHE_DIR: "/tmp/doctr_cache",
  },
});
```

---

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
  phone?: string;
  cedula?: string;
  bank?: string;
  score: number;
  confidence: number;
  lines_count: number;
  inference_time: number;
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
└────────────────────┴────────────────────┴───────────────┘
```

---

## Phase 3: Cost analysis

### AWS Textract (current)
- AnalyzeDocument: $0.015 per page (first 1M pages)
- 367 images × $0.015 = $5.50 one-time, ~$5-50/month ongoing

### docTR Lambda (proposed)
- 1024 MB Lambda: ~$0.0000166667 per GB-second
- Average 3s per invocation (warm) = $0.00005 per image
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
| Model cold start >15s | Pre-download model in Dockerfile; use Provisioned Concurrency if needed |
| docTR misses form fields that Textract gets | Run both side-by-side; compare results in Phase 2; fall back to Textract for missing fields |
| Docker image >10GB (Lambda limit) | CPU-only torch is ~200MB; model weights ~150MB; total image should be <1GB |
| Bank logo/text in screenshot confuses detection | Detection only finds text, not logos; bank name in text is what we match on |
| Different bank apps have different layouts | Even sampling by file size in validation covers multiple layouts; regex-based extraction is layout-agnostic |
