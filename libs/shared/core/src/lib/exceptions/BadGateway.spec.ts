/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'
import { BadGatewayError } from './BadGateway'

describe('@shared/core - BadGatewayError', () => {
  it('should have the correct status code', () => {
    const error = new BadGatewayError()
    expect(error.status).toBe(HttpStatus.BAD_GATEWAY)
  })

  it('should have the correct message', () => {
    const error = new BadGatewayError()
    expect(error.message).toBe('Bad Gateway')
  })

  it('should have the correct name', () => {
    const error = new BadGatewayError()
    expect(error.name).toBe('BadGatewayError')
  })

  it('should have the correct status text', () => {
    const error = new BadGatewayError()
    expect(error.statusText).toBe('Bad Gateway')
  })

  it('should have the correct serialize result', () => {
    const error = new BadGatewayError()
    expect(error.serialize()).toEqual([{ message: 'Bad Gateway' }])
  })

  it('should be an instance of BadGatewayError', () => {
    const error = new BadGatewayError()
    expect(error instanceof BadGatewayError).toBe(true)
  })

  it('should be an instance of Error', () => {
    const error = new BadGatewayError()
    expect(error instanceof Error).toBe(true)
  })

  it('should be an instance of HttpException', () => {
    const error = new BadGatewayError()
    expect(error instanceof HttpException).toBe(true)
  })
})
