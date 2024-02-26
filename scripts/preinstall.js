/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @fileoverview Pre-install script to check that the necessary dependencies are installed: Node 18+, Cargo
 * @module scripts/preinstall
 */

// if running in CI, exit with 0
if (process.env.CI) {
  process.exit(0)
}

// import dependencies
const childProcess = require('child_process')

// check node version
const nodeVersion = process.version.slice(1).split('.')
if (+nodeVersion[0] < 18) {
  console.error('Please make sure that your installed Node version is greater than v18')
  process.exit(1)
}

// check for cargo
try {
  childProcess.execSync('cargo --version')
} catch {
  console.error(
    'Could not find Cargo. Please make sure that Cargo and Rust is installed with https://rustup.rs'
  )
  process.exit(1)
}

// check for go
try {
  childProcess.execSync('go version')
} catch {
  console.error(
    'Could not find Go. Please make sure that Go is installed. See https://go.dev/doc/install'
  )
  process.exit(1)
}

// check for python
try {
  childProcess.execSync('python3 --version')
} catch {
  console.error(
    'Could not find Python3. Please make sure that Python3 is installed. See hhttps://www.python.org/downloads/'
  )
  process.exit(1)
}
