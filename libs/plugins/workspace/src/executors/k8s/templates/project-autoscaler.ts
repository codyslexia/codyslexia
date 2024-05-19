import { HorizontalPodAutoscaler } from 'kubernetes-models/autoscaling/v2'

import { K8sManifestOptions } from '../executor'

export function projectAutoscaler(options: K8sManifestOptions) {
  return new HorizontalPodAutoscaler({
    metadata: {
      name: `${options.projectName}-hpa`,
      namespace: options.namespace,
    },
    spec: {
      scaleTargetRef: {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        name: options.projectName,
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
}
