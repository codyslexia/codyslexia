/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { join } from 'path'
import { promises } from 'fs'
import {
  Tree,
  names,
  logger,
  updateJson,
  ProjectConfiguration,
  readProjectConfiguration,
  addDependenciesToPackageJson,
} from '@nx/devkit'

import { PackageJson } from './util-types'
import { UpdateTagsSchema, UpdateTagsScope } from '../schema'

/**
 * Check if `package.json` `name` property is correct.
 *
 * @example
 * ```ts
 * "name": "@react/hooks/use-boolean" -> nothing changed
 * "name": "use-boolean" -> "@react/hooks/use-boolean" // updated
 * ```
 */
export const ensureNpmName = (tree: Tree, path: string) => {
  updateJson(tree, path, (pkgJson) => {
    if (!pkgJson.name.includes('ui-components')) {
      logger.info(`Fixing package.json "name" prop in: ${pkgJson.name}`)
      pkgJson.name = `@liferaycloud/${pkgJson.name}`
    }

    if (!pkgJson.devDependencies) {
      logger.info(`Missing "devDependencies" in: ${pkgJson.name}`)
    }
    return pkgJson
  })
}

/**
 * Check if `version` is set correctly for first migration.
 *
 * @example
 * ```ts
 * "version": "1.0.0" -> nothing changed
 * "version": "0.0.1" -> "version": "1.0.0" // updated
 * ```
 */
export const ensureVersion = (tree: Tree, path: string) => {
  updateJson(tree, path, (pkgJson) => {
    if (pkgJson.version !== '1.0.0') {
      pkgJson.version = `1.0.0`
    }
    return pkgJson
  })
}

let TOTAL_BATCH_UPDATED = 0

/**
 * Batch update `package.json` files per scope (dir) and desired conditions.
 *
 * @example
 * ```ts
 * // yarn nx workspace-generator update-package-json
 * export default async function (tree: Tree, schema: UpdateTagsSchema) {
 *  batchUpdate(tree, schema)
 * }
 * ```
 */
export const batchUpdate = async (tree: Tree, schema: UpdateTagsSchema) => {
  const backend = await promises.readdir(join(process.cwd(), 'libs/backend'))
  const frontend = await promises.readdir(join(process.cwd(), 'libs/frontend'))
  const shared = await promises.readdir(join(process.cwd(), 'libs/shared'))

  const scope = schema.scope
  const projects = { backend, frontend, shared }

  projects[scope].map((name) => {
    const libRoot = readProjectConfiguration(tree, names(`${scope}-${name}`).fileName).root

    const pkgJsonPath = join(libRoot, 'package.json')

    updateJson(tree, pkgJsonPath, (pkgJson) => {
      // pkgJson.version = `${schema.version}`
      logger.info(pkgJson.name)
      if (pkgJson.name.includes('effect')) {
        TOTAL_BATCH_UPDATED++
      }
      return pkgJson
    })

    logger.info(`Ran "batchUpdate" in ${TOTAL_BATCH_UPDATED} of ${projects[scope].length} projects`)
  })
}

/**
 * Set `dependencies` and `devDependencies` programmatically.
 *
 * @example
 * ```ts
 *
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const updateDependencies = (tree: Tree, schema: UpdateTagsSchema) => {
  addDependenciesToPackageJson(
    tree,
    // dependencies
    { react: '^18.2.0' },
    // devDependencies
    {
      '@react/shared/storybook': '*',
      '@liferaycloud/tests': '*',
    }
  )
}

/**
 * Normalizes `package.json` files across all projects within a scope.
 *
 * @example
 * ```ts
 *  const normalized = normalizePackageJson(pkgJson)
 * ```
 */
