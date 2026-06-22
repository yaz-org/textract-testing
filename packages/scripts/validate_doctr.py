"""
Validate docTR OCR against Pago Móvil payment receipt screenshots.

Runs docTR with the recommended model config on a sample of images
from exports/dream-team-images, extracts structured payment fields,
and prints a comparison table.

Usage:
    uv run validate_doctr.py

Environment variables:
    IMAGES_DIR: override the images directory path (default: ../exports/dream-team-images)
    SAMPLE_SIZE: number of images to process (0 = all, default: 0)
    DOCTR_NUM_THREADS: PyTorch CPU thread limit (0 = no cap, default: 0)
    MAX_WORKERS: parallel worker processes (0 = sequential, default: 0)
"""

from __future__ import annotations

import json
import os
import re
import shutil
import time
from concurrent.futures import ProcessPoolExecutor, as_completed
from multiprocessing import cpu_count
from pathlib import Path
from typing import Any

import torch
from core.extractor import (
    ExtractionResult,
    compute_average_confidence,
    extract_all_fields,
    extract_cedula,
    extract_phone,
    extract_phone_digits_only,
    extract_phone_loose,
    fuzzy_match_label,
    match_bank,
    normalize_text,
    score_receipt,
    strip_bank_code,
    VZLA_PHONE,
    MASKED_PHONE,
    LOOSE_PHONE,
    INTL_PHONE,
    CEDULA_PREFIXED,
    VZLA_AMOUNT,
    EMBEDDED_AMOUNT,
    DATE_PATTERN,
    SCORE_THRESHOLD,
)
from doctr.io import DocumentFile
from doctr.models import ocr_predictor
from rich.console import Console
from rich.table import Table

console = Console(width=180)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

_SCRIPT_DIR = Path(__file__).resolve().parent
IMAGES_DIR = Path(os.getenv("IMAGES_DIR", str(_SCRIPT_DIR / "../../exports/dream-team-images"))).resolve()
SAMPLE_SIZE = int(os.getenv("SAMPLE_SIZE", "0"))
DOCTR_NUM_THREADS = int(os.getenv("DOCTR_NUM_THREADS", "0"))
MAX_WORKERS = int(os.getenv("MAX_WORKERS", "0"))


# ---------------------------------------------------------------------------
# Model loading
# ---------------------------------------------------------------------------


def load_model():
    if DOCTR_NUM_THREADS > 0:
        torch.set_num_threads(DOCTR_NUM_THREADS)
        console.print(f"[dim]PyTorch threads capped at {DOCTR_NUM_THREADS} (DOCTR_NUM_THREADS)[/dim]")
    console.print("[bold]Loading docTR model...[/bold]")
    console.print("  Detection:      [cyan]db_mobilenet_v3_large[/cyan] (4.2M params)  # only DB detection available in docTR 1.0.1")
    console.print("  Recognition:    [cyan]crnn_mobilenet_v3_small[/cyan] (2.1M params)")
    console.print("  Assumptions:    straight pages, no orientation classification")
    console.print()

    model = ocr_predictor(
        det_arch="db_mobilenet_v3_large",  # only DB detection available in docTR 1.0.1
        reco_arch="crnn_mobilenet_v3_small",
        pretrained=True,
        assume_straight_pages=True,
        preserve_aspect_ratio=True,
        disable_page_orientation=True,
        disable_crop_orientation=True,
        det_bs=1,
    )

    console.print("[green]✓ Model loaded[/green]")

    # Warmup: dummy inference to trigger PyTorch JIT compilation
    console.print("  Warming up model...", end="")
    from PIL import Image
    from io import BytesIO
    buf = BytesIO()
    Image.new("RGB", (100, 100), "white").save(buf, format="JPEG")
    dummy = DocumentFile.from_images(buf.getvalue())
    model(dummy)
    console.print(" done")
    return model


# ---------------------------------------------------------------------------
# Multiprocessing worker
# ---------------------------------------------------------------------------


def process_batch(batch: list[Path]) -> list[dict]:
    """Process a batch of images in a worker process."""
    num_threads = int(os.getenv("DOCTR_NUM_THREADS", "0"))
    if num_threads > 0:
        torch.set_num_threads(num_threads)
    model = ocr_predictor(
        det_arch="db_mobilenet_v3_large",  # only DB detection available in docTR 1.0.1
        reco_arch="crnn_mobilenet_v3_small",
        pretrained=True,
        assume_straight_pages=True,
        preserve_aspect_ratio=True,
        disable_page_orientation=True,
        disable_crop_orientation=True,
        det_bs=1,
    )
    # Warmup
    from PIL import Image
    from io import BytesIO
    buf = BytesIO()
    Image.new("RGB", (100, 100), "white").save(buf, format="JPEG")
    dummy = DocumentFile.from_images(buf.getvalue())
    model(dummy)

    results: list[dict] = []
    for img_path in batch:
        entry: dict = {"path": img_path.name}
        try:
            doc = DocumentFile.from_images(str(img_path))
            start = time.time()
            result_doc = model(doc)
            elapsed = time.time() - start
            text_lines = result_doc.render().splitlines()
            text_lines = [t.strip() for t in text_lines if t.strip()]
            extraction = extract_all_fields(text_lines)
            avg_conf = compute_average_confidence(result_doc)
            extraction.confidence = avg_conf
            extraction.inference_time = elapsed
            if avg_conf is not None and avg_conf < 0.7:
                extraction.warnings.append("low_confidence")
            if extraction.score < SCORE_THRESHOLD:
                extraction.warnings.append("low_score")
            entry.update({
                "elapsed": elapsed,
                "extraction": extraction,
                "avg_conf": avg_conf,
                "text_lines": text_lines,
            })
        except Exception as e:
            entry["error"] = str(e)
        results.append(entry)
    return results


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------


