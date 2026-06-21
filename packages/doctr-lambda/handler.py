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

    # Run docTR OCR
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

    # Extract payment fields
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

    # Save to DynamoDB
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
