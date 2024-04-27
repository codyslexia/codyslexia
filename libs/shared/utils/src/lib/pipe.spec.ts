/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { deepStrictEqual } from 'assert'

import { pipe } from './pipe'

describe('@shared/utils - pipe', () => {
  it('should return the input string if no functions are provided', () => {
    const input = 'Hello, World!'
    const result = pipe(input)
    expect(result).toBe(input)
  })

  it('should apply functions in the correct order', () => {
    const addExclamation = (str: string) => str + '!'
    const capitalize = (str: string) => str.toUpperCase()

    const input = 'hello'
    const expected = 'HELLO!'
    const result = pipe(input, capitalize, addExclamation)
    expect(result).toBe(expected)
  })

  it('should work with multiple functions', () => {
    const double = (str: string) => str + str
    const reverse = (str: string) => str.split('').reverse().join('')

    const input = 'abc'
    const expected = 'cbacba'
    const result = pipe(input, double, reverse)
    expect(result).toBe(expected)
  })

  it('should handle generic types correctly', () => {
    const square = (num: number) => num * num
    const toString = (num: number) => num.toString()

    const input = 5
    const expected = '25'
    const result = pipe(input, square, toString)
    expect(result).toBe(expected)
  })

  it('should correctly execute functions', () => {
    const f = (n: number) => n + 1
    const g = (n: number) => n * 2
    deepStrictEqual(pipe(2), 2)
    deepStrictEqual(pipe(2, f), 3)
    deepStrictEqual(pipe(2, f, g), 6)
    deepStrictEqual(pipe(2, f, g, f), 7)
    deepStrictEqual(pipe(2, f, g, f, g), 14)
    deepStrictEqual(pipe(2, f, g, f, g, f), 15)
    deepStrictEqual(pipe(2, f, g, f, g, f, g), 30)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f), 31)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g), 62)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f), 63)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g), 126)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f), 127)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g), 254)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f), 255)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 510)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 511)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 1022)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 1023)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g), 2046)
    deepStrictEqual(pipe(2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f), 2047)
    deepStrictEqual(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (pipe as any)(...[2, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g, f, g]),
      4094
    )
  })
})
