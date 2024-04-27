/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Represents a configuration object that maps keys to string values.
 */
export interface ConfigStore {
  get(key: string): string
  set(key: string, value: string): void
}
