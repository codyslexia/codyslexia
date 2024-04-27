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
 * Get config from json file.
 */
export class JsonConfigLoader implements ConfigLoader {
  constructor(private readonly filePath = 'config.json') {
    this.filePath = resolve(process.cwd(), filePath)
  }

  public load<T extends object = object>() {
    if (existsSync(this.filePath)) {
      return JSON.parse(readFileSync(this.filePath).toString()) as T
    }
    return {} as T
  }
}
