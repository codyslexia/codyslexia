# [builder]
FROM docker.io/alpine:3.20 AS builder

# create a system group and user for the service
RUN addgroup --system goapi && \
  adduser --system -G goapi goapi

# [runner]
FROM scratch

# set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV GOTRACEBACK=single

# set current directory
WORKDIR /app

# copy the compiled app to the 'runner' image
COPY dist/apps/backend/goapi .

# copy the /etc/passwd file from the 'builder' image
COPY --from=builder /etc/passwd /etc/passwd

# set user to 'goapi'
USER goapi

# ephemeral port
EXPOSE $PORT

# run 'goapi' in production mode
CMD [ "./goapi" ]
