ARG LAMBDA_BASE=public.ecr.aws/lambda/python:3.13@sha256:4044117827ca7f22a639ef4dfaaa921919527f9e5db137552df95ac2d04e118c

FROM ${LAMBDA_BASE} AS builder

COPY --from=ghcr.io/astral-sh/uv:0.11.16@sha256:440fd6477af86a2f1b38080c539f1672cd22acb1b1a47e321dba5158ab08864d /uv /usr/local/bin/uv
COPY requirements.txt /tmp/requirements.txt
RUN uv pip install \
    --system \
    --require-hashes \
    --no-cache \
    --requirements /tmp/requirements.txt

ENV ONNXTR_CACHE_DIR=/opt/onnxtr_cache
COPY export_models.py /tmp/export_models.py
RUN python /tmp/export_models.py

RUN find /var/lang/lib/python3.13/site-packages -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null; \
    find /var/lang/lib/python3.13/site-packages -name '*.pyc' -delete 2>/dev/null; \
    rm -rf /root/.cache /tmp/requirements.txt /tmp/export_models.py


FROM ${LAMBDA_BASE}

COPY --from=builder /var/lang/lib/python3.13/site-packages/. /var/lang/lib/python3.13/site-packages/
COPY --from=builder /opt/onnxtr_cache /opt/onnxtr_cache

ENV ONNXTR_CACHE_DIR=/opt/onnxtr_cache \
    ONNXTR_MODEL_MANIFEST=/opt/onnxtr_cache/model-manifest.json \
    ONNXTR_MULTIPROCESSING_DISABLE=TRUE

COPY handler.py ${LAMBDA_TASK_ROOT}/handler.py

CMD ["handler.lambda_handler"]
