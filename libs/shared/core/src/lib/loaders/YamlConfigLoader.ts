/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { resolve } from 'path'
import { existsSync, readFileSync } from 'fs'
import { ConfigLoader } from '../interfaces'

/**
 * Get config from a yaml file.
 */
export class YamlConfigLoader implements ConfigLoader {
  constructor(private readonly filePath = 'config.yaml') {
    this.filePath = resolve(process.cwd(), filePath)
  }

  async load() {
    if (existsSync(this.filePath)) {
      const yaml = (await import('js-yaml')).default
      return yaml.load(readFileSync(this.filePath).toString())
    }
    return {}
  }
}
