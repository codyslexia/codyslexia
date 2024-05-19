import { ExecutorContext } from '@nx/devkit'
import type { DockerBuildExecutorSchema } from '../schema'
import { NODEJS_DEFAULT_IMAGE } from '../../../common/constants'

export interface NodeJsDockerfileSchema extends DockerBuildExecutorSchema {
  projectName: string
}

function normalizeOptions(
  options: DockerBuildExecutorSchema,
  context: ExecutorContext
): NodeJsDockerfileSchema {
  return {
    baseDockerImage: options.baseDockerImage ?? NODEJS_DEFAULT_IMAGE,
    projectName: context.projectName,
    ...options,
  }
}

export function nodejsDockerfile(opts: DockerBuildExecutorSchema, context: ExecutorContext) {
  const options = normalizeOptions(opts, context)

  return `# set image
FROM ${options.baseDockerImage}

# set args
ARG HOST
ARG PORT
ARG APP_NAME
ARG NODE_ENV

# set environment variables
ENV HOST 0.0.0.0
ENV PORT 3000
ENV APP_NAME ${context.projectName}
ENV NODE_ENV production

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

# create a system group and user for the service
RUN addgroup --system ${context.projectName} && \\
  adduser --system -G ${context.projectName} ${context.projectName}

# copy the compiled app to the 'runner' image
COPY ${options.outputPath} ${context.projectName}

# recursively change ownership of the app to the non-root user
RUN chown -R ${context.projectName}:${context.projectName} . && \\
  # set read and execute permissions for directories
  find . -type d -exec chmod 500 {} \\; && \\
  # set read permissions for files
  find . -type f -exec chmod 400 {} \\;

# install app dependencies
RUN pnpm --prefix ${context.projectName} install --prod --silent

# install process manager
RUN pnpm install -g pm2 --silent

# set labels
LABEL org.opencontainers.image.title="${context.projectName}"

# run as non-root user
USER ${context.projectName}

# ephemeral port
EXPOSE $PORT

# run process '${context.projectName}' in watch mode
CMD [ "pm2-runtime", "${context.projectName}", "--watch" ]
`
}
