/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'
import { Forbidden } from './Forbidden'

describe('@shared/core - Forbidden', () => {
  it('should have the correct status code', () => {
    const error = new Forbidden()
    expect(error.status).toBe(HttpStatus.FORBIDDEN)
  })

  it('should have the correct message', () => {
    const error = new Forbidden()
    expect(error.message).toBe('Forbidden')
  })

  it('should have the correct name', () => {
    const error = new Forbidden()
    expect(error.name).toBe('Forbidden')
  })

  it('should have the correct status text', () => {
    const error = new Forbidden()
    expect(error.statusText).toBe('Forbidden')
  })

  it('should have the correct serialize result', () => {
    const error = new Forbidden()
    expect(error.serialize()).toEqual([{ status: 403, message: 'Forbidden' }])
  })

  it('should be an instance of Forbidden', () => {
    const error = new Forbidden()
    expect(error instanceof Forbidden).toBe(true)
  })

  it('should be an instance of Error', () => {
    const error = new Forbidden()
    expect(error instanceof Error).toBe(true)
  })

  it('should be an instance of HttpException', () => {
    const error = new Forbidden()
    expect(error instanceof HttpException).toBe(true)
  })
})
