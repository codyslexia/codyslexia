# use alpine linux as our 'base' image
FROM docker.io/node:22-alpine3.19 as base

# set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ENV NODE_ENV=production

# set pnpm environment variables
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# enable corepack for faster installs
RUN corepack enable

# install os dependencies
RUN apk add --no-cache tini

# set current directory
WORKDIR /app

# create 'base' entrypoint
ENTRYPOINT [ "/sbin/tini", "--" ]

# create 'runner' image
FROM base AS runner

# create a system group and user for the service
RUN addgroup --system project-api && \
  adduser --system -G project-api nonroot

# copy the compiled app to the 'runner' image
COPY dist/apps/backend/projects/manager project-api

# recursively change ownership of the app to the non-root user
RUN chown -R nonroot:project-api . && \
  # set read and execute permissions for directories
  find . -type d -exec chmod 500 {} \; && \
  # set read permissions for files
  find . -type f -exec chmod 400 {} \;

# install app dependencies
RUN pnpm --prefix project-api install --prod --silent

# install process manager
RUN pnpm install -g pm2 --silent

# run as non-root user
USER nonroot

# ephemeral port
EXPOSE $PORT

# run process 'project-api' in watch mode
CMD [ "pm2-runtime", "project-api", "--watch" ]
