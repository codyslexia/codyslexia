/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ConfigLoader } from '../interfaces'

/**
 * Get config from environment variables.
 */
export class EnvConfigLoader implements ConfigLoader {
  load(): Record<string, string> {
    return process.env
  }
}
