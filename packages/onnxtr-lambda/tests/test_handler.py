import hashlib
import hmac
import json
import os
import sys
import tempfile
import unittest
import uuid
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import Mock, patch

PACKAGE_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PACKAGE_ROOT))

import handler


class FakeResponse:
    def __init__(self, chunks=(), *, status_code=200, headers=None):
        self._chunks = list(chunks)
        self.status_code = status_code
        self.headers = headers or {}

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, traceback):
        return False

    def raise_for_status(self):
        if self.status_code >= 400:
            raise RuntimeError(f"HTTP {self.status_code}")

    def iter_content(self, chunk_size):
        del chunk_size
        yield from self._chunks


def make_manifest(cache_root: Path) -> Path:
    detector = cache_root / "models" / "detector.onnx"
    recognizer = cache_root / "models" / "recognizer.onnx"
    detector.parent.mkdir(parents=True)
    detector.write_bytes(b"detector")
    recognizer.write_bytes(b"recognizer")
    manifest = {
        "version": 1,
        "models": {
            "detector": {
                "arch": "db_resnet50",
                "path": "models/detector.onnx",
                "bytes": detector.stat().st_size,
                "sha256": "unused-at-runtime",
            },
            "recognizer": {
                "arch": "parseq",
                "path": "models/recognizer.onnx",
                "bytes": recognizer.stat().st_size,
                "sha256": "unused-at-runtime",
            },
        },
    }
    manifest_path = cache_root / "model-manifest.json"
    manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
    return manifest_path


class SerializationTests(unittest.TestCase):
    def test_serializes_hierarchy_and_confidence_in_one_pass(self):
        word_one = SimpleNamespace(
            value="hello",
            confidence=0.8,
            geometry=((0.1, 0.2), (0.3, 0.4)),
            objectness_score=0.9,
            crop_orientation={"value": 0, "confidence": None},
        )
        word_two = SimpleNamespace(
            value="world",
            confidence=None,
            geometry=((0.4, 0.2), (0.7, 0.4)),
            objectness_score=0.7,
            crop_orientation={"value": 0, "confidence": None},
        )
        line = SimpleNamespace(
            words=[word_one, word_two],
            geometry=((0.1, 0.2), (0.7, 0.4)),
            objectness_score=0.85,
        )
        artefact = SimpleNamespace(
            type="qr_code",
            confidence=0.6,
            geometry=((0.0, 0.0), (0.1, 0.1)),
        )
        block = SimpleNamespace(
            lines=[line],
            artefacts=[artefact],
            geometry=((0.1, 0.2), (0.7, 0.4)),
            objectness_score=0.85,
        )
        page = SimpleNamespace(
            page_idx=0,
            dimensions=(1200, 600),
            orientation={"value": None, "confidence": None},
            language={"value": None, "confidence": None},
            blocks=[block],
        )

        pages, full_text, average_confidence, confidence_count = handler._serialize_result(
            SimpleNamespace(pages=[page])
        )

        self.assertEqual(full_text, "hello world")
        self.assertEqual(average_confidence, 0.8)
        self.assertEqual(confidence_count, 1)
        self.assertEqual(pages[0]["dimensions"], {"height": 1200, "width": 600})
        self.assertEqual(pages[0]["blocks"][0]["lines"][0]["text"], "hello world")
        self.assertEqual(pages[0]["blocks"][0]["artefacts"][0]["type"], "qr_code")

    def test_empty_result_has_no_average_confidence(self):
        pages, full_text, average_confidence, confidence_count = handler._serialize_result(
            SimpleNamespace(pages=[])
        )
        self.assertEqual(pages, [])
        self.assertEqual(full_text, "")
        self.assertIsNone(average_confidence)
        self.assertEqual(confidence_count, 0)


