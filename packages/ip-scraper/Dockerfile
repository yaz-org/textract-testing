FROM golang:alpine AS go-builder
RUN apk add --no-cache git
RUN git clone https://github.com/n0madic/go-openvpn.git /build && \
    cd /build/cmd/openvpn2socks && \
    go mod download && \
    CGO_ENABLED=0 go build -o /usr/local/bin/openvpn2socks .

FROM public.ecr.aws/lambda/nodejs:22

RUN dnf install -y \
    nss \
    nspr \
    atk \
    cups-libs \
    libXcomposite \
    libXcursor \
    libXdamage \
    libXext \
    libXi \
    libXrandr \
    libXrender \
    libXtst \
    pango \
    cairo \
    gdk-pixbuf2 \
    && dnf clean all

COPY --from=go-builder /usr/local/bin/openvpn2socks /usr/local/bin/openvpn2socks

COPY package.json ./
RUN npm install --omit=dev

COPY src/ ./src/

CMD [ "src/handler.handler" ]
