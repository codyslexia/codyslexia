/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { UnionKeys } from './union-keys'

/**
 * `StrictUnionHelper` is a helper type for `StrictUnion`.
 * @template T - The union of types to make strict.
 * @template U - The union of all types to make strict.
 * @returns A union of types that have no common properties.
 * @see https://stackoverflow.com/a/65805600/2391795
 * @example
 * ```ts
 * type T0 = StrictUnionHelper<{ a: string }, { a: string; b: number }>
 * // expected to be { a: string; b?: undefined; }
 * ```
 */
// since T can be of any type, we need to disable the eslint rule that prevents us from using `any`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StrictUnionHelper<T, U> = T extends any
  ? T & Partial<Record<Exclude<UnionKeys<U>, keyof T>, undefined>>
  : never

/**
 * `StrictUnion` is a type that represents a union of types that have no common properties.
 * This is useful for cases where you have a union of action types and you want to ensure
 * that you have a `case` statement for each action type.
 *
 * @template T - The union of types to make strict.
 * @returns A union of types that have no common properties.
 * @see https://stackoverflow.com/a/65805600/2391795
 * @example
 * ```ts
 * type T0 = StrictUnion<{ a: string } | { b: number }>
 * // expected to be { a: string; b?: undefined; } | { b: number; a?: undefined; }
 * ```
 */
export type StrictUnion<T> = StrictUnionHelper<T, T>
