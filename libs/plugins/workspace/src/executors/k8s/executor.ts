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

export default async function runExecutor(
  opts: K8sManifestSchema,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  function normalizeOptions(options: K8sManifestSchema): K8sManifestSchema {
    return {
      dryRun: false,
      registry: 'ghcr.io',
      organisation: 'codyslexia',
      namespace: 'dev',
      ...options,
      labels: {
        app: 'codyslexia',
        component: context.projectName,
        ...normalizeLabels(options.labels ?? {}),
      },
    }
  }

  try {
    const options = normalizeOptions(opts)

    const { registry, organisation } = options

    const dockerImageName =
      // <imageName>
      options.imageName ??
      // ghcr.io/codyslexia/sandbox
      `${registry}/${organisation}/${context.projectName}` ??
      // ghcr.io/codyslexia/sandbox
      [registry, organisation, context.projectName].join('/').toLowerCase()

    const projectRoot = resolve(
      context.root,
      context.projectGraph.nodes[context.projectName].data.root
    )

    const labels = {
      app: 'codyslexia',
      component: context.projectName,
      ...options.labels,
    }

    const deployment = new Deployment({
      metadata: {
        name: context.projectName,
        namespace: options.namespace,
      },
      spec: {
        replicas: 1,
        selector: {
          matchLabels: labels,
        },
        template: {
          metadata: {
            labels: labels,
          },
          spec: {
            affinity: {
              podAntiAffinity: {
                preferredDuringSchedulingIgnoredDuringExecution: [
                  {
                    podAffinityTerm: {
                      labelSelector: {
                        matchExpressions: [
                          {
                            key: 'app',
                            operator: 'In',
                            values: ['codyslexia'],
                          },
                        ],
                      },
                      topologyKey: 'kubernetes.io/hostname',
                    },
                    weight: 100,
                  },
                ],
              },
            },
            topologySpreadConstraints: [
              {
                maxSkew: 1,
                topologyKey: 'kubernetes.io/hostname',
                whenUnsatisfiable: 'ScheduleAnyway',
                labelSelector: {
                  matchLabels: {
                    app: 'codyslexia',
                    component: context.projectName,
                  },
                },
              },
            ],
            imagePullSecrets: [
              {
                name: 'github-registry',
              },
            ],
            containers: [
              {
                name: context.projectName,
                image: dockerImageName,
                imagePullPolicy: 'IfNotPresent',
                ports: [
                  {
                    containerPort: 3000,
                    name: 'http',
                  },
                ],
                envFrom: [
                  {
                    secretRef: {
                      name: `${context.projectName}-secret`,
                    },
                  },
                ],
                resources: {
                  requests: {
                    memory: '640M',
                    cpu: '100m',
                  },
                  limits: {
                    memory: '1000M',
                    cpu: '1000m',
                  },
                },
              },
            ],
          },
        },
      },
    })

    const service = new Service({
      metadata: {
        name: context.projectName,
        namespace: options.namespace,
        labels: labels,
      },
      spec: {
        selector: labels,
        ports: [
          {
            name: context.projectName,
            protocol: 'TCP',
            port: 80,
            targetPort: 'http',
          },
        ],
      },
    })

    const autoscaler = new HorizontalPodAutoscaler({
      metadata: {
        name: `${context.projectName}-hpa`,
        namespace: options.namespace,
      },
      spec: {
        scaleTargetRef: {
          apiVersion: 'apps/v1',
          kind: 'Deployment',
          name: context.projectName,
        },
        minReplicas: 1,
        maxReplicas: 5,
        metrics: [
          {
            type: 'Resource',
            resource: {
              name: 'cpu',
              target: {
                type: 'Utilization',
                averageUtilization: 50,
              },
            },
          },
        ],
      },
    })

    const pdb = new PodDisruptionBudget({
      metadata: {
        name: `${context.projectName}-pdb`,
        namespace: options.namespace,
      },
      spec: {
        selector: {
          matchLabels: labels,
        },
        minAvailable: 1,
      },
    })

    const projectDotenvPath = resolve(projectRoot, '.env')

    const environmentVariables = await envFileToJson(projectDotenvPath, false)

    const secret = new Secret({
      metadata: {
        name: `${context.projectName}-secret`,
        namespace: options.namespace,
      },
      type: 'Opaque',
      data: Object.fromEntries(
        Object.entries(environmentVariables).map(([key, value]) => [
          key.toUpperCase(),
          value.toString(),
        ])
      ),
    })

    const outputDirectory = resolve(context.cwd, `.nexa/${context.projectName}/k8s`)
    // Ensure that the output directory exists
    await mkdir(outputDirectory, { recursive: true })

    const jsonManifests = [deployment, service, autoscaler, secret, pdb].map((resource) => ({
      path: resolve(outputDirectory, `${context.projectName}.${resource.kind.toLowerCase()}.yaml`),
      content: resource.toJSON(),
    }))

    for (const resource of jsonManifests) {
      // console.log(toyaml.dump(resource.content))
      await compareAndWrite(resource.path, toyaml.dump(resource.content))
    }

    // Construct the kubectl apply command
    const kubectlApplyCommand: string[] = [
      'kubectl',
      'apply',
      options.dryRun ? '--dry-run=client' : undefined,
      ...jsonManifests.map((resource) => ['-f', resource.path]).flat(),
    ].filter(Boolean)

    // Spawn the apply process
    const kubectlApplyProcess: ChildProcessWithoutNullStreams = spawn(
      kubectlApplyCommand[0],
      kubectlApplyCommand.slice(1),
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

// ------------------------------------------------------------------
// Utility functions
// ------------------------------------------------------------------

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
