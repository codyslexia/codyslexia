import {} from '@nx/devkit/testing'
import { DockerBuildExecutorSchema } from './schema'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const options: DockerBuildExecutorSchema = {
  outputPath: 'dist/apps/workspace',
  sourceRoot: 'apps/workspace',
  imageName: 'workspace',
  registry: 'ghcr.io',
  organisation: 'codyslexia',
}

describe('Build Executor', () => {
  it('can run', async () => {
    // e2es should cover this
  })
})
