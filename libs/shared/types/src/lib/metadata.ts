/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Represents metadata for an object.
 * @template T - The type of the metadata object.
 */
export type Metadata = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: PropertyKey]: any
}
