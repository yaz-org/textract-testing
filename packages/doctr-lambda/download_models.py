import os

os.environ["DOCTR_MULTIPROCESSING_DISABLE"] = "TRUE"

from doctr.models import ocr_predictor

ocr_predictor(
    det_arch="db_mobilenet_v3_large",
    reco_arch="crnn_mobilenet_v3_small",
    pretrained=True,
    assume_straight_pages=True,
    preserve_aspect_ratio=True,
    disable_page_orientation=True,
    disable_crop_orientation=True,
    det_bs=1,
)
