/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'
import { ServiceUnavailable } from './ServiceUnavailable'

describe('@shared/core - ServiceUnavailable', () => {
  it('should have the correct status code', () => {
    const error = new ServiceUnavailable()
    expect(error.status).toBe(HttpStatus.SERVICE_UNAVAILABLE)
  })

  it('should have the correct message', () => {
    const error = new ServiceUnavailable()
    expect(error.message).toBe('Service Unavailable')
  })

  it('should have the correct name', () => {
    const error = new ServiceUnavailable()
    expect(error.name).toBe('ServiceUnavailable')
  })

  it('should have the correct status text', () => {
    const error = new ServiceUnavailable()
    expect(error.statusText).toBe('Service Unavailable')
  })

  it('should have the correct serialize result', () => {
    const error = new ServiceUnavailable()
    expect(error.serialize()).toEqual([
      { status: HttpStatus.SERVICE_UNAVAILABLE, message: 'Service Unavailable' },
    ])
  })

  it('should be an instance of ServiceUnavailable', () => {
    const error = new ServiceUnavailable()
    expect(error instanceof ServiceUnavailable).toBe(true)
  })

  it('should be an instance of Error', () => {
    const error = new ServiceUnavailable()
    expect(error instanceof Error).toBe(true)
  })

  it('should be an instance of HttpException', () => {
    const error = new ServiceUnavailable()
    expect(error instanceof HttpException).toBe(true)
  })
})
