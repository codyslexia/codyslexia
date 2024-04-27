/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { transform } from './transform'

const records = [
  { name: 'john', type: 'guest', age: 20 },
  { name: 'jane', type: 'admin', age: 35 },
  { name: 'joe', type: 'guest', age: 40 },
  { name: 'jill', type: 'admin', age: 55 },
]

describe('@shared/utils - transform', () => {
  it('should transform an array of objects into an object', () => {
    const transformed = transform(records, 'name', 'type')
    expect(transformed).toEqual({
      john: 'guest',
      jane: 'admin',
      joe: 'guest',
      jill: 'admin',
    })
  })

  it('should transform an array of objects into an object with a single key', () => {
    const transformed = transform(records, 'name')
    expect(transformed).toEqual({
      john: { name: 'john', type: 'guest', age: 20 },
      jane: { name: 'jane', type: 'admin', age: 35 },
      joe: { name: 'joe', type: 'guest', age: 40 },
      jill: { name: 'jill', type: 'admin', age: 55 },
    })
  })

  it('should throw an error if the key is not a valid object key type', () => {
    // @ts-expect-error - Testing invalid key type
    expect(() => transform(records, 'email')).toThrow()
  })
})
