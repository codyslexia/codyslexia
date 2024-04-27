/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * `ReverseMap` is a type that takes a record and returns a new record with the keys and values swapped.
 * @see https://stackoverflow.com/a/57683654/2391795
 * @example
 * type Foo = { a: 'x'; b: 'y' }
 * type Bar = ReverseMap<Foo> // { x: 'a'; y: 'b' }
 */
export type ReverseMap<A extends Record<keyof A, keyof any>> = {
  [P in A[keyof A]]: {
    [K in keyof A]: A[K] extends P ? K : never
  }[keyof A]
}
