import json
import os
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import requests

_DET_ARCH = "db_resnet50"
_RECO_ARCH = "parseq"
_MODEL_MANIFEST_VERSION = 1

_MODEL_CACHE_ROOT = Path(os.getenv("ONNXTR_CACHE_DIR", "/opt/onnxtr_cache"))
_MODEL_MANIFEST_PATH = Path(
    os.getenv("ONNXTR_MODEL_MANIFEST", str(_MODEL_CACHE_ROOT / "model-manifest.json"))
)
_MAX_DOCUMENT_BYTES = int(os.getenv("MAX_DOCUMENT_BYTES", str(20 * 1024 * 1024)))
_RECO_BATCH_SIZE = int(os.getenv("ONNXTR_RECO_BATCH_SIZE", "512"))
_DOWNLOAD_TIMEOUT = (5, 120)
_CALLBACK_TIMEOUT = (5, 30)
_FAILURE_CALLBACK_TIMEOUT = (5, 10)
_DOWNLOAD_CHUNK_BYTES = 1024 * 1024

_model = None
_cold_start = True
_http_session = requests.Session()


def _log(level: str, event: str, **fields: Any) -> None:
    print(json.dumps({"level": level, "event": event, **fields}, separators=(",", ":")))


def _model_paths() -> tuple[Path, Path]:
    cache_root = _MODEL_CACHE_ROOT.resolve()
    try:
        manifest = json.loads(_MODEL_MANIFEST_PATH.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise RuntimeError("OnnxTR model manifest is unavailable") from exc

    if manifest.get("version") != _MODEL_MANIFEST_VERSION:
        raise RuntimeError("Unsupported OnnxTR model manifest version")

    paths: dict[str, Path] = {}
    expected_arches = {"detector": _DET_ARCH, "recognizer": _RECO_ARCH}
    for role, expected_arch in expected_arches.items():
        model = manifest.get("models", {}).get(role)
        if not isinstance(model, dict) or model.get("arch") != expected_arch:
            raise RuntimeError(f"OnnxTR {role} manifest entry is invalid")

        relative_path = Path(str(model.get("path", "")))
        if relative_path.is_absolute() or ".." in relative_path.parts:
            raise RuntimeError(f"OnnxTR {role} path is invalid")

        model_path = (cache_root / relative_path).resolve()
        if not model_path.is_relative_to(cache_root) or not model_path.is_file():
            raise RuntimeError(f"OnnxTR {role} model is unavailable")

        expected_bytes = model.get("bytes")
        if not isinstance(expected_bytes, int) or model_path.stat().st_size != expected_bytes:
            raise RuntimeError(f"OnnxTR {role} model size does not match the build manifest")
        paths[role] = model_path

    return paths["detector"], paths["recognizer"]


def _create_model(detector_path: Path, recognizer_path: Path):
    from onnxtr.models import db_resnet50, ocr_predictor, parseq

    detector = db_resnet50(model_path=str(detector_path))
    recognizer = parseq(model_path=str(recognizer_path))
    return ocr_predictor(
        det_arch=detector,
        reco_arch=recognizer,
        assume_straight_pages=True,
        preserve_aspect_ratio=True,
        disable_page_orientation=True,
        disable_crop_orientation=True,
        det_bs=1,
        reco_bs=_RECO_BATCH_SIZE,
    )


def get_model():
    global _model
    if _model is not None:
        return _model

    started = time.perf_counter()
    _log("INFO", "model_init_started", detArch=_DET_ARCH, recoArch=_RECO_ARCH)
    detector_path, recognizer_path = _model_paths()
    manifest_ms = round((time.perf_counter() - started) * 1000)

    load_started = time.perf_counter()
    model = _create_model(detector_path, recognizer_path)
    load_ms = round((time.perf_counter() - load_started) * 1000)

    _model = model
    _log(
        "INFO",
        "model_init_completed",
        manifestMs=manifest_ms,
        loadModelMs=load_ms,
        totalMs=round((time.perf_counter() - started) * 1000),
        detArch=_DET_ARCH,
        recoArch=_RECO_ARCH,
    )
    return _model


def _geometry_to_list(geometry: Any) -> list[float]:
    return [
        float(geometry[0][0]),
        float(geometry[0][1]),
        float(geometry[1][0]),
        float(geometry[1][1]),
    ]


def _metadata_to_dict(metadata: Any) -> dict[str, Any]:
    if not isinstance(metadata, dict):
        return {"value": None, "confidence": None}
    value = metadata.get("value")
    confidence = metadata.get("confidence")
    return {
        "value": value.item() if hasattr(value, "item") else value,
        "confidence": float(confidence) if confidence is not None else None,
    }


def _artefact_to_dict(artefact: Any) -> dict[str, Any]:
    return {
        "type": str(artefact.type),
        "confidence": float(artefact.confidence),
        "geometry": _geometry_to_list(artefact.geometry),
    }


def _word_to_dict(word: Any, confidence_stats: list[float | int]) -> dict[str, Any]:
    confidence = float(word.confidence) if word.confidence is not None else None
    if confidence is not None:
        confidence_stats[0] += confidence
        confidence_stats[1] += 1
    return {
        "text": str(word.value),
        "confidence": confidence,
        "geometry": _geometry_to_list(word.geometry),
        "objectness_score": float(word.objectness_score),
        "crop_orientation": _metadata_to_dict(word.crop_orientation),
    }


def _line_to_dict(line: Any, confidence_stats: list[float | int]) -> dict[str, Any]:
    words = [_word_to_dict(word, confidence_stats) for word in line.words]
    return {
        "text": " ".join(word["text"] for word in words),
        "geometry": _geometry_to_list(line.geometry),
        "objectness_score": float(line.objectness_score),
        "words": words,
    }


def _block_to_dict(block: Any, confidence_stats: list[float | int]) -> dict[str, Any]:
    lines = [_line_to_dict(line, confidence_stats) for line in block.lines]
    artefacts = [_artefact_to_dict(artefact) for artefact in block.artefacts]
    return {
        "text": " ".join(line["text"] for line in lines),
        "objectness_score": float(block.objectness_score),
        "geometry": _geometry_to_list(block.geometry),
        "lines": lines,
        "artefacts": artefacts,
    }


def _page_to_dict(page: Any, confidence_stats: list[float | int]) -> dict[str, Any]:
    blocks = [_block_to_dict(block, confidence_stats) for block in page.blocks]
    return {
        "page_idx": int(page.page_idx),
        "dimensions": {"height": int(page.dimensions[0]), "width": int(page.dimensions[1])},
        "orientation": _metadata_to_dict(page.orientation),
        "language": _metadata_to_dict(page.language),
        "blocks": blocks,
        "text": " ".join(block["text"] for block in blocks),
    }


def _serialize_result(result: Any) -> tuple[list[dict[str, Any]], str, float | None, int]:
    confidence_stats: list[float | int] = [0.0, 0]
    pages = [_page_to_dict(page, confidence_stats) for page in result.pages]
    confidence_count = int(confidence_stats[1])
    average_confidence = (
        float(confidence_stats[0]) / confidence_count if confidence_count else None
    )
    return pages, "\n".join(page["text"] for page in pages), average_confidence, confidence_count


def _download_document(download_url: str) -> tuple[Path, int]:
    tmp_path = Path("/tmp") / f"{uuid.uuid4()}.image"
    document_bytes = 0s3

    try:
        with _http_session.get(
            download_url,
            timeout=_DOWNLOAD_TIMEOUT,
            stream=True,
            allow_redirects=False,
        ) as response:
            if 300 <= response.status_code < 400:
                raise requests.HTTPError("Document download redirects are disabled", response=response)
            response.raise_for_status()

            content_length = response.headers.get("Content-Length")
            if content_length is not None:
                try:
                    declared_bytes = int(content_length)
                except ValueError as exc:
                    raise ValueError("Document Content-Length is invalid") from exc
                if declared_bytes > _MAX_DOCUMENT_BYTES:
                    raise ValueError("Document exceeds MAX_DOCUMENT_BYTES")

            with tmp_path.open("wb") as destination:
                for chunk in response.iter_content(chunk_size=_DOWNLOAD_CHUNK_BYTES):
                    if not chunk:
                        continue
                    document_bytes += len(chunk)
                    if document_bytes > _MAX_DOCUMENT_BYTES:
                        raise ValueError("Document exceeds MAX_DOCUMENT_BYTES")
                    destination.write(chunk)
    except Exception:
        tmp_path.unlink(missing_ok=True)
        raise

    return tmp_path, document_bytes


def _post_callback(callback_url: str, payload: dict[str, Any], timeout: tuple[int, int]) -> None:
    with _http_session.post(
        callback_url,
        json=payload,
        timeout=timeout,
        allow_redirects=False,
        headers={"Content-Type": "application/json"},
    ) as response:
        if 300 <= response.status_code < 400:
            raise requests.HTTPError("Callback redirects are disabled", response=response)
        response.raise_for_status()


def _parse_record(record: dict[str, Any]) -> tuple[str, str]:
    body = json.loads(record["body"])
    if not isinstance(body, dict):
        raise ValueError("SQS record body must be an object")
    download_url = body.get("downloadUrl")
    callback_url = body.get("callbackUrl")
    if not isinstance(download_url, str) or not download_url:
        raise ValueError("downloadUrl must be a non-empty string")
    if not isinstance(callback_url, str) or not callback_url:
        raise ValueError("callbackUrl must be a non-empty string")
    return download_url, callback_url


def _safe_callback_url(record: dict[str, Any]) -> str | None:
    try:
        _, callback_url = _parse_record(record)
        return callback_url
    except (KeyError, TypeError, ValueError, json.JSONDecodeError):
        return None


def _process_record(record: dict[str, Any], context: Any, cold_start: bool) -> None:
    message_id = record.get("messageId")
    download_url, callback_url = _parse_record(record)
    tmp_path: Path | None = None
    total_started = time.perf_counter()

    _log(
        "INFO",
        "document_started",
        sqsMessageId=message_id,
        lambdaRequestId=getattr(context, "aws_request_id", None),
        coldStart=cold_start,
    )

    try:
        download_started = time.perf_counter()
        tmp_path, document_bytes = _download_document(download_url)
        download_ms = round((time.perf_counter() - download_started) * 1000)

        decode_started = time.perf_counter()
        from onnxtr.io import DocumentFile

        document = DocumentFile.from_images(str(tmp_path))
        decode_ms = round((time.perf_counter() - decode_started) * 1000)

        model = get_model()
        ocr_started = time.perf_counter()
        result = model(document)
        ocr_ms = round((time.perf_counter() - ocr_started) * 1000)

        serialize_started = time.perf_counter()
        pages, full_text, average_confidence, word_count = _serialize_result(result)
        serialization_ms = round((time.perf_counter() - serialize_started) * 1000)
        inference_ms = round((time.perf_counter() - total_started) * 1000)

        del result
        del document

        payload = {
            "success": True,
            "inferenceType": "onnxtr",
            "extractedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
            "pageCount": len(pages),
            "pages": pages,
            "fullText": full_text,
            "averageConfidence": average_confidence,
            "inferenceTimeMs": inference_ms,
            "modelInfo": {
                "detArch": _DET_ARCH,
                "recoArch": _RECO_ARCH,
            },
        }

        _log(
            "INFO",
            "document_processed",
            sqsMessageId=message_id,
            lambdaRequestId=getattr(context, "aws_request_id", None),
            downloadMs=download_ms,
            decodeMs=decode_ms,
            ocrMs=ocr_ms,
            serializationMs=serialization_ms,
            totalProcessingMs=inference_ms,
            documentBytes=document_bytes,
            pageCount=len(pages),
            wordCount=word_count,
            averageConfidence=average_confidence,
        )

        callback_started = time.perf_counter()
        _post_callback(callback_url, payload, _CALLBACK_TIMEOUT)
        _log(
            "INFO",
            "callback_completed",
            sqsMessageId=message_id,
            lambdaRequestId=getattr(context, "aws_request_id", None),
            callbackMs=round((time.perf_counter() - callback_started) * 1000),
        )
    finally:
        if tmp_path is not None:
            tmp_path.unlink(missing_ok=True)


def lambda_handler(event: dict[str, Any], context: Any) -> dict[str, list[dict[str, str]]]:
    global _cold_start
    invocation_cold_start = _cold_start
    _cold_start = False

    records = event.get("Records")
    if not isinstance(records, list):
        raise ValueError("Records must be an array")

    batch_item_failures: list[dict[str, str]] = []
    for index, record in enumerate(records):
        if not isinstance(record, dict):
            raise ValueError("Every SQS record must be an object")

        message_id = record.get("messageId")
        if not isinstance(message_id, str) or not message_id:
            raise ValueError("Every SQS record must have a non-empty messageId")

        try:
            _process_record(record, context, invocation_cold_start and index == 0)
        except Exception as exc:
            _log(
                "ERROR",
                "document_failed",
                sqsMessageId=message_id,
                lambdaRequestId=getattr(context, "aws_request_id", None),
                errorType=type(exc).__name__,
                retryable=True,
            )

            callback_url = _safe_callback_url(record)
            if callback_url is not None:
                try:
                    _post_callback(
                        callback_url,
                        {"success": False, "error": "Document processing failed."},
                        _FAILURE_CALLBACK_TIMEOUT,
                    )
                except Exception as callback_exc:
                    _log(
                        "ERROR",
                        "failure_callback_failed",
                        sqsMessageId=message_id,
                        lambdaRequestId=getattr(context, "aws_request_id", None),
                        errorType=type(callback_exc).__name__,
                    )

            batch_item_failures.append({"itemIdentifier": message_id})
            for unprocessed in records[index + 1 :]:
                unprocessed_id = unprocessed.get("messageId") if isinstance(unprocessed, dict) else None
                if not isinstance(unprocessed_id, str) or not unprocessed_id:
                    raise ValueError("Every unprocessed SQS record must have a non-empty messageId")
                batch_item_failures.append({"itemIdentifier": unprocessed_id})
            break

    return {"batchItemFailures": batch_item_failures}
