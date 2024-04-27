/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NotFound } from './NotFound'
import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

describe('NotFound', () => {
  it('should create a new instance of NotFound', () => {
    const notFound = new NotFound()
    expect(notFound).toBeInstanceOf(NotFound)
    expect(notFound).toBeInstanceOf(HttpException)
    expect(notFound).toBeInstanceOf(Error)
  })

  it('should set the status property correctly', () => {
    const notFound = new NotFound()
    expect(notFound.status).toBe(HttpStatus.NOT_FOUND)
  })

  it('should set the statusText property correctly', () => {
    const notFound = new NotFound()
    expect(notFound.statusText).toBe('Not Found')
  })

  it('should set the isOperational property to true', () => {
    const notFound = new NotFound()
    expect(notFound.isOperational).toBe(true)
  })

  it('should set the message property correctly', () => {
    const notFound = new NotFound()
    expect(notFound.message).toBe('Not Found')
  })

  it('should serialize the error correctly', () => {
    const notFound = new NotFound()
    const serialized = notFound.serialize()
    expect(serialized).toEqual([{ message: 'Not Found' }])
  })
})
