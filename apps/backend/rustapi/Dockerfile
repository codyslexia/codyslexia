# [builder]
FROM rust:alpine3.19 AS builder

WORKDIR /usr/src/

RUN apk add --no-cache musl-dev ca-certificates cmake musl-utils libressl-dev

RUN rustup target add x86_64-unknown-linux-musl

RUN USER=root cargo new rustapi

WORKDIR /usr/src/rustapi

COPY Cargo.toml ./

RUN RUSTFLAGS='-C target-cpu=native' cargo build --release

COPY src ./src

ENV PKG_CONFIG_ALLOW_CROSS=1

RUN cargo install --target x86_64-unknown-linux-musl --path .

RUN addgroup --system rustapi && \
  adduser --system -G rustapi rustapi

# [compressor]
FROM alpine:3.19 AS compressor

WORKDIR /usr/app

RUN apk add --no-cache upx binutils

COPY --from=builder /usr/local/cargo/bin/rustapi .

RUN strip rustapi -o app-striped

RUN upx app-striped --best --lzma -o app

# [runner]
FROM scratch

COPY --from=builder /etc/passwd /etc/passwd
COPY --from=compressor /usr/app/app .

USER rustapi

EXPOSE 3000

CMD ["./app"]
