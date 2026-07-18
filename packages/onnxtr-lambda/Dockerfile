ARG LAMBDA_BASE=public.ecr.aws/lambda/python:3.13@sha256:4044117827ca7f22a639ef4dfaaa921919527f9e5db137552df95ac2d04e118c
ARG ONNXTR_BYTECODE_MODE=stripped

FROM ${LAMBDA_BASE} AS builder

COPY --from=ghcr.io/astral-sh/uv:0.11.16@sha256:440fd6477af86a2f1b38080c539f1672cd22acb1b1a47e321dba5158ab08864d /uv /usr/local/bin/uv
COPY handler.py export_models.py /tmp/source-check/
RUN python -m py_compile /tmp/source-check/handler.py /tmp/source-check/export_models.py

COPY requirements.txt /tmp/requirements.txt
RUN uv pip install \
    --system \
    --require-hashes \
    --no-cache \
    --requirements /tmp/requirements.txt

ENV ONNXTR_CACHE_DIR=/opt/onnxtr_cache
COPY export_models.py /tmp/export_models.py
RUN python /tmp/export_models.py

ARG ONNXTR_BYTECODE_MODE
RUN bytecode_mode="${ONNXTR_BYTECODE_MODE}"; \
    test "${bytecode_mode}" = stripped || test "${bytecode_mode}" = precompiled; \
    find /var/lang/lib/python3.13/site-packages -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null; \
    find /var/lang/lib/python3.13/site-packages -name '*.pyc' -delete 2>/dev/null; \
    rm -rf /root/.cache /tmp/requirements.txt /tmp/export_models.py /tmp/source-check


FROM ${LAMBDA_BASE}

COPY --from=builder /var/lang/lib/python3.13/site-packages/. /var/lang/lib/python3.13/site-packages/
COPY --from=builder /opt/onnxtr_cache /opt/onnxtr_cache

ENV ONNXTR_CACHE_DIR=/opt/onnxtr_cache \
    ONNXTR_MODEL_MANIFEST=/opt/onnxtr_cache/model-manifest.json \
    ONNXTR_MULTIPROCESSING_DISABLE=TRUE

COPY handler.py ${LAMBDA_TASK_ROOT}/handler.py
ARG ONNXTR_BYTECODE_MODE
RUN bytecode_mode="${ONNXTR_BYTECODE_MODE}"; \
    test "${bytecode_mode}" = stripped || test "${bytecode_mode}" = precompiled; \
    printf '%s\n' "${bytecode_mode}" > /opt/onnxtr-bytecode-mode; \
    python -c 'from pathlib import Path; [path.unlink() for root in (Path("/var/lang/lib/python3.13/site-packages"), Path("/var/task")) for path in root.rglob("*.pyc")]'; \
    if test "${bytecode_mode}" = precompiled; then \
        python -m compileall -q --invalidation-mode=unchecked-hash /var/lang/lib/python3.13/site-packages ${LAMBDA_TASK_ROOT}/handler.py; \
    fi

CMD ["handler.lambda_handler"]
