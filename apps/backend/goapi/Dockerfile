# [base]
FROM golang:alpine3.19

# set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000

# install os dependencies
RUN apk add --no-cache tini

# set current directory
WORKDIR /app

# create 'base' entrypoint
ENTRYPOINT [ "/sbin/tini", "--" ]

# create a system group and user for the service
RUN addgroup --system goapi && \
  adduser --system -G goapi goapi

# copy the compiled app to the 'runner' image
COPY dist/apps/backend/goapi .

# recursively change ownership of the app to the non-root user
RUN chown -R goapi:goapi .

# run as non-root user
USER goapi

# ensure the app is executable
RUN chmod +x goapi

# ephemeral port
EXPOSE $PORT

# run 'goapi' in watch mode
CMD [ "./goapi" ]
