import { Secret } from 'kubernetes-models/v1'
import { K8sManifestOptions } from '../executor'

export function projectSecret(
  options: K8sManifestOptions & { environmentVariables: Record<string, string> }
) {
  const secretData = Object.fromEntries(
    Object.entries(options.environmentVariables).map(([key, value]) => [
      key.toUpperCase(),
      value.toString(),
    ])
  )

  return new Secret({
    metadata: {
      name: `${options.projectName}-secret`,
      namespace: options.namespace,
    },
    type: 'Opaque',
    data: secretData,
  })
}
