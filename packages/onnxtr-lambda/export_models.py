import hashlib
import json
import os
import re
from pathlib import Path

os.environ["ONNXTR_MULTIPROCESSING_DISABLE"] = "TRUE"

from onnxtr.models import ocr_predictor

DET_ARCH = "db_resnet50"
RECO_ARCH = "parseq"
MANIFEST_VERSION = 1
HASH_PATTERN = re.compile(r"-([a-f0-9]+)\.")

cache_root = Path(os.environ.get("ONNXTR_CACHE_DIR", "/opt/onnxtr_cache")).resolve()
cache_root.mkdir(parents=True, exist_ok=True)

predictor = ocr_predictor(
    det_arch=DET_ARCH,
    reco_arch=RECO_ARCH,
    assume_straight_pages=True,
    preserve_aspect_ratio=True,
    disable_page_orientation=True,
    disable_crop_orientation=True,
    det_bs=1,
    reco_bs=512,
)


def model_entry(arch: str, model_path: str) -> dict[str, str | int]:
    path = Path(model_path).resolve()
    if not path.is_file() or not path.is_relative_to(cache_root):
        raise RuntimeError(f"Model for {arch} was not exported into the expected cache")

    digest = hashlib.sha256()
    with path.open("rb") as model_file:
        for chunk in iter(lambda: model_file.read(1024 * 1024), b""):
            digest.update(chunk)
    sha256 = digest.hexdigest()

    expected_hash = HASH_PATTERN.search(path.name)
    if expected_hash is not None and not sha256.startswith(expected_hash.group(1)):
        raise RuntimeError(f"Model hash for {arch} does not match its release filename")

    return {
        "arch": arch,
        "path": str(path.relative_to(cache_root)),
        "bytes": path.stat().st_size,
        "sha256": sha256,
    }


manifest = {
    "version": MANIFEST_VERSION,
    "models": {
        "detector": model_entry(DET_ARCH, predictor.det_predictor.model.model_path),
        "recognizer": model_entry(RECO_ARCH, predictor.reco_predictor.model.model_path),
    },
}

manifest_path = cache_root / "model-manifest.json"
manifest_path.write_text(json.dumps(manifest, sort_keys=True, separators=(",", ":")), encoding="utf-8")

print(
    json.dumps(
        {
            "level": "INFO",
            "event": "build_model_cache_completed",
            "modelCount": len(manifest["models"]),
            "totalModelBytes": sum(model["bytes"] for model in manifest["models"].values()),
        },
        separators=(",", ":"),
    )
)
