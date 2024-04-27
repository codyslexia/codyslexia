/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { ExcludeEmpty } from '@shared/types'

/**
 * Apply strongly-typed transformations to objects based on values of its own keys.
 *
 * @example
 * const records = [{name: 'thing', type: 'thong'}] as const
 * const transformed = transform(records, 'name', 'type')
 * // → { thing: 'thong' }
 */
export function transform<A extends Record<any, any>, Key extends keyof A>(
  collection: readonly A[],
  k: Key
): {
  [Prop in A[Key]]: ExcludeEmpty<{
    [Props in keyof A as A[Key] extends Prop ? A[Key] : never]: A
  }>[Prop]
}
export function transform<A extends Record<any, any>, K extends keyof A, Value extends keyof A>(
  collection: readonly A[],
  k: K,
  k2: Value
): {
  [P in A[K]]: ExcludeEmpty<{
    [P2 in keyof A as A[K] extends P ? A[K] : never]: A[Value]
  }>[P]
}
export function transform<A extends Record<any, any>, K extends keyof A, Value extends keyof A>(
  collection: readonly A[],
  k: K,
  k2?: Value
):
  | {
      [P in A[K]]: ExcludeEmpty<{
        [P2 in keyof A as A[K] extends P ? A[K] : never]: A
      }>[P]
    }
  | {
      [P in A[K]]: ExcludeEmpty<{
        [P2 in keyof A as A[K] extends P ? A[K] : never]: A[Value]
      }>[P]
    } {
  return collection.reduce((acc, curr) => {
    const valueAtKey = curr[k]

    if (isValidKey(valueAtKey)) {
      if (k2) return { ...acc, [valueAtKey]: curr[k2] }
      return { ...acc, [valueAtKey]: curr }
    }

    throw new Error('A[K] is not a valid object key type')
  }, {} as any)
}

/**
 * Check if a value is a valid object key type.
 */
function isValidKey(x: unknown): x is PropertyKey {
  return typeof x === 'string' || typeof x === 'number' || typeof x === 'symbol'
}
