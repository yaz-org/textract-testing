import json
import os
import time
import traceback
from datetime import datetime
from pathlib import Path

import boto3

_model = None
_DET_ARCH = "db_mobilenet_v3_large"
_RECO_ARCH = "crnn_mobilenet_v3_small"


def _compute_average_confidence(result_doc) -> float | None:
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


def get_model():
    global _model
    if _model is None:
        import shutil
        steps = {}

        t0 = time.time()
        if not os.path.exists(DOCTR_CACHE_DIR):
            if os.path.exists("/opt/doctr_cache"):
                shutil.copytree("/opt/doctr_cache", DOCTR_CACHE_DIR)
        steps["copytree"] = round(time.time() - t0, 3)

        t0 = time.time()
        from doctr.models import ocr_predictor
        _model = ocr_predictor(
            det_arch=_DET_ARCH,
            reco_arch=_RECO_ARCH,
            pretrained=True,
            assume_straight_pages=True,
            preserve_aspect_ratio=True,
            disable_page_orientation=True,
            disable_crop_orientation=True,
            det_bs=1,
        )
        steps["load_model"] = round(time.time() - t0, 3)

        t0 = time.time()
        from io import BytesIO
        from PIL import Image
        from doctr.io import DocumentFile
        buf = BytesIO()
        Image.new("RGB", (100, 100), "white").save(buf, format="JPEG")
        dummy = DocumentFile.from_images(buf.getvalue())
        _model(dummy)
        steps["warmup"] = round(time.time() - t0, 3)

        print(json.dumps({"level": "INFO", "message": "Cold start timing", "steps": steps}))
    return _model


s3 = boto3.client("s3")

DOCTR_CACHE_DIR = os.getenv("DOCTR_CACHE_DIR", "/tmp/doctr_cache")
DOCUMENTS_BUCKET = os.getenv("DOCUMENTS_BUCKET_NAME", "")


def lambda_handler(event, context):

    s3_key = event["s3Key"]
    bucket = event.get("bucket", DOCUMENTS_BUCKET)
    print(json.dumps({"level": "INFO", "message": "Processing document", "s3Key": s3_key, "bucket": bucket}))

    start = time.time()
    start_ms = int(time.time() * 1000)
    handler_steps = {}
    try:
        t1 = time.time()
        from doctr.io import DocumentFile
        handler_steps["import_doctr_io"] = round(time.time() - t1, 3)

        t1 = time.time()
        tmp_path = f"/tmp/{Path(s3_key).name}"
        s3.download_file(bucket, s3_key, tmp_path)
        handler_steps["s3_download"] = round(time.time() - t1, 3)

        t1 = time.time()
        doc = DocumentFile.from_images(tmp_path)
        handler_steps["read_image"] = round(time.time() - t1, 3)

        result_doc = get_model()(doc)
        raw_text = result_doc.render()
        lines = [t.strip() for t in raw_text.splitlines() if t.strip()]

        elapsed_ms = int(time.time() * 1000) - start_ms
        avg_conf = _compute_average_confidence(result_doc)
        total_blocks = sum(len(page.blocks) for page in result_doc.pages)

        print(json.dumps({
            "level": "INFO",
            "message": "Document processed",
            "s3Key": s3_key,
            "bucket": bucket,
            "duration_seconds": round(time.time() - start, 3),
            "handler_steps": handler_steps,
        }))

        return {
            "inferenceType": "doctr",
            "extractedAt": datetime.utcnow().isoformat() + "Z",
            "pages": len(result_doc.pages),
            "blocks": total_blocks,
            "lines": len(lines),
            "text": raw_text,
            "allLines": lines,
            "averageConfidence": avg_conf,
            "inferenceTimeMs": elapsed_ms,
            "modelInfo": {
                "detArch": _DET_ARCH,
                "recoArch": _RECO_ARCH,
            },
        }
    except Exception as e:
        duration = round(time.time() - start, 3)
        print(json.dumps({"level": "ERROR", "message": "Document processing failed", "s3Key": s3_key, "bucket": bucket, "duration_seconds": duration, "exception": traceback.format_exc()}))
        raise
