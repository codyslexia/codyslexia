/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Creates a tuple of strings.
 */
export const tuple = <T extends string[]>(...args: T) => args

/**
 * Creates a tuple of numbers.
 */
export const tupleNumber = <T extends number[]>(...args: T) => args