export const normalizePackageJson = (pkgJson: PackageJson, scope: UpdateTagsScope) => {
  /**
   * Enforce desired version, if needed
   */
  if (pkgJson.version !== '1.0.0') {
    pkgJson.version = '1.0.0'
  }
  /**
   * Ensure it has a valid scoped npm name (e.g. `@react/hooks/use-boolean` instead of `use-boolean`)
   */
  if (!pkgJson.name?.includes('@liferaycloud')) {
    pkgJson.name = `@liferaycloud/${pkgJson.name}`
  }
  /**
   * Normalize `repository` info and lib directory
   */
  pkgJson.repository = {
    type: 'git',
    url: 'git+https://github.com/liferaycloud/liferay-console.git',
    directory: `libs/${scope}/${pkgJson.name.replace('@liferaycloud/', '')}`,
  }
  /**
   * Standardized `publishConfig` info for publishing/tooling
   */
  pkgJson.publishConfig = {
    access: 'public',
    registry: 'https://npm.pkg.github.com/',
  }
  /**
   * Update `author` info
   */
  pkgJson.author = undefined
  /**
   * Projects should have no listed `devDependencies`
   */
  pkgJson.devDependencies = undefined
  /**
   * List have required `peerDependencies` Nx does not add them when
   * `--updateBuildableProjectDepsInPackageJson=dependencies`
   */
  const reactVersion = { react: '^18.2.x' }
  const reactDomVersion = { 'react-dom': '^18.2.x' }
  const reactTypesVersion = { '@types/react': '^17.x' }
  const styledVersion = { 'styled-components': '4.x || 5.x' }
  /**
   * Resolve default `peerDependencies` per scope.
   */
  const resolvedPeerDeps = () => {
    switch (scope) {
      case 'backend':
        return {
          ...reactTypesVersion,
          ...reactVersion,
          ...reactDomVersion,
          ...styledVersion,
        }
      case 'frontend':
      case 'shared':
        return { ...reactVersion }
    }
  }
  /**
   * Add resolved `peerDependencies`
   */
  if (!pkgJson.peerDependencies) pkgJson.peerDependencies = { ...resolvedPeerDeps() }
  else pkgJson.peerDependencies = { ...pkgJson.peerDependencies, ...resolvedPeerDeps() }
  /**
   * Add resolved `peerDependenciesMeta`
   */
  if (!pkgJson.peerDependenciesMeta && scope === 'frontend')
    pkgJson.peerDependenciesMeta = { '@types/react': { optional: true } }
  /**
   * Add useful metadata and adhocs
   */
  pkgJson.engines = { node: '>=0.10.0' }
  pkgJson.keywords = [scope]
  pkgJson.license = 'MIT'
  /**
   * Resolve default pacakge files structure
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const files = ['LICENSE', 'README.md', 'index.js', 'cjs/', 'umd/']
  /**
   * Resolve the normalized `package.json`
   */
  return pkgJson
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const normalizeProjetcJson = (project: ProjectConfiguration, scope?: UpdateTagsScope) => {
  /**
   * Set of dependencies that should not be tracked by Nx Cache or affect builds
   */
  const defaultImplicitDeps = ['!shared-testing', '!shared-storybook']
  /**
   * Add default `implicitDependencies` if none is found, otherwise merge
   */
  if (!project.implicitDependencies) {
    project.implicitDependencies = defaultImplicitDeps
  }
  /**
   * If the project already has `implicitDependencies` set, ensure we don't duplicate them
   */
  if (project.implicitDependencies) {
    project.implicitDependencies = Array.from(
      new Set([...project.implicitDependencies, ...defaultImplicitDeps])
    )
  }
  /**
   * Return the normalized/updated `project.json` file
   */
  return project
}

export const batchUpdateAction = async (tree: Tree, schema: UpdateTagsSchema) => {
  const cwd = process.cwd()

  const backend = await promises.readdir(join(cwd, 'libs/backend'))
  const frontend = await promises.readdir(join(cwd, 'libs/frontend'))
  const shared = await promises.readdir(join(cwd, 'libs/shared'))

  const scope = schema.scope
  const projects = { backend, frontend, shared }

  projects[scope].map((name) => {
    const libRoot = readProjectConfiguration(tree, names(`${scope}-${name}`).fileName).root
    const pkgJsonPath = join(libRoot, 'package.json')
    const projectJsonPath = join(libRoot, 'project.json')

    updateJson(tree, pkgJsonPath, (pkgJson) => normalizePackageJson(pkgJson, scope))
    updateJson(tree, projectJsonPath, (pkgJson) => normalizeProjetcJson(pkgJson, scope))
  })
}
