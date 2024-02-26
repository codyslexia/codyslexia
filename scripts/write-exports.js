/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @fileoverview This script creates an index file that exports all files in a given directory.
 * @module scripts/write-exports
 */

const fs = require('fs')

/**
 * Returns an array of export statements for all files in the given path.
 * @param {string} path - The path to the directory containing the files to export.
 * @returns {string[]} - An array of export statements.
 */
function returnExports(path) {
  const files = fs.readdirSync(path)
  const exports = files
    .map((file) => {
      const name = file.split('.')[0]
      return `export * from './${name}'`
    })
    .filter((file) => !file.includes('index'))
  return Array.from(new Set(exports))
}

/**
 * Writes the exports to a file.
 * @param {string} filename - The name of the file to write to.
 * @param {Array<string>} exports - The exports to write to the file.
 */
function writeExports(filename, exports) {
  fs.writeFileSync(filename, exports.join('\n'))
}

/**
 * This script exports all files to a single index file.
 * If a filename is not provided as a command line argument, it defaults to 'index.ts'.
 */
const path = process.argv[2]
const filename = process.argv[3] || 'index.ts'
const generatedExports = returnExports(path)

// derive the path from the path argument
const destination = path.concat(`/${filename}`)

writeExports(destination, generatedExports)