class ModelLifecycleTests(unittest.TestCase):
    def setUp(self):
        self.original_model = handler._model

    def tearDown(self):
        handler._model = self.original_model

    def test_model_paths_use_verified_baked_manifest(self):
        with tempfile.TemporaryDirectory() as directory:
            cache_root = Path(directory)
            manifest_path = make_manifest(cache_root)
            with (
                patch.object(handler, "_MODEL_CACHE_ROOT", cache_root),
                patch.object(handler, "_MODEL_MANIFEST_PATH", manifest_path),
            ):
                detector, recognizer = handler._model_paths()

            self.assertEqual(detector, cache_root / "models" / "detector.onnx")
            self.assertEqual(recognizer, cache_root / "models" / "recognizer.onnx")

    def test_model_paths_reject_runtime_size_mismatch(self):
        with tempfile.TemporaryDirectory() as directory:
            cache_root = Path(directory)
            manifest_path = make_manifest(cache_root)
            (cache_root / "models" / "detector.onnx").write_bytes(b"changed")
            with (
                patch.object(handler, "_MODEL_CACHE_ROOT", cache_root),
                patch.object(handler, "_MODEL_MANIFEST_PATH", manifest_path),
            ):
                with self.assertRaisesRegex(RuntimeError, "size does not match"):
                    handler._model_paths()

    def test_model_is_created_once_per_execution_environment(self):
        with tempfile.TemporaryDirectory() as directory:
            cache_root = Path(directory)
            manifest_path = make_manifest(cache_root)
            model = object()
            handler._model = None
            with (
                patch.object(handler, "_MODEL_CACHE_ROOT", cache_root),
                patch.object(handler, "_MODEL_MANIFEST_PATH", manifest_path),
                patch.object(handler, "_create_model", return_value=model) as create_model,
                patch.object(handler, "_log"),
            ):
                self.assertIs(handler.get_model(), model)
                self.assertIs(handler.get_model(), model)

            create_model.assert_called_once()


class DownloadTests(unittest.TestCase):
    def test_download_streams_chunks_and_reports_size(self):
        session = Mock()
        session.get.return_value = FakeResponse([b"abc", b"def"], headers={"Content-Length": "6"})
        with patch.object(handler, "_http_session", session):
            path, byte_count = handler._download_document("https://example.invalid/document")
        try:
            self.assertEqual(path.read_bytes(), b"abcdef")
            self.assertEqual(byte_count, 6)
            session.get.assert_called_once_with(
                "https://example.invalid/document",
                timeout=handler._DOWNLOAD_TIMEOUT,
                stream=True,
                allow_redirects=False,
            )
        finally:
            path.unlink(missing_ok=True)

    def test_download_removes_partial_file_when_stream_limit_is_exceeded(self):
        session = Mock()
        session.get.return_value = FakeResponse([b"abc", b"def"])
        partial_path = Path("/tmp/oversize-test.image")
        partial_path.unlink(missing_ok=True)
        with (
            patch.object(handler, "_http_session", session),
            patch.object(handler, "_MAX_DOCUMENT_BYTES", 5),
            patch.object(handler.uuid, "uuid4", return_value="oversize-test"),
        ):
            with self.assertRaisesRegex(ValueError, "MAX_DOCUMENT_BYTES"):
                handler._download_document("https://example.invalid/document")
        self.assertFalse(partial_path.exists())


