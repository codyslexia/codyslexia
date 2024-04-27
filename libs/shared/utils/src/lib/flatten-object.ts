/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Flattens an object into a single level object with dot notation keys.
 *
 * @param obj The object to flatten.
 * @param prefix The prefix to use for the keys.
 * @returns A flattened object.
 *
 * @example
 * const flatten = flattenObject({
 *  logging: {
 *   level: 'debug',
 *   format: 'json',
 *   enabled: true,
 *  },
 * })
 * // console.log(flatten)
 * // flatten = {
 * //   'logging.level': 'debug',
 * //   'logging.format': 'json',
 * //   'logging.enabled': true,
 * // }
 */
export function flattenObject(obj: object, prefix = '', separator = '.'): Record<string, unknown> {
  const flattened: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
      const nestedPrefix = prefix ? `${prefix}${separator}${key}` : key
      const nestedFlattened = flattenObject(value, nestedPrefix, separator)
      Object.assign(flattened, nestedFlattened)
    } else {
      const flattenedKey = prefix ? `${prefix}${separator}${key}` : key
      flattened[flattenedKey] = value
    }
  }

  return flattened
}
