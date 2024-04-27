/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'
import { UnprocessableEntity } from './UnprocessableEntity'

describe('@shared/core - UnprocessableEntity', () => {
  it('should have the correct status code', () => {
    const error = new UnprocessableEntity()
    expect(error.status).toBe(HttpStatus.UNPROCESSABLE_ENTITY)
  })

  it('should have the correct message', () => {
    const error = new UnprocessableEntity()
    expect(error.message).toBe('Unprocessable Entity')
  })

  it('should have the correct name', () => {
    const error = new UnprocessableEntity()
    expect(error.name).toBe('UnprocessableEntity')
  })

  it('should have the correct status text', () => {
    const error = new UnprocessableEntity()
    expect(error.statusText).toBe('Unprocessable Entity')
  })

  it('should have the correct serialize result', () => {
    const error = new UnprocessableEntity()
    expect(error.serialize()).toEqual([
      { status: HttpStatus.UNPROCESSABLE_ENTITY, message: 'Unprocessable Entity' },
    ])
  })

  it('should be an instance of UnprocessableEntity', () => {
    const error = new UnprocessableEntity()
    expect(error instanceof UnprocessableEntity).toBe(true)
  })

  it('should be an instance of Error', () => {
    const error = new UnprocessableEntity()
    expect(error instanceof Error).toBe(true)
  })

  it('should be an instance of HttpException', () => {
    const error = new UnprocessableEntity()
    expect(error instanceof HttpException).toBe(true)
  })
})
