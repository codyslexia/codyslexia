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

# run as non-root user
USER goapi

# ephemeral port
EXPOSE $PORT

# run 'goapi' in production mode
CMD [ "./goapi" ]
