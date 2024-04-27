/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Represents an object that can validate input data.
 */
export interface Validation {
  /**
   * Validates input data.
   * @param args The input data to validate.
   * @returns A promise that resolves with a boolean indicating if the input data is valid.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(...args: any[]): Promise<void> | boolean
}
