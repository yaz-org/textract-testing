FROM public.ecr.aws/lambda/python:3.13 AS builder

# Build tools + runtime shared libs (needed by torch/opencv at import time for model download)
RUN dnf install -y gcc gcc-c++ make python3-devel libxcb mesa-libGL && dnf clean all

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

COPY packages/core /tmp/core-extractor
RUN uv pip install --system /tmp/core-extractor --no-cache-dir

RUN uv pip install --system \
    --extra-index-url https://download.pytorch.org/whl/cpu \
    --index-strategy unsafe-best-match \
    python-doctr==1.0.1 torch boto3 pillow --no-cache-dir

ENV DOCTR_CACHE_DIR=/opt/doctr_cache
ENV DOCTR_MULTIPROCESSING_DISABLE=TRUE
COPY download_models.py .
RUN python download_models.py

# Remove torch test dirs (~90MB), __pycache__, .pyc, uv cache, dnf cache
RUN find /var/lang/lib/python3.13/site-packages -type d \( -name test -o -name tests -o -name benchmark -o -name benchmarks \) -exec rm -rf {} + 2>/dev/null; \
    find /var/lang/lib/python3.13/site-packages -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null; \
    find /var/lang/lib/python3.13/site-packages -name '*.pyc' -delete 2>/dev/null; \
    rm -rf /root/.cache 2>/dev/null; \
    dnf clean all 2>/dev/null; true


FROM public.ecr.aws/lambda/python:3.13

# Only runtime shared libraries (~10MB vs ~200MB for build tools)
RUN dnf install -y libxcb mesa-libGL && dnf clean all

ENV DOCTR_MULTIPROCESSING_DISABLE=TRUE
ENV DOCTR_CACHE_DIR=/tmp/doctr_cache

COPY --from=builder /var/lang/lib/python3.13/site-packages/. /var/lang/lib/python3.13/site-packages/
COPY --from=builder /opt/doctr_cache /opt/doctr_cache
COPY handler.py ${LAMBDA_TASK_ROOT}/handler.py

CMD ["handler.lambda_handler"]
