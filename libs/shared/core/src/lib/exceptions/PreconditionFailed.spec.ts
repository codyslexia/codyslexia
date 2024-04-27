/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { PreconditionFailed } from './PreconditionFailed'
import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

describe('PreconditionFailed', () => {
  it('should create a new instance of PreconditionFailed', () => {
    const preconditionFailed = new PreconditionFailed()
    expect(preconditionFailed).toBeInstanceOf(PreconditionFailed)
    expect(preconditionFailed).toBeInstanceOf(HttpException)
    expect(preconditionFailed).toBeInstanceOf(Error)
  })

  it('should set the status property correctly', () => {
    const preconditionFailed = new PreconditionFailed()
    expect(preconditionFailed.status).toBe(HttpStatus.PRECONDITION_FAILED)
  })

  it('should set the statusText property correctly', () => {
    const preconditionFailed = new PreconditionFailed()
    expect(preconditionFailed.statusText).toBe('Precondition Failed')
  })

  it('should set the isOperational property to true', () => {
    const preconditionFailed = new PreconditionFailed()
    expect(preconditionFailed.isOperational).toBe(true)
  })

  it('should set the message property correctly', () => {
    const preconditionFailed = new PreconditionFailed()
    expect(preconditionFailed.message).toBe('Precondition Failed')
  })

  it('should serialize the error correctly', () => {
    const preconditionFailed = new PreconditionFailed()
    const serialized = preconditionFailed.serialize()
    expect(serialized).toEqual([
      { status: HttpStatus.PRECONDITION_FAILED, message: 'Precondition Failed' },
    ])
  })
})
