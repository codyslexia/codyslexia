import { Deployment } from 'kubernetes-models/apps/v1'

import { K8sManifestOptions } from '../executor'

export function projectDeployment(options: K8sManifestOptions) {
  return new Deployment({
    metadata: {
      name: options.projectName,
      namespace: options.namespace,
    },
    spec: {
      replicas: 1,
      selector: {
        matchLabels: options.labels,
      },
      template: {
        metadata: {
          labels: options.labels,
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
                  component: options.projectName,
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
              name: options.projectName,
              image: options.imageName,
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
                    name: `${options.projectName}-secret`,
                  },
                },
              ],
              resources: {
                requests: {
                  memory: '100M',
                  cpu: '100m',
                },
                limits: {
                  memory: '500M',
                  cpu: '500m',
                },
              },
            },
          ],
        },
      },
    },
  })
}
