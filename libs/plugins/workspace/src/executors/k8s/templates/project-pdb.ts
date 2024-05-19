import { PodDisruptionBudget } from 'kubernetes-models/policy/v1'

import { K8sManifestOptions } from '../executor'

export function projectPdb(options: K8sManifestOptions) {
  return new PodDisruptionBudget({
    metadata: {
      name: `${options.projectName}-pdb`,
      namespace: options.namespace,
    },
    spec: {
      selector: {
        matchLabels: options.labels,
      },
      minAvailable: 1,
    },
  })
}
