/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Discriminates a union type by a specific property and value.
 *
 * @template T - The union type to discriminate.
 * @template K - The property key to discriminate by.
 * @template V - The property value to discriminate by.
 * @returns The subset of the union type that matches the specified property and value.
 */
export type DiscriminateUnion<T, K extends keyof T, V extends T[K]> = T extends Record<K, V>
  ? T
  : never

/**
 * Maps a discriminated union type to an object whose keys are the discriminant values
 * and whose values are the corresponding union members.
 *
 * @template T - The discriminated union type to map.
 * @template K - The discriminant key of the discriminated union type.
 * @returns An object whose keys are the discriminant values and whose values are the corresponding union members.
 */
export type MapDiscriminatedUnion<T extends Record<K, string>, K extends keyof T> = {
  [V in T[K]]: DiscriminateUnion<T, K, V>
}
