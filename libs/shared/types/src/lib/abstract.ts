/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * `Abstract` is a type that represents a class prototype.
 *
 * @template T - The type of the class prototype.
 */
export interface Abstract<T> extends CallableFunction {
  prototype: T
}
