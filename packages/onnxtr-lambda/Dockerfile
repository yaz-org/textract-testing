FROM public.ecr.aws/lambda/python:3.13 AS builder

RUN dnf install -y gcc gcc-c++ make python3-devel && dnf clean all

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

RUN uv pip install --system "onnxtr[cpu-headless]>=0.8" pillow requests --no-cache-dir

ENV ONNXTR_CACHE_DIR=/opt/onnxtr_cache
COPY export_models.py .
RUN python export_models.py

RUN find /var/lang/lib/python3.13/site-packages -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null; \
    find /var/lang/lib/python3.13/site-packages -name '*.pyc' -delete 2>/dev/null; \
    rm -rf /root/.cache 2>/dev/null; \
    dnf clean all 2>/dev/null; true


FROM public.ecr.aws/lambda/python:3.13

COPY --from=builder /var/lang/lib/python3.13/site-packages/. /var/lang/lib/python3.13/site-packages/
COPY --from=builder /opt/onnxtr_cache /opt/onnxtr_cache
RUN mkdir -p /opt/onnxtr_cache

ENV ONNXTR_CACHE_DIR=/tmp/onnxtr_cache

COPY handler.py ${LAMBDA_TASK_ROOT}/handler.py

CMD ["handler.lambda_handler"]
