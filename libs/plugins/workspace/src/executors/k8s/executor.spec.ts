import {} from '@nx/devkit/testing'
import { K8sManifestSchema } from './schema'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const options: K8sManifestSchema = {
  appLabelName: 'appLabelName',
  imageName: 'imageName',
  namespace: 'namespace',
  organisation: 'organisation',
  registry: 'registry',
  labels: {},
  dryRun: true,
}

describe('Build Executor', () => {
  it('can run', async () => {
    // e2es should cover this
  })
})
