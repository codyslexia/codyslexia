/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * A generic infinite sequence generator function.
 * @example
 * ```ts
 * // sequence of natural numbers
 * let intSequence = infiniteSequence(1, (n) => n + 1)
 * console.log(intSequence.next().value) // 1
 * console.log(intSequence.next().value) // 2
 * console.log(intSequence.next().value) // 3
 * ```
 */
export function* infiniteSequence<T>(
  initialValue: T,
  transform: (value: T) => T
): IterableIterator<T> {
  while (true) {
    yield initialValue
    initialValue = transform(initialValue)
  }
}
