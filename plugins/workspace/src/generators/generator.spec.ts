import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { Tree, readProjectConfiguration } from '@nx/devkit'

import { reactGenerator } from './generator'
import { ReactGeneratorSchema } from './schema'

describe('react generator', () => {
  let tree: Tree
  const options: ReactGeneratorSchema = { name: 'test' }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await reactGenerator(tree, options)
    const config = readProjectConfiguration(tree, 'test')
    expect(config).toBeDefined()
  })
})
