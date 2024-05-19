import { spawn } from 'child_process'
import { logger } from '@nx/devkit'
import { resolve } from 'path'
import { mkdir, readFile, writeFile, unlink } from 'fs/promises'
import { Deployment } from 'kubernetes-models/apps/v1'
import { Secret, Service } from 'kubernetes-models/v1'
import { PodDisruptionBudget } from 'kubernetes-models/policy/v1'
import { HorizontalPodAutoscaler } from 'kubernetes-models/autoscaling/v2'
import toyaml from 'js-yaml'

import type { ExecutorContext } from '@nx/devkit'
import type { ChildProcessWithoutNullStreams } from 'child_process'
import type { K8sManifestSchema } from './schema'

import { envFileToJson } from '../../common/dotenv-to-json'
import { DEFAULT_ORGANISATION, DEFAULT_REGISTRY } from '../../common/constants'

import { projectAutoscaler } from './templates/project-autoscaler'
import { projectDeployment } from './templates/project-deployment'
import { projectService } from './templates/project-service'
import { projectPdb } from './templates/project-pdb'
import { projectSecret } from './templates/project-secret'

export interface K8sManifestOptions extends K8sManifestSchema {
  projectName?: string
  dryRun?: string
}

export default async function runExecutor(
  schema: K8sManifestSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  try {
    const options = normalizeOptions(schema, context)

    const relativeProjectRoot = context.projectGraph.nodes[context.projectName].data.root
    const absoluteProjectRoot = resolve(context.root, relativeProjectRoot)

    const projectDotenvPath = resolve(absoluteProjectRoot, '.env')
    const environmentVariables = await envFileToJson(projectDotenvPath, false)

    const autoscaler = projectAutoscaler(options)
    const deployment = projectDeployment(options)
    const pdb = projectPdb(options)
    const secret = projectSecret({ ...options, environmentVariables })
    const service = projectService(options)

    const workspaceNexaOutputPath = String('.nexa/').concat(relativeProjectRoot).concat('/k8s')
    const standaloneNexaOutputPath = relativeProjectRoot.concat('/k8s')

    const manifestsOutputPath = options.standalone
      ? standaloneNexaOutputPath
      : workspaceNexaOutputPath

    const outputDirectory = resolve(context.cwd, manifestsOutputPath)

    // Create the output directory for the manifests, if it doesn't exist
    await mkdir(outputDirectory, { recursive: true })

    // Resolve the path to the k8s manifest files and render the manifests to JSON
    const jsonManifests = [deployment, service, autoscaler, secret, pdb].map((resource) => ({
      path: resolve(outputDirectory, `${context.projectName}.${resource.kind.toLowerCase()}.yaml`),
      content: resource.toJSON(),
    }))

    // Write the manifests to the file system
    for (const resource of jsonManifests) {
      await compareAndWrite(resource.path, toyaml.dump(resource.content))
    }

    // Construct the kubectl apply command
    const kubectlApplyCommand: string[] = [
      'apply',
      options.dryRun,
      ...jsonManifests.map((resource) => ['-f', resource.path]).flat(),
    ].filter(Boolean)

    // Spawn the apply process
    const kubectlApplyProcess: ChildProcessWithoutNullStreams = spawn(
      'kubectl',
      kubectlApplyCommand,
      { cwd: context.cwd, stdio: 'inherit' }
    )

    // Wait for the apply process to exit
    await new Promise<void>((resolve, reject) => {
      kubectlApplyProcess.on('close', (code) => {
        if (code === 0) {
          resolve()
        } else {
          reject(new Error(`${code}: Failed to apply manifest for '${context.projectName}'`))
        }
      })
    })

    // Clean up temporary manifest
    // await unlink(k8sManifestFilePath)

    return { success: true }
  } catch (error) {
    logger.error(error.message)
    return { success: false }
  }
}

/**
 * Normalize the options for the k8s manifest executor
 * @param {K8sManifestSchema} options The options to normalize
 * @param {ExecutorContext} context The context of the executor
 */
function normalizeOptions(
  options: K8sManifestSchema,
  context: ExecutorContext
): K8sManifestOptions {
  const projectName = context.projectName
  const registry = options.registry ?? DEFAULT_REGISTRY
  const organisation = options.organisation ?? DEFAULT_ORGANISATION

  const namespace = options.namespace ?? 'dev'
  const dryRun = !options.apply ? '--dry-run=client' : undefined
  const imageName =
    // user-provided fully qualified image name
    options.imageName ??
    // defaults to: ghcr.io/codyslexia/my-project-name
    [registry, organisation, context.projectName].join('/').toLowerCase()

  return {
    imageName,
    dryRun,
    namespace,
    registry,
    organisation,
    projectName,
    ...options,
    labels: {
      app: 'codyslexia',
      component: context.projectName,
      ...normalizeLabels(options.labels ?? {}),
    },
  }
}

// Compare the existing file with the new content and write if different
export async function compareAndWrite(filePath: string, content: string): Promise<void> {
  try {
    const existingContent = await readFile(filePath, 'utf-8')
    if (existingContent === content) return
  } catch {
    // File does not exist, continue with writing the file
  }
  await writeFile(filePath, content)
}

// Normalize labels to lowercase
function normalizeLabels(labels: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(labels).map(([key, value]) => [key.toLowerCase(), value.toLowerCase()])
  )
}
