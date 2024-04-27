/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'
import { InvalidMethod } from './InvalidMethod'

describe('@shared/core - InvalidMethod', () => {
  it('should have the correct status code', () => {
    const error = new InvalidMethod()
    expect(error.status).toBe(HttpStatus.METHOD_NOT_ALLOWED)
  })

  it('should have the correct message', () => {
    const error = new InvalidMethod()
    expect(error.message).toBe('Invalid Method')
  })

  it('should have the correct name', () => {
    const error = new InvalidMethod()
    expect(error.name).toBe('InvalidMethod')
  })

  it('should have the correct status text', () => {
    const error = new InvalidMethod()
    expect(error.statusText).toBe('Invalid Method')
  })

  it('should have the correct serialize result', () => {
    const error = new InvalidMethod()
    expect(error.serialize()).toEqual([{ message: 'Invalid Method' }])
  })

  it('should be an instance of InvalidMethod', () => {
    const error = new InvalidMethod()
    expect(error instanceof InvalidMethod).toBe(true)
  })

  it('should be an instance of Error', () => {
    const error = new InvalidMethod()
    expect(error instanceof Error).toBe(true)
  })

  it('should be an instance of HttpException', () => {
    const error = new InvalidMethod()
    expect(error instanceof HttpException).toBe(true)
  })
})
