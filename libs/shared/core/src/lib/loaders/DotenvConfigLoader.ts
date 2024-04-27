/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { config, parse } from 'dotenv'

import { ConfigLoader } from '../interfaces'

/**
 * Get config from dotenv file.
 */
export class DotenvConfigLoader implements ConfigLoader {
  constructor(private readonly filePath = '.env') {
    this.filePath = resolve(process.cwd(), filePath.endsWith('.env') ? filePath : `${filePath}.env`)
  }

  load() {
    const result = config({ path: this.filePath })

    if (result.parsed) {
      return result.parsed
    }

    if (existsSync(this.filePath)) {
      const loaded = parse(readFileSync(this.filePath))
      return loaded
    }
  }
}
