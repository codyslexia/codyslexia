# [base]
FROM golang:1.20-alpine AS base

RUN apk add --no-cache tini

WORKDIR /app

ENTRYPOINT [ "/sbin/tini", "--" ]

# [builder]
FROM base AS builder

COPY go.mod .

RUN go mod download

COPY . .

RUN go build -o main

# [runner]
FROM base AS runner

WORKDIR /

RUN adduser -D -s /bin/ash nonroot

WORKDIR /home/nonroot/app

COPY --chown=nonroot:nonroot --from=builder /app/static ./static
COPY --chown=nonroot:nonroot --from=builder /app/main ./

USER nonroot

EXPOSE 3000

CMD [ "/home/nonroot/app/main" ]
