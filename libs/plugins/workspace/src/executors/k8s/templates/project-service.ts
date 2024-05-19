import { Service } from 'kubernetes-models/v1'

import { K8sManifestOptions } from '../executor'

export function projectService(options: K8sManifestOptions) {
  return new Service({
    metadata: {
      name: options.projectName,
      namespace: options.namespace,
      labels: options.labels,
    },
    spec: {
      selector: options.labels,
      ports: [
        {
          name: options.projectName,
          protocol: 'TCP',
          port: 80,
          targetPort: 'http',
        },
      ],
    },
  })
}
