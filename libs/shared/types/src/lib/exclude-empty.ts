/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { AtLeastOne } from './at-least-one'

/**
 * `ExcludeEmpty` utility type removes types from a union that are assignable to an empty object.
 *
 * @template A - The union type to remove empty types from.
 * @returns A union type without empty types.
 */
export type ExcludeEmpty<A> = A extends AtLeastOne<A> ? A : never