def main():
    console.print()
    console.rule("[bold]docTR Validation — Pago Móvil Receipts[/bold]")
    console.print()

    # Directory check
    images_dir = IMAGES_DIR
    if not images_dir.exists():
        console.print(f"[red]✗ Images directory not found: {images_dir}[/red]")
        return

    ext_patterns = ("*.jpg", "*.jpeg", "*.png")
    all_images: list[Path] = []
    for ext in ext_patterns:
        all_images.extend(sorted(images_dir.glob(ext)))
    if not all_images:
        console.print(f"[red]✗ No images found in {images_dir}[/red]")
        return

    console.print(f"Found [cyan]{len(all_images)}[/cyan] images in [bold]{images_dir}[/bold]")

    # Determine which images to process
    if SAMPLE_SIZE > 0 and SAMPLE_SIZE < len(all_images):
        processed_images = all_images[:SAMPLE_SIZE]
        label = f"Processing first [cyan]{len(processed_images)}[/cyan] of [cyan]{len(all_images)}[/cyan] images"
    else:
        processed_images = all_images
        label = f"Processing all [cyan]{len(processed_images)}[/cyan] images"

    console.print(f"  {label}")
    console.print()

    main_start = time.time()
    all_results: list[dict] = []

    if MAX_WORKERS > 0:
        workers = min(MAX_WORKERS, len(processed_images))
        if int(os.getenv("DOCTR_NUM_THREADS", "0")) == 0:
            budget = max(4, 12 // max(1, workers))
            os.environ["DOCTR_NUM_THREADS"] = str(budget)
        batch_size = (len(processed_images) + workers - 1) // workers
        batches = [processed_images[i:i + batch_size] for i in range(0, len(processed_images), batch_size)]
        console.print(f"  Using [cyan]{workers}[/cyan] parallel workers, [cyan]{os.environ['DOCTR_NUM_THREADS']}[/cyan] threads each")
        console.print()

        with ProcessPoolExecutor(max_workers=workers) as executor:
            futures = {executor.submit(process_batch, batch): i for i, batch in enumerate(batches)}
            for future in as_completed(futures):
                try:
                    batch_results = future.result()
                    all_results.extend(batch_results)
                except Exception as e:
                    console.print(f"[red]✗ Worker failed: {e}[/red]")
        all_results.sort(key=lambda r: r["path"])
    else:
        model = load_model()
        for idx, img_path in enumerate(processed_images):
            rel_path = img_path.name
            entry: dict = {"path": rel_path}
            console.print(f"  [{idx + 1}/{len(processed_images)}] {rel_path} ...")
            try:
                doc = DocumentFile.from_images(str(img_path))
                start = time.time()
                result_doc = model(doc)
                elapsed = time.time() - start
                text_lines = result_doc.render().splitlines()
                text_lines = [t.strip() for t in text_lines if t.strip()]
                extraction = extract_all_fields(text_lines)
                avg_conf = compute_average_confidence(result_doc)
                extraction.confidence = avg_conf
                extraction.inference_time = elapsed
                if avg_conf is not None and avg_conf < 0.7:
                    extraction.warnings.append("low_confidence")
                if extraction.score < SCORE_THRESHOLD:
                    extraction.warnings.append("low_score")
                entry.update({
                    "elapsed": elapsed,
                    "extraction": extraction,
                    "avg_conf": avg_conf,
                    "text_lines": text_lines,
                })
            except Exception as e:
                entry["error"] = str(e)
            all_results.append(entry)
            c = entry.get("avg_conf")
            conf_display = f"{c:.0%}" if c is not None else "--"
            console.print(f"  [{idx + 1}/{len(processed_images)}] {rel_path} — {entry.get('elapsed', 0):.1f}s, score={entry.get('extraction', ExtractionResult()).score}, conf={conf_display}")

    # Build table
    results_table = Table(title="docTR Extraction Results", title_style="bold")
    results_table.add_column("Image", style="cyan", no_wrap=True)
    results_table.add_column("Score", style="yellow")
    results_table.add_column("Ref#", style="green")
    results_table.add_column("Amount", style="green")
    results_table.add_column("Date", style="green")
    results_table.add_column("Dest Phone", style="magenta")
    results_table.add_column("Dest Bank", style="magenta")
    results_table.add_column("Time", style="blue")
    results_table.add_column("Conf", style="blue")
    results_table.add_column("Lines", style="white")

    field_counts: dict[str, int] = {}
    total_time = 0.0
    total_conf = 0.0
    conf_count = 0
    valid_count = 0
    issues: list[str] = []
    processed_count = len(all_results)

    for data in all_results:
        rel_path = data["path"]
        if "error" in data:
            issues.append(f"{rel_path}: {data['error']}")
            results_table.add_row(rel_path, "ERR", "", "", "", "", "", "", "", "")
            continue

        elapsed = data["elapsed"]
        extraction = data["extraction"]
        avg_conf = data["avg_conf"]
        text_lines = data["text_lines"]

        total_time += elapsed
        if avg_conf is not None:
            total_conf += avg_conf
            conf_count += 1

        is_valid = extraction.status == "VALID"
        if is_valid:
            valid_count += 1

        for key in ["reference", "amount", "date", "phone"]:
            val = getattr(extraction, key, None)
            if val:
                field_counts[key] = field_counts.get(key, 0) + 1

        if extraction.destination_phone:
            field_counts["dest_phone"] = field_counts.get("dest_phone", 0) + 1
        if extraction.destination_bank:
            field_counts["dest_bank"] = field_counts.get("dest_bank", 0) + 1
        if extraction.destination_cedula:
            field_counts["dest_cedula"] = field_counts.get("dest_cedula", 0) + 1

        score_str = f"{extraction.score}" if is_valid else f"[dim]{extraction.score}[/dim]"
        ref_str = extraction.reference or "[dim]--[/dim]"
        amount_str = extraction.amount or "[dim]--[/dim]"
        date_str = extraction.date or "[dim]--[/dim]"
        dest_phone_str = extraction.destination_phone or "[dim]--[/dim]"
        dest_bank_str = extraction.destination_bank or "[dim]--[/dim]"
        time_str = f"{elapsed:.1f}s"
        conf_str = f"{avg_conf:.0%}" if avg_conf is not None else "[dim]--[/dim]"
        lines_str = str(len(text_lines))

        results_table.add_row(
            rel_path, score_str, ref_str, amount_str, date_str,
            dest_phone_str, dest_bank_str, time_str, conf_str, lines_str,
        )

        if avg_conf is not None and avg_conf < 0.7:
            issues.append(f"{rel_path}: low confidence ({avg_conf:.0%})")

    # Print results
    console.print()
    console.print(results_table)
    console.print()

    # Summary
    console.rule("[bold]Summary[/bold]")
    console.print()
    console.print(f"  Images processed      : {processed_count}")
    console.print(f"  Valid receipts        : {valid_count}/{processed_count} (score >= {SCORE_THRESHOLD})")
    console.print(f"  Average inference     : {total_time / processed_count:.1f}s")
    total_elapsed = time.time() - main_start
    console.print(f"  Total wall time      : {total_elapsed:.1f}s ({total_elapsed / processed_count:.1f}s avg)")
    console.print(f"  Average confidence    : {total_conf / conf_count:.0%}" if conf_count else "  Average confidence    : [dim]N/A[/dim]")
    console.print()
    console.print("  [bold]Field detection rates:[/bold]")
    for key in ["reference", "amount", "date", "dest_phone", "dest_bank", "dest_cedula"]:
        count = field_counts.get(key, 0)
        pct = count / processed_count * 100
        label = key.replace("_", " ").title()
        console.print(f"    {label:<15} : {count}/{processed_count} ({pct:.0f}%)")

    console.print()
    console.print(f"  Model: [cyan]db_mobilenet_v3_large[/cyan] + [cyan]crnn_mobilenet_v3_small[/cyan]  # only DB detection available in docTR 1.0.1")
    console.print(f"  Config: assume_straight_pages=True, orientation disabled")

    if issues:
        console.print()
        console.print(f"  [yellow]Issues flagged ({len(issues)}):[/yellow]")
        for issue in issues:
            console.print(f"    • {issue}")

    # -----------------------------------------------------------------------
    # Copy flawed images (score < 4) to exports/flawed for human review
    # -----------------------------------------------------------------------
    flawed_dir = IMAGES_DIR.parent / "flawed"
    if flawed_dir.exists():
        shutil.rmtree(flawed_dir)
    flawed_dir.mkdir(parents=True, exist_ok=True)
    flawed_count = 0
    for data in all_results:
        if "error" in data:
            continue
        extraction = data["extraction"]
        if extraction.score < SCORE_THRESHOLD:
            src = IMAGES_DIR / data["path"]
            dest = flawed_dir / src.name
            shutil.copy2(src, dest)
            flawed_count += 1
    if flawed_count > 0:
        console.print(f"  Copied {flawed_count} low-scoring images to [cyan]{flawed_dir}[/cyan] for review")

    console.print()
    console.rule()
    console.print()


if __name__ == "__main__":
    main()
