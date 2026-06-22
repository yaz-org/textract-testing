import json
import os
import time
import traceback
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
            det_arch="db_mobilenet_v3_large",  # small variant does not exist in docTR 1.0.1
            reco_arch="crnn_mobilenet_v3_small",
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
    handler_steps = {}
    try:
        warnings: list[str] = []

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
        lines = [t.strip() for t in result_doc.render().splitlines() if t.strip()]

        inference_time = time.time() - start
        avg_conf = compute_average_confidence(result_doc)

        fields = extract_all_fields(lines)
        fields.confidence = avg_conf
        fields.inference_time = inference_time

        if avg_conf is not None and avg_conf < 0.7:
            warnings.append("low_confidence")
        if fields.score < 4:
            warnings.append("low_score")
        if not fields.date:
            warnings.append("missing_date")
        if not fields.amount:
            warnings.append("missing_amount")

        fields.warnings = warnings

        print(json.dumps({"level": "INFO", "message": "Document processed", "s3Key": s3_key, "bucket": bucket, "duration_seconds": round(time.time() - start, 3), "handler_steps": handler_steps}))

        return {
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
    except Exception as e:
        duration = round(time.time() - start, 3)
        print(json.dumps({"level": "ERROR", "message": "Document processing failed", "s3Key": s3_key, "bucket": bucket, "duration_seconds": duration, "exception": traceback.format_exc()}))
        raise
