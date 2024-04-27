/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'
import { GatewayTimeout } from './GatewayTimeout'

describe('GatewayTimeout', () => {
  it('should have the correct status code', () => {
    const error = new GatewayTimeout()
    expect(error.status).toBe(HttpStatus.GATEWAY_TIMEOUT)
  })

  it('should have the correct message', () => {
    const error = new GatewayTimeout()
    expect(error.message).toBe('Gateway Timeout')
  })

  it('should have the correct name', () => {
    const error = new GatewayTimeout()
    expect(error.name).toBe('GatewayTimeout')
  })

  it('should have the correct status text', () => {
    const error = new GatewayTimeout()
    expect(error.statusText).toBe('Gateway Timeout')
  })

  it('should have the correct serialize result', () => {
    const error = new GatewayTimeout()
    expect(error.serialize()).toEqual([{ status: 504, message: 'Gateway Timeout' }])
  })

  it('should be an instance of GatewayTimeout', () => {
    const error = new GatewayTimeout()
    expect(error instanceof GatewayTimeout).toBe(true)
  })

  it('should be an instance of Error', () => {
    const error = new GatewayTimeout()
    expect(error instanceof Error).toBe(true)
  })

  it('should be an instance of HttpException', () => {
    const error = new GatewayTimeout()
    expect(error instanceof HttpException).toBe(true)
  })
})
