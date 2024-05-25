import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  names,
  ProjectConfiguration,
  TargetConfiguration,
  Tree,
  updateProjectConfiguration,
} from '@nx/devkit'
import { join } from 'path'
import { addGoWorkDependency, createGoMod, isGoWorkspace, normalizeOptions } from '../../utils'
import { LibraryGeneratorSchema } from './schema'

export const defaultTargets: { [targetName: string]: TargetConfiguration } = {
  test: {
    executor: '@plugins/golang:test',
  },
  lint: {
    executor: '@plugins/golang:lint',
  },
}

export default async function libraryGenerator(tree: Tree, schema: LibraryGeneratorSchema) {
  const options = await normalizeOptions(tree, schema, 'library', '@plugins/golang:library')
  const projectConfiguration: ProjectConfiguration = {
    root: options.projectRoot,
    projectType: options.projectType,
    sourceRoot: options.projectRoot,
    tags: options.parsedTags,
    targets: defaultTargets,
  }

  addProjectConfiguration(tree, options.name, projectConfiguration)

  generateFiles(tree, join(__dirname, 'files'), options.projectRoot, {
    ...options,
    ...names(options.projectName),
  })

  if (isGoWorkspace(tree)) {
    createGoMod(tree, `${options.npmScope}/${options.moduleName}`, options.projectRoot)
    addGoWorkDependency(tree, options.projectRoot)
    projectConfiguration.targets.tidy = {
      executor: '@plugins/golang:tidy',
    }
    updateProjectConfiguration(tree, options.name, projectConfiguration)
  }

  if (!schema.skipFormat) {
    await formatFiles(tree)
  }
}
