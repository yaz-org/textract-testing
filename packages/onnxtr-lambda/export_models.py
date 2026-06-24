import json
import os

os.environ["ONNXTR_MULTIPROCESSING_DISABLE"] = "TRUE"

from onnxtr.models import ocr_predictor

cache_dir = os.environ.get("ONNXTR_CACHE_DIR", "/opt/onnxtr_cache")

ocr_predictor(
    det_arch="db_resnet50",
    reco_arch="parseq",
    assume_straight_pages=True,
    preserve_aspect_ratio=True,
    disable_page_orientation=True,
    disable_crop_orientation=True,
    det_bs=1,
)

cache_stats = {"file_count": 0, "total_size_kb": 0, "files": []}
if os.path.exists(cache_dir):
    for root, dirs, files in os.walk(cache_dir):
        for f in files:
            fp = os.path.join(root, f)
            cache_stats["file_count"] += 1
            cache_stats["total_size_kb"] += os.path.getsize(fp) / 1024
            cache_stats["files"].append(f)

print(json.dumps({"level": "INFO", "message": "Build-time model cache", "cache_dir": cache_dir, "cache": cache_stats}))
