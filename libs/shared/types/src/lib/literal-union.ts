/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Primitive } from './primitive'

/**
 * `LiteralUnion` is a type that represents a union of a literal type and a base type.
 *
 * @template LiteralType - The literal type to include in the union.
 * @template BaseType - The base type to include in the union.
 * @returns A union of a literal type and a base type.
 * @see https://stackoverflow.com/a/65805600/2391795
 * @example
 * ```ts
 * type T0 = LiteralUnion<"foo", string>
 * // expected to be "foo" | string
 * ```
 */
export type LiteralUnion<LiteralType, BaseType extends Primitive> =
  | LiteralType
  | (BaseType & Record<never, never>)
