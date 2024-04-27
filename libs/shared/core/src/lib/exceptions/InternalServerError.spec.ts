/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'
import { InternalServerError } from './InternalServerError'

describe('@shared/core - InternalServerError', () => {
  it('should have the correct status code', () => {
    const error = new InternalServerError()
    expect(error.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
  })

  it('should have the correct message', () => {
    const error = new InternalServerError()
    expect(error.message).toBe('Internal Server Error')
  })

  it('should have the correct name', () => {
    const error = new InternalServerError()
    expect(error.name).toBe('InternalServerError')
  })

  it('should have the correct status text', () => {
    const error = new InternalServerError()
    expect(error.statusText).toBe('Internal Server Error')
  })

  it('should have the correct serialize result', () => {
    const error = new InternalServerError()
    expect(error.serialize()).toEqual([
      { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal Server Error' },
    ])
  })

  it('should be an instance of InternalServerError', () => {
    const error = new InternalServerError()
    expect(error instanceof InternalServerError).toBe(true)
  })

  it('should be an instance of Error', () => {
    const error = new InternalServerError()
    expect(error instanceof Error).toBe(true)
  })

  it('should be an instance of HttpException', () => {
    const error = new InternalServerError()
    expect(error instanceof HttpException).toBe(true)
  })
})
