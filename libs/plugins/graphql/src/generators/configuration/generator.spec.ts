import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { Tree, addProjectConfiguration, readProjectConfiguration, stripIndents } from '@nx/devkit'

import { configurationGenerator } from './generator'
import { ConfigurationGeneratorSchema } from './schema'

describe('configuration generator', () => {
  let tree: Tree
  const projectName = 'mypkg'

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should run for non root projects with yml file type', async () => {
    const options: ConfigurationGeneratorSchema = {
      project: projectName,
      configFileType: 'yml',
      schema: 'url-mocked',
      skipFormat: false,
      skipPackageJson: false,
    }

    addProjectConfiguration(tree, projectName, { root: `apps/${projectName}` })

    await configurationGenerator(tree, options)

    const project = readProjectConfiguration(tree, projectName)
    expect(tree.exists(`./apps/${projectName}/codegen.yml`)).toBeTruthy()

    const contents = tree.read(`./apps/${projectName}/codegen.yml`, 'utf-8')
    expect(contents).toMatch('- url-mocked')

    expect(project.targets).toEqual({
      'codegen-generate': {
        executor: '@plugins/graphql:codegen',
      },
    })
  })

  it('should run for non root projects with ts file type', async () => {
    const options: ConfigurationGeneratorSchema = {
      project: projectName,
      configFileType: 'ts',
      schema: 'url-mocked',
      skipFormat: false,
      skipPackageJson: false,
    }

    addProjectConfiguration(tree, projectName, { root: `apps/${projectName}` })

    await configurationGenerator(tree, options)

    const project = readProjectConfiguration(tree, projectName)
    expect(tree.exists(`./apps/${projectName}/codegen.ts`)).toBeTruthy()

    const contents = tree.read(`./apps/${projectName}/codegen.ts`, 'utf-8')
    expect(contents).toMatch('url-mocked')

    expect(project.targets).toEqual({
      'codegen-generate': {
        executor: '@plugins/graphql:codegen',
      },
    })
  })

  it('should handle custom directory', async () => {
    const options: ConfigurationGeneratorSchema = {
      project: projectName,
      directory: 'codegen',
      configFileType: 'ts',
      schema: 'url-mocked',
      skipFormat: false,
      skipPackageJson: false,
    }

    addProjectConfiguration(tree, projectName, { root: `apps/${projectName}` })

    await configurationGenerator(tree, options)

    const project = readProjectConfiguration(tree, projectName)
    expect(tree.exists(`./apps/${projectName}/codegen/codegen.ts`)).toBeTruthy()

    const contents = tree.read(`./apps/${projectName}/codegen/codegen.ts`, 'utf-8')
    expect(contents).toMatch('url-mocked')

    expect(project.targets).toEqual({
      'codegen-generate': {
        executor: '@plugins/graphql:codegen',
        options: {
          config: `apps/${projectName}/codegen/codegen.ts`,
        },
      },
    })
  })

  it('should throws if codegen file already exists', async () => {
    const options: ConfigurationGeneratorSchema = {
      project: projectName,
      configFileType: 'ts',
      schema: 'url-mocked',
      skipFormat: false,
      skipPackageJson: false,
    }

    // expect.assertions(2);

    addProjectConfiguration(tree, projectName, { root: `apps/${projectName}` })

    await configurationGenerator(tree, options)

    expect(tree.exists(`./apps/${projectName}/codegen.ts`)).toBeTruthy()

    try {
      await configurationGenerator(tree, options)
    } catch (e) {
      expect(e.message).toEqual(
        stripIndents`The "apps/${projectName}/codegen.ts" file already exists in the project "${projectName}". Are you sure this is the right project to set up Grapqh Code Generator?
        If you are sure, you can remove the existing file and re-run the generator.`
      )
    }
  })
})
