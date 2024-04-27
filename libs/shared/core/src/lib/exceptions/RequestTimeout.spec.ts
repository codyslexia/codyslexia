/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'
import { RequestTimeout } from './RequestTimeout'

describe('@shared/core - RequestTimeout', () => {
  it('should have the correct status code', () => {
    const error = new RequestTimeout()
    expect(error.status).toBe(HttpStatus.REQUEST_TIMEOUT)
  })

  it('should have the correct message', () => {
    const error = new RequestTimeout()
    expect(error.message).toBe('Request Timeout')
  })

  it('should have the correct name', () => {
    const error = new RequestTimeout()
    expect(error.name).toBe('RequestTimeout')
  })

  it('should have the correct status text', () => {
    const error = new RequestTimeout()
    expect(error.statusText).toBe('Request Timeout')
  })

  it('should have the correct serialize result', () => {
    const error = new RequestTimeout()
    expect(error.serialize()).toEqual([
      { status: HttpStatus.REQUEST_TIMEOUT, message: 'Request Timeout' },
    ])
  })

  it('should be an instance of RequestTimeout', () => {
    const error = new RequestTimeout()
    expect(error instanceof RequestTimeout).toBe(true)
  })

  it('should be an instance of Error', () => {
    const error = new RequestTimeout()
    expect(error instanceof Error).toBe(true)
  })

  it('should be an instance of HttpException', () => {
    const error = new RequestTimeout()
    expect(error instanceof HttpException).toBe(true)
  })
})
