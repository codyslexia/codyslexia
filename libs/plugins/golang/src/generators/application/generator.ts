import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  ProjectConfiguration,
  TargetConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nx/devkit'
import { join } from 'path'
import { addGoWorkDependency, createGoMod, isGoWorkspace, normalizeOptions } from '../../utils'
import type { ApplicationGeneratorSchema } from './schema'

export const defaultTargets: { [targetName: string]: TargetConfiguration } = {
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
}

export default async function applicationGenerator(tree: Tree, schema: ApplicationGeneratorSchema) {
  const options = await normalizeOptions(tree, schema, 'application', '@plugins/golang:application')
  const projectConfiguration: ProjectConfiguration = {
    root: options.projectRoot,
    projectType: options.projectType,
    sourceRoot: options.projectRoot,
    tags: options.parsedTags,
    targets: defaultTargets,
  }

  addProjectConfiguration(tree, schema.name, projectConfiguration)

  generateFiles(tree, join(__dirname, 'files'), options.projectRoot, options)

  if (isGoWorkspace(tree)) {
    createGoMod(tree, `${options.npmScope}/${options.moduleName}`, options.projectRoot)
    addGoWorkDependency(tree, options.projectRoot)
    projectConfiguration.targets.tidy = {
      executor: '@plugins/golang:tidy',
    }
    updateProjectConfiguration(tree, schema.name, projectConfiguration)
  }

  if (!schema.skipFormat) {
    await formatFiles(tree)
  }
}
