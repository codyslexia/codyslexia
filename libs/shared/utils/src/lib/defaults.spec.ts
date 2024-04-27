/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defaults } from './defaults'

describe('@shared/utils - defaults', () => {
  it('should not override set options', () => {
    const options = { name: 'test' }
    const result = defaults(options, { name: 'moka' })
    expect(result).toEqual({ name: 'test' })
  })

  it('should set default options', () => {
    const options = { name: 'test' }
    const result = defaults(options, {
      name: 'moka',
      age: 10,
    })
    expect(result).toEqual({ name: 'test', age: 10 })
  })

  it('should compose objects without overriding set defaults', () => {
    const options = { name: 'test' }
    const defaultOptions = { name: 'moka', price: 10 }
    const consumerOptions = { name: 'john', price: 5, block: true }
    const result = defaults(options, defaultOptions, consumerOptions)
    expect(result).toEqual({ name: 'test', price: 10, block: true })
  })

  it('should allow to set fixed and fallback options', () => {
    const fixed = { port: 3000 }
    const consumer = { name: 'john' }
    const fallback = { name: 'moka' }

    function test(o: Record<string, unknown>) {
      return defaults(fixed, o, fallback)
    }
    expect(test(consumer)).toEqual({ port: 3000, name: 'john' })
  })
})
