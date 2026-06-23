import json
import os
import shutil
import time
import traceback
from datetime import datetime
from pathlib import Path

import boto3
from onnxtr.io import DocumentFile

_model = None
_DET_ARCH = "db_mobilenet_v3_large"
_RECO_ARCH = "crnn_mobilenet_v3_small"

s3 = boto3.client("s3")
ONNXTR_CACHE_DIR = os.getenv("ONNXTR_CACHE_DIR", "/tmp/onnxtr_cache")
DOCUMENTS_BUCKET = os.getenv("DOCUMENTS_BUCKET_NAME", "")


def get_model():
    global _model
    if _model is None:
        steps = {}

        steps["opt_cache_exists"] = os.path.exists("/opt/onnxtr_cache")

        t0 = time.time()
        if not os.path.exists(ONNXTR_CACHE_DIR):
            if os.path.exists("/opt/onnxtr_cache"):
                shutil.copytree("/opt/onnxtr_cache", ONNXTR_CACHE_DIR)
                steps["copied_from_opt"] = True
            else:
                os.makedirs(ONNXTR_CACHE_DIR, exist_ok=True)
                steps["copied_from_opt"] = False
        steps["prepare_cache_ms"] = round((time.time() - t0) * 1000)

        cache_stats = {"file_count": 0, "total_size_kb": 0, "files": []}
        if os.path.exists(ONNXTR_CACHE_DIR):
            for root, dirs, files in os.walk(ONNXTR_CACHE_DIR):
                for f in files:
                    fp = os.path.join(root, f)
                    cache_stats["file_count"] += 1
                    cache_stats["total_size_kb"] += os.path.getsize(fp) / 1024
                    cache_stats["files"].append(f)
        steps["cache"] = cache_stats

        t0 = time.time()
        from onnxtr.models import ocr_predictor
        steps["import_ms"] = round((time.time() - t0) * 1000)

        t0 = time.time()
        _model = ocr_predictor(
            det_arch=_DET_ARCH,
            reco_arch=_RECO_ARCH,
            assume_straight_pages=True,
            preserve_aspect_ratio=True,
            disable_page_orientation=True,
            disable_crop_orientation=True,
            det_bs=1,
        )
        steps["load_model_ms"] = round((time.time() - t0) * 1000)

        print(json.dumps({"level": "INFO", "message": "Model init timing", "steps": steps}))
    return _model


def _geometry_to_list(geom):
    return [geom[0][0], geom[0][1], geom[1][0], geom[1][1]]


def _artefact_to_dict(artefact):
    return {
        "type": artefact.type,
        "confidence": artefact.confidence,
        "geometry": _geometry_to_list(artefact.geometry),
    }


def _word_to_dict(word):
    return {
        "text": word.value,
        "confidence": word.confidence,
        "geometry": _geometry_to_list(word.geometry),
        "objectness_score": word.objectness_score,
        "crop_orientation": word.crop_orientation,
    }


def _line_to_dict(line):
    return {
        "text": " ".join(w.value for w in line.words),
        "geometry": _geometry_to_list(line.geometry),
        "objectness_score": line.objectness_score,
        "words": [_word_to_dict(w) for w in line.words],
    }


def _block_to_dict(block):
    lines = [_line_to_dict(l) for l in block.lines]
    artefacts = [_artefact_to_dict(a) for a in block.artefacts]
    return {
        "text": " ".join(l["text"] for l in lines),
        "objectness_score": block.objectness_score,
        "geometry": _geometry_to_list(block.geometry),
        "lines": lines,
        "artefacts": artefacts,
    }


def _page_to_dict(page):
    blocks = [_block_to_dict(b) for b in page.blocks]
    return {
        "page_idx": page.page_idx,
        "dimensions": {"height": page.dimensions[0], "width": page.dimensions[1]},
        "orientation": page.orientation,
        "language": page.language,
        "blocks": blocks,
        "text": " ".join(b["text"] for b in blocks),
    }


def lambda_handler(event, context):
    s3_key = event["s3Key"]
    bucket = event.get("bucket", DOCUMENTS_BUCKET)
    print(json.dumps({"level": "INFO", "message": "Processing document", "s3Key": s3_key, "bucket": bucket}))

    start = time.time()
    tmp_path = None

    try:
        tmp_path = f"/tmp/{Path(s3_key).name}"
        s3.download_file(bucket, s3_key, tmp_path)

        doc = DocumentFile.from_images(tmp_path)
        result = get_model()(doc)

        pages = [_page_to_dict(p) for p in result.pages]
        full_text = "\n".join(p["text"] for p in pages)

        confidences = [word.confidence for p in result.pages
                       for block in p.blocks
                       for line in block.lines
                       for word in line.words
                       if word.confidence is not None]

        avg_conf = sum(confidences) / len(confidences) if confidences else None

        print(json.dumps({
            "level": "INFO",
            "message": "Document processed",
            "s3Key": s3_key,
            "inferenceTimeMs": int((time.time() - start) * 1000),
            "pageCount": len(pages),
            "averageConfidence": avg_conf,
        }))

        return {
            "inferenceType": "onnxtr",
            "extractedAt": datetime.utcnow().isoformat() + "Z",
            "pageCount": len(pages),
            "pages": pages,
            "fullText": full_text,
            "averageConfidence": avg_conf,
            "inferenceTimeMs": int((time.time() - start) * 1000),
            "modelInfo": {
                "detArch": _DET_ARCH,
                "recoArch": _RECO_ARCH,
            },
        }

    except Exception:
        print(json.dumps({
            "level": "ERROR",
            "message": "Document processing failed",
            "s3Key": s3_key,
            "duration_seconds": round(time.time() - start, 3),
            "exception": traceback.format_exc(),
        }))
        raise

    finally:
        if tmp_path and os.path.exists(tmp_path):
            try:
                os.remove(tmp_path)
            except Exception:
                pass
