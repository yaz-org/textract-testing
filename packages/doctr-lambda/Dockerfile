FROM public.ecr.aws/lambda/python:3.13

# Install build tools and runtime libraries required for docTR/PyTorch
RUN dnf install -y gcc gcc-c++ make python3-devel libxcb mesa-libGL && dnf clean all

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Install the shared core-extractor package (from workspace in Docker build context)
COPY packages/core /tmp/core-extractor
RUN uv pip install --system /tmp/core-extractor --no-cache-dir

# Install docTR and runtime deps (CPU-only torch from pytorch-cpu index)
RUN uv pip install --system \
    --extra-index-url https://download.pytorch.org/whl/cpu \
    --index-strategy unsafe-best-match \
    python-doctr==1.0.1 \
    torch \
    boto3 \
    pillow \
    --no-cache-dir

# docTR Lambda runtime requirements
ENV DOCTR_MULTIPROCESSING_DISABLE=TRUE
ENV DOCTR_CACHE_DIR=/opt/doctr_cache

# Pre-download model weights at build time so cold starts don't fetch from internet
COPY download_models.py .
RUN python download_models.py

# Copy the Lambda handler
COPY handler.py ${LAMBDA_TASK_ROOT}/handler.py

CMD ["handler.lambda_handler"]
