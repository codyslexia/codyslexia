/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { infiniteSequence } from './infinite-sequence'

describe('@shared/utils - Infinite Sequence', () => {
  it('should create different sequences using the generic sequence generator function', () => {
    const intSequence = infiniteSequence(1, (n) => n + 1) // sequence of natural numbers
    expect(intSequence.next().value).toEqual(1) // 1
    expect(intSequence.next().value).toEqual(2) // 2
    expect(intSequence.next().value).toEqual(3) // 3

    const oddSequence = infiniteSequence(1, (n) => n + 2) // sequence of odd numbers
    expect(oddSequence.next().value).toEqual(1) // 1
    expect(oddSequence.next().value).toEqual(3) // 3
    expect(oddSequence.next().value).toEqual(5) // 5

    const evenSequence = infiniteSequence(0, (n) => n + 2) // sequence of even numbers
    expect(evenSequence.next().value).toEqual(0) // 0
    expect(evenSequence.next().value).toEqual(2) // 2
    expect(evenSequence.next().value).toEqual(4) // 4
  })
})
