/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * `UnionKeys` is a type that represents the union of keys of a given type `T`.
 *
 * @template T - The type whose keys to unionize.
 * @returns The union of keys of the given type `T`.
 *
 * @example
 * ```ts
 * type Keys = UnionKeys<{ a: string; b: number }>
 * // expected to be "a" | "b"
 * ```
 */
export type UnionKeys<T> = T extends T ? keyof T : never
