/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @fileoverview A script to publish a library to npm.
 * @example
 * ```sh
 * node path/to/publish.mjs {name} --version {version} --tag {tag}
 * ```
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { readCachedProjectGraph } from '@nx/devkit'

function invariant(condition, message) {
  if (!condition) {
    console.error(message)
    process.exit(1)
  }
}

// default "tag" to "next" so we won't publish the "latest" tag by accident.
const [, , name, version, tag = 'next'] = process.argv

// simple SemVer validation to validate the version
const validVersion = /^\d+\.\d+\.\d+(-\w+\.\d+)?/

invariant(
  version && validVersion.test(version),
  `Provided "${version}" did not match SemVer, expected: #.#.#-tag.# or #.#.#, got ${version}.`
)

const graph = readCachedProjectGraph()

const project = graph.nodes[name]
invariant(project, `Could not find project "${name}" in the workspace.`)

const outputPath = project.data?.targets?.build?.options?.outputPath
invariant(outputPath, `Could not find "build.options.outputPath" of project "${name}".`)

process.chdir(outputPath)

try {
  const json = JSON.parse(readFileSync(`package.json`).toString())
  // update the version in "package.json" before publishing
  json.version = version
  writeFileSync(`package.json`, JSON.stringify(json, null, 2))
} catch (e) {
  console.error(`Error reading package.json file from library build output.`)
}

// execute "npm publish" to publish
execSync(`npm publish --access public --tag ${tag}`)
