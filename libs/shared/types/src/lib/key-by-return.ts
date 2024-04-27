/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Returns a new type that maps the values of a specified key of an object to a new value.
 *
 * @template A - The type of the input object.
 * @template Key - The type of the key to map.
 * @template Value - The type of the value to map to.
 * @example
 * type Result = KeyByReturn<{ a: 1, b: 2 }, 'a', 'a'>
 * // Expect: { a: 'a', b: 'b' }
 * type Result = KeyByReturn<{ a: 1, b: 2 }, 'a', 'b'>
 * // Expect: { a: { a: 1 }, b: { b: 2 } }
 */
export type KeyByReturn<
  // we use `any` here because the type of `A` will be inferred from the first argument of `keyBy`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  A extends Record<any, any>,
  Key extends keyof A,
  Value extends keyof A | undefined
> = {
  [P in A[Key]]: Value extends undefined ? A[Key] : A[Value]
}
