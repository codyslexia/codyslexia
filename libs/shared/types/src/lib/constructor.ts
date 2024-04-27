/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * `Constructor` is a type that represents a constructor function.
 *
 * @template T - The type of the instance created by the constructor function.
 * @see https://www.typescriptlang.org/docs/handbook/2/classes.html#abstract-construct-signatures
 * @example
 * ```ts
 * type Ctor = Constructor<SomeClass>
 * ```
 */
export type Constructor<T> = {
  // arguments of constructor functions can be anything
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  new (...args: any[]): T
}
