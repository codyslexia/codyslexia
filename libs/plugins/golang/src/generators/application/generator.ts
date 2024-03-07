import { addProjectConfiguration, formatFiles, generateFiles, Tree } from '@nx/devkit'
import { join } from 'path'
import { addGoWorkDependency, createGoMod, isGoWorkspace, normalizeOptions } from '../../utils'
import type { ApplicationGeneratorSchema } from './schema'

export default async function applicationGenerator(tree: Tree, schema: ApplicationGeneratorSchema) {
  const options = await normalizeOptions(tree, schema, 'application', '@plugins/golang:application')

  addProjectConfiguration(tree, schema.name, {
    root: options.projectRoot,
    projectType: options.projectType,
    sourceRoot: options.projectRoot,
    tags: options.parsedTags,
    targets: {
      build: {
        executor: '@plugins/golang:build',
        options: {
          main: '{projectRoot}/main.go',
        },
      },
      serve: {
        executor: '@plugins/golang:serve',
        options: {
          main: '{projectRoot}/main.go',
        },
      },
      test: {
        executor: '@plugins/golang:test',
      },
      lint: {
        executor: '@plugins/golang:lint',
      },
    },
  })

  generateFiles(tree, join(__dirname, 'files'), options.projectRoot, options)

  if (isGoWorkspace(tree)) {
    createGoMod(tree, `${options.npmScope}/${options.moduleName}`, options.projectRoot)
    addGoWorkDependency(tree, options.projectRoot)
  }

  if (!schema.skipFormat) {
    await formatFiles(tree)
  }
}
