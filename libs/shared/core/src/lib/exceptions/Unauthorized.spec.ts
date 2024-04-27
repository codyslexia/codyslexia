/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'
import { Unauthorized, NotAuthorized } from './Unauthorized'

describe('@shared/core - Unauthorized', () => {
  it('should have the correct status code', () => {
    const error = new Unauthorized()
    expect(error.status).toBe(HttpStatus.UNAUTHORIZED)
  })

  it('should have the correct message', () => {
    const error = new Unauthorized()
    expect(error.message).toBe('Unauthorized')
  })

  it('should have the correct name', () => {
    const error = new Unauthorized()
    expect(error.name).toBe('Unauthorized')
  })

  it('should have the correct status text', () => {
    const error = new Unauthorized()
    expect(error.statusText).toBe('Unauthorized')
  })

  it('should have the correct serialize result', () => {
    const error = new Unauthorized()
    expect(error.serialize()).toEqual([{ status: 401, message: 'Unauthorized' }])
  })

  it('should be an instance of Unauthorized', () => {
    const error = new Unauthorized()
    expect(error instanceof Unauthorized).toBe(true)
  })

  it('should be an instance of Error', () => {
    const error = new Unauthorized()
    expect(error instanceof Error).toBe(true)
  })

  it('should be an instance of HttpException', () => {
    const error = new Unauthorized()
    expect(error instanceof HttpException).toBe(true)
  })
})

describe('@shared/core - NotAuthorized', () => {
  it('should have the correct status code', () => {
    const error = new NotAuthorized()
    expect(error.status).toBe(HttpStatus.UNAUTHORIZED)
  })

  it('should have the correct message', () => {
    const error = new NotAuthorized()
    expect(error.message).toBe('Not Authorized')
  })

  it('should have the correct name', () => {
    const error = new NotAuthorized()
    expect(error.name).toBe('NotAuthorized')
  })

  it('should have the correct status text', () => {
    const error = new NotAuthorized()
    expect(error.statusText).toBe('Not Authorized')
  })

  it('should have the correct serialize result', () => {
    const error = new NotAuthorized()
    expect(error.serialize()).toEqual([
      { status: HttpStatus.UNAUTHORIZED, message: 'Not Authorized' },
    ])
  })

  it('should be an instance of NotAuthorized', () => {
    const error = new NotAuthorized()
    expect(error instanceof NotAuthorized).toBe(true)
  })

  it('should be an instance of Error', () => {
    const error = new NotAuthorized()
    expect(error instanceof Error).toBe(true)
  })

  it('should be an instance of HttpException', () => {
    const error = new NotAuthorized()
    expect(error instanceof HttpException).toBe(true)
  })
})
