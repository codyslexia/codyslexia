/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Represents an object that can load configuration data from a source and return it as a key-value map.
 */
export interface ConfigLoader<T = object> {
  /**
   * Loads configuration data from a source and returns it as a key-value map.
   * @returns A key-value map representing the loaded configuration data.
   */
  load(): Record<keyof T, string> | Promise<Record<keyof T, string>>
}
