import { spawn } from 'child_process'
import { mkdir } from 'fs/promises'
import { logger } from '@nx/devkit'
import { resolve } from 'path'

import type { ExecutorContext } from '@nx/devkit'
import type { ChildProcessWithoutNullStreams } from 'child_process'
import type { DockerBuildExecutorSchema } from './schema'

import { compareAndWrite } from '../k8s/executor'
import { nodejsDockerfile } from './templates/nodejs-dockerfile'
import { DEFAULT_ORGANISATION, DEFAULT_REGISTRY } from '../../common/constants'

interface DockerBuildExecutorOptions extends DockerBuildExecutorSchema {
  dockerfileOutputPath: string
}

export default async function runExecutor(
  schema: DockerBuildExecutorSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  try {
    // Normalize options
    const options = normalizeOptions(schema, context)
    const dockerfileContent = nodejsDockerfile(options, context)
    const dockerfilePath = resolve(context.cwd, options.dockerfileOutputPath)

    // Create the directory for the Dockerfile, if it doesn't exist
    await mkdir(dockerfilePath.replace('/Dockerfile', ''), { recursive: true })

    // Write the Dockerfile to the file system
    await compareAndWrite(dockerfilePath, dockerfileContent)

    // Construct the docker build command
    const dockerBuildCommand = ['build', '-t', options.imageName, '-f', dockerfilePath, '.']

    // Spawn the build process
    const buildProcess: ChildProcessWithoutNullStreams = spawn('docker', dockerBuildCommand, {
      cwd: context.cwd,
      stdio: 'inherit',
    })

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

/**
 * Normalize options for the Docker build executor
 * @param options {DockerBuildExecutorSchema}
 * @param context {ExecutorContext}
 */
function normalizeOptions(
  options: DockerBuildExecutorSchema,
  context: ExecutorContext
): DockerBuildExecutorOptions {
  const registry = options.registry ?? DEFAULT_REGISTRY
  const organisation = options.organisation ?? DEFAULT_ORGANISATION

  const imageName =
    // user-provided fully qualified image name
    options.imageName ??
    // defaults to: ghcr.io/codyslexia/my-project-name
    [registry, organisation, context.projectName].join('/').toLowerCase()

  const relativeProjectRoot = context.projectGraph.nodes[context.projectName].data.root

  const workspaceNexaOutputPath = String('.nexa/').concat(relativeProjectRoot).concat('/Dockerfile')
  const standaloneNexaOutputPath = relativeProjectRoot.concat('/Dockerfile')

  const dockerfileOutputPath = options.standalone
    ? standaloneNexaOutputPath
    : workspaceNexaOutputPath

  const workspaceProjectOutputPath = String('dist/').concat(relativeProjectRoot)
  const standaloneProjectOutputPath = relativeProjectRoot.concat('/dist')

  const projectOutputPath = options.standalone
    ? standaloneProjectOutputPath
    : workspaceProjectOutputPath

  const outputPath = options.outputPath ?? projectOutputPath

  return {
    registry,
    organisation,
    imageName,
    outputPath,
    dockerfileOutputPath,
    ...options,
  }
}
