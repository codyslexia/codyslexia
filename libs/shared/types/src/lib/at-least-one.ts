/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Constructs a type by combining two types `A` and `B` such that the resulting type has at least one property from `A`.
 *
 * @template A - The first type to combine.
 * @template B - The second type to combine. Defaults to an object type with all properties from `A` as optional.
 * @returns A new type that has at least one property from `A`.
 * @example
 * type Result = AtLeastOne<{ a: 1, b: 2 }>
 * // Expect: { a: 1 } | { b: 2 } | { a: 1, b: 2 }
 */
export type AtLeastOne<A, B = { [Key in keyof A]: Pick<A, Key> }> = Partial<A> & B[keyof B]
