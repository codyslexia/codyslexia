import { spawn } from 'child_process'
import { logger } from '@nx/devkit'
import { resolve } from 'path'

import type { ExecutorContext } from '@nx/devkit'
import type { ChildProcessWithoutNullStreams } from 'child_process'
import type { DockerBuildExecutorSchema } from './schema'

import { compareAndWrite } from '../k8s/executor'

export default async function runExecutor(
  { registry = 'ghcr.io', organisation = 'codyslexia', ...options }: DockerBuildExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  try {
    const dockerfileContent = `# use alpine linux as our 'base' image
FROM docker.io/node:22.2.0-alpine3.19

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

    const dockerImageName =
      // <imageName>
      options.imageName ??
      // ghcr.io/codyslexia/sandbox
      `${registry}/${organisation}/${context.projectName}` ??
      // ghcr.io/codyslexia/sandbox
      [registry, organisation, context.projectName].join('/').toLowerCase()

    const dockerfilePath = resolve(context.cwd, `.nexa/${context.projectName}/Dockerfile`)
    // await writeFile(dockerfilePath, dockerfileContent)

    await compareAndWrite(dockerfilePath, dockerfileContent)

    // Construct the docker build command
    const dockerBuildCommand = ['docker', 'build', '-t', dockerImageName, '-f', dockerfilePath, '.']

    // Spawn the build process
    const buildProcess: ChildProcessWithoutNullStreams = spawn(
      dockerBuildCommand[0],
      dockerBuildCommand.slice(1),
      { cwd: context.cwd, stdio: 'inherit' }
    )

    // Wait for the build process to exit
    await new Promise<void>((resolve, reject) => {
      buildProcess.on('close', (code) => {
        if (code === 0) {
          resolve()
        } else {
          reject(new Error(`Docker build failed with code ${code}`))
        }
      })
    })

    // Clean up temporary Dockerfile
    // await unlink(dockerfilePath)

    return { success: true }
  } catch (error) {
    logger.error(error.message)
    return { success: false }
  }
}
