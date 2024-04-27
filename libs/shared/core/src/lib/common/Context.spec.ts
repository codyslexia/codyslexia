/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Context } from './Context'

describe('@shared/core - Context', () => {
  type TestType = {
    a: number
    b: string
  }

  const props: TestType = { a: 1, b: 'test' }

  let context: Context<TestType>

  beforeEach(() => {
    context = new Context(props)
  })

  it('should resolve values correctly', () => {
    expect(context.resolve('a')).toBe(1)
    expect(context.resolve('b')).toBe('test')
  })

  it('should extend context correctly', () => {
    const extendedProps = { c: true }
    const extendedContext = context.extend(extendedProps)
    expect(extendedContext.resolve('a')).toBe(1)
    expect(extendedContext.resolve('b')).toBe('test')
    expect(extendedContext.resolve('c')).toBe(true)
  })
})
