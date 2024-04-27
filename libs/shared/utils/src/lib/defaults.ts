/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * @param target The destination object.
 * @param sources The source objects.
 * @returns Returns the destination object.
 *
 * @example
 * defaults({ a: 1 }, { b: 2 }, { a: 3 }) // => { a: 1, b: 2 }
 */
export function defaults(
  target: Record<string, unknown>,
  ...sources: Record<string, unknown>[]
): Record<string, unknown> {
  for (const source of sources) {
    for (const [key, value] of Object.entries(source)) {
      if (!(key in target)) {
        target[key] = value
      }
    }
  }
  return target
}
