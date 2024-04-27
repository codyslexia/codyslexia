/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createUUID } from './create-uuid'

describe('@shared/utils - createUUID', () => {
  it('should generate a UUID', () => {
    const uuid = createUUID()
    expect(uuid).toBeTruthy()
  })

  it('should generate a different UUID', () => {
    const uuid1 = createUUID()
    const uuid2 = createUUID()
    expect(uuid1).not.toEqual(uuid2)
  })

  it('should generate a UUID with 36 characters', () => {
    const uuid = createUUID()
    expect(uuid.length).toEqual(36)
  })

  it('should generate a UUID with 4 dashes', () => {
    const uuid = createUUID()
    expect(uuid.split('-').length).toEqual(5)
  })

  it('should generate a UUID with 8-4-4-4-12 characters', () => {
    const uuid = createUUID()
    const [a, b, c, d, e] = uuid.split('-')
    expect(a.length).toEqual(8)
    expect(b.length).toEqual(4)
    expect(c.length).toEqual(4)
    expect(d.length).toEqual(4)
    expect(e.length).toEqual(12)
  })

  it('should generate a UUID with only hexadecimal characters', () => {
    const uuid = createUUID()
    const [a, b, c, d, e] = uuid.split('-')
    expect(a).toMatch(/^[0-9a-f]+$/)
    expect(b).toMatch(/^[0-9a-f]+$/)
    expect(c).toMatch(/^[0-9a-f]+$/)
    expect(d).toMatch(/^[0-9a-f]+$/)
    expect(e).toMatch(/^[0-9a-f]+$/)
  })
})
