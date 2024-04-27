/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * `KeyOf` is a type that represents a union of all keys of a given type.
 * @template T The type whose keys to unionize.
 * @example
 * ```ts
 * type Foo = { a: string; b: number }
 * type FooKeys = KeyOf<Foo> // "a" | "b"
 * ```
 */
export type KeyOf<T> = T extends string ? string : keyof T