class CallbackSigningTests(unittest.TestCase):
    SECRET_HEX = "11" * 32

    def test_uuid7_has_expected_timestamp_version_and_variant(self):
        timestamp_ms = 1_784_320_000_123
        event_id = handler._uuid7(timestamp_ms, bytes(range(10)))

        self.assertEqual(event_id.version, 7)
        self.assertEqual(event_id.variant, uuid.RFC_4122)
        self.assertEqual(int.from_bytes(event_id.bytes[:6], "big"), timestamp_ms)

    def test_post_callback_signs_the_exact_utf8_body_sent(self):
        session = Mock()
        session.post.return_value = FakeResponse()
        payload = {"message": "Línea \"uno\"\nsegunda\\línea", "success": True}
        timestamp = 1_784_320_000
        event_id = uuid.UUID("018f47a2-4d6b-7c8d-9e0f-123456789abc")

        with (
            patch.object(handler, "_http_session", session),
            patch.dict(os.environ, {"CFF_HMAC_SECRET_HEX": self.SECRET_HEX}),
            patch.object(handler.time, "time", return_value=timestamp),
            patch.object(handler, "_uuid7", return_value=event_id),
        ):
            handler._post_callback(
                "https://callback.invalid/document",
                payload,
                handler._CALLBACK_TIMEOUT,
            )

        session.post.assert_called_once()
        args, kwargs = session.post.call_args
        self.assertEqual(args, ("https://callback.invalid/document",))
        self.assertNotIn("json", kwargs)
        self.assertIsInstance(kwargs["data"], bytes)
        self.assertEqual(
            kwargs["data"],
            json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode(
                "utf-8"
            ),
        )
        self.assertEqual(
            kwargs["headers"],
            {
                "Content-Type": "application/json",
                "x-cff-timestamp": str(timestamp),
                "x-cff-event-id": str(event_id),
                "x-cff-signature": kwargs["headers"]["x-cff-signature"],
            },
        )

        signing_input = (
            f"{timestamp}.{event_id}.".encode("ascii") + kwargs["data"]
        )
        expected_signature = hmac.new(
            bytes.fromhex(self.SECRET_HEX),
            signing_input,
            hashlib.sha256,
        ).hexdigest()
        self.assertEqual(
            kwargs["headers"]["x-cff-signature"],
            f"v1={expected_signature}",
        )
        self.assertRegex(expected_signature, r"^[0-9a-f]{64}$")

    def test_invalid_secrets_do_not_send_a_callback(self):
        invalid_values = (None, "", "ab" * 31, "ab" * 33, "z" * 64)
        for secret_hex in invalid_values:
            with self.subTest(secret_hex=secret_hex):
                session = Mock()
                environment = (
                    {} if secret_hex is None else {"CFF_HMAC_SECRET_HEX": secret_hex}
                )
                with (
                    patch.object(handler, "_http_session", session),
                    patch.dict(os.environ, environment, clear=True),
                ):
                    with self.assertRaisesRegex(RuntimeError, "CFF_HMAC_SECRET_HEX"):
                        handler._post_callback(
                            "https://callback.invalid/document",
                            {"success": False},
                            handler._FAILURE_CALLBACK_TIMEOUT,
                        )
                session.post.assert_not_called()

    def test_failure_path_uses_the_signed_callback_sender(self):
        record = {
            "messageId": "failed-document",
            "body": json.dumps(
                {
                    "downloadUrl": "https://download.invalid/document",
                    "callbackUrl": "https://callback.invalid/document",
                }
            ),
        }
        session = Mock()
        session.post.return_value = FakeResponse()
        with (
            patch.object(handler, "_http_session", session),
            patch.dict(os.environ, {"CFF_HMAC_SECRET_HEX": self.SECRET_HEX}),
            patch.object(handler, "_process_record", side_effect=RuntimeError("failed")),
            patch.object(handler, "_log"),
        ):
            response = handler.lambda_handler({"Records": [record]}, None)

        self.assertEqual(
            response,
            {"batchItemFailures": [{"itemIdentifier": "failed-document"}]},
        )
        session.post.assert_called_once()
        self.assertEqual(
            json.loads(session.post.call_args.kwargs["data"]),
            {"success": False, "error": "Document processing failed."},
        )
        self.assertIn("x-cff-signature", session.post.call_args.kwargs["headers"])


class HandlerContractTests(unittest.TestCase):
    def setUp(self):
        self.original_cold_start = handler._cold_start

    def tearDown(self):
        handler._cold_start = self.original_cold_start

    def test_successful_direct_invoke_uses_sqs_shaped_event(self):
        event = {"Records": [{"messageId": "benchmark-1", "body": "{}"}]}
        with patch.object(handler, "_process_record") as process_record:
            response = handler.lambda_handler(event, SimpleNamespace(aws_request_id="request-1"))
        self.assertEqual(response, {"batchItemFailures": []})
        process_record.assert_called_once()

    def test_fifo_batch_stops_after_first_failure_and_returns_unprocessed_ids(self):
        records = [
            {"messageId": "one", "body": "{}"},
            {"messageId": "two", "body": "{}"},
            {"messageId": "three", "body": "{}"},
        ]
        with (
            patch.object(handler, "_process_record", side_effect=RuntimeError("failed")) as process_record,
            patch.object(handler, "_safe_callback_url", return_value=None),
            patch.object(handler, "_log"),
        ):
            response = handler.lambda_handler(
                {"Records": records}, SimpleNamespace(aws_request_id="request-1")
            )

        self.assertEqual(
            response,
            {
                "batchItemFailures": [
                    {"itemIdentifier": "one"},
                    {"itemIdentifier": "two"},
                    {"itemIdentifier": "three"},
                ]
            },
        )
        process_record.assert_called_once()

    def test_missing_message_id_fails_the_complete_invocation(self):
        with self.assertRaisesRegex(ValueError, "messageId"):
            handler.lambda_handler({"Records": [{"body": "{}"}]}, None)


if __name__ == "__main__":
    unittest.main()
