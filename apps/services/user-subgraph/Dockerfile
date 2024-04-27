# use alpine linux as our 'base' image
FROM docker.io/node:lts-alpine as base

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
RUN addgroup --system backend-users-graphql && \
  adduser --system -G backend-users-graphql nonroot 

# copy the compiled app to the 'runner' image
COPY dist/apps/backend/projects/graphql backend-users-graphql

# recursively change ownership of the app to the non-root user
RUN chown -R nonroot:backend-users-graphql . && \
# set read and execute permissions for directories
  find . -type d -exec chmod 500 {} \; && \
# set read permissions for files
  find . -type f -exec chmod 400 {} \;

# install app dependencies
RUN pnpm --prefix backend-users-graphql install --prod --silent

# install process manager
RUN pnpm install -g pm2 --silent

# run as non-root user
USER nonroot

# ephemeral port
EXPOSE $PORT

# run process 'backend-users-graphql' in watch mode
CMD [ "pm2-runtime", "backend-users-graphql", "--watch" ]
