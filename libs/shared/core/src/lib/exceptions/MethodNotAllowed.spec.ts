/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'
import { MethodNotAllowed } from './MethodNotAllowed'

describe('@shared/core - MethodNotAllowed', () => {
  it('should have the correct status code', () => {
    const error = new MethodNotAllowed()
    expect(error.status).toBe(HttpStatus.METHOD_NOT_ALLOWED)
  })

  it('should have the correct message', () => {
    const error = new MethodNotAllowed()
    expect(error.message).toBe('Method Not Allowed')
  })

  it('should have the correct name', () => {
    const error = new MethodNotAllowed()
    expect(error.name).toBe('MethodNotAllowed')
  })

  it('should have the correct status text', () => {
    const error = new MethodNotAllowed()
    expect(error.statusText).toBe('Method Not Allowed')
  })

  it('should have the correct serialize result', () => {
    const error = new MethodNotAllowed()
    expect(error.serialize()).toEqual([{ message: 'Method Not Allowed' }])
  })

  it('should be an instance of MethodNotAllowed', () => {
    const error = new MethodNotAllowed()
    expect(error instanceof MethodNotAllowed).toBe(true)
  })

  it('should be an instance of Error', () => {
    const error = new MethodNotAllowed()
    expect(error instanceof Error).toBe(true)
  })

  it('should be an instance of HttpException', () => {
    const error = new MethodNotAllowed()
    expect(error instanceof HttpException).toBe(true)
  })
})
