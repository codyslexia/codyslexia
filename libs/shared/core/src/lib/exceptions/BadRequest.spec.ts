/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BadRequest } from './BadRequest'
import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

describe('BadRequest', () => {
  it('should create a new instance of BadRequest', () => {
    const badRequest = new BadRequest()
    expect(badRequest).toBeInstanceOf(BadRequest)
    expect(badRequest).toBeInstanceOf(HttpException)
    expect(badRequest).toBeInstanceOf(Error)
  })

  it('should set the status property correctly', () => {
    const badRequest = new BadRequest()
    expect(badRequest.status).toBe(HttpStatus.BAD_REQUEST)
  })

  it('should set the statusText property correctly', () => {
    const badRequest = new BadRequest()
    expect(badRequest.statusText).toBe('Bad Request')
  })

  it('should set the isOperational property to true', () => {
    const badRequest = new BadRequest()
    expect(badRequest.isOperational).toBe(true)
  })

  it('should set the message property correctly', () => {
    const badRequest = new BadRequest()
    expect(badRequest.message).toBe('Bad Request')
  })

  it('should serialize the error correctly', () => {
    const badRequest = new BadRequest()
    const serialized = badRequest.serialize()
    expect(serialized).toEqual([{ message: 'Bad Request' }])
  })
})
