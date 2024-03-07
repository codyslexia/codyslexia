FROM rust:1.54 as builder

WORKDIR /usr/src/rustapi

COPY . .

RUN cargo install --path .

FROM debian:buster-slim

COPY --from=builder /usr/local/cargo/bin/rustapi /usr/local/bin/rustapi

CMD ["rustapi"]
