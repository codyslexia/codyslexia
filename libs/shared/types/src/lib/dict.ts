/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * `Dict` is a type that represents a dictionary object.
 * @template T - The type of the dictionary object.
 * @returns A dictionary object.
 * @example
 * ```ts
 * type T0 = Dict<{ a: string; b: number }>
 * // expected to be { a: string; b: number }
 * ```
 */
export type Dict<T> = {
  [Key in keyof T]: T[Key]
}

/**
 * A dictionary type that maps string keys to values of type T.
 * @template T The type of values stored in the dictionary.
 * @returns A dictionary object.
 * @example
 * ```ts
 * type T0 = Dictionary<string>
 * // expected to be { [key: string]: string }
 * ```
 */
export type Dictionary<T> = {
  [key: string]: T
}

/**
 * A dictionary with string keys and any values.
 */
export type AnyDict = {
  // we intentionally use `any` here because we want to allow any value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

/**
 * A dictionary of request body values that can be of type boolean, number, string, null, object, or an array of these types.
 */
export type RequestBodyDictionary = Dictionary<
  boolean | number | string | null | object | (boolean | number | string | null | object)[]
>
