/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'
import { Conflict } from './Conflict'

describe('@shared/core - Conflict', () => {
  it('should have the correct status code', () => {
    const error = new Conflict()
    expect(error.status).toBe(HttpStatus.CONFLICT)
  })

  it('should have the correct message', () => {
    const error = new Conflict()
    expect(error.message).toBe('Conflict')
  })

  it('should have the correct name', () => {
    const error = new Conflict()
    expect(error.name).toBe('Conflict')
  })

  it('should have the correct status text', () => {
    const error = new Conflict()
    expect(error.statusText).toBe('Conflict')
  })

  it('should have the correct serialize result', () => {
    const error = new Conflict()
    expect(error.serialize()).toEqual([{ status: HttpStatus.CONFLICT, message: 'Conflict' }])
  })

  it('should be an instance of Conflict', () => {
    const error = new Conflict()
    expect(error instanceof Conflict).toBe(true)
  })

  it('should be an instance of Error', () => {
    const error = new Conflict()
    expect(error instanceof Error).toBe(true)
  })

  it('should be an instance of HttpException', () => {
    const error = new Conflict()
    expect(error instanceof HttpException).toBe(true)
  })
})
