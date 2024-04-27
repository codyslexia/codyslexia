/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'
import { NotImplemented } from './NotImplemented'

describe('@shared/core - NotImplemented', () => {
  it('should inherit from HttpException', () => {
    expect(new NotImplemented()).toBeInstanceOf(HttpException)
  })

  it('should have the correct status code', () => {
    expect(new NotImplemented().status).toBe(HttpStatus.NOT_IMPLEMENTED)
  })

  it('should have the correct status text', () => {
    expect(new NotImplemented().statusText).toBe('Not Implemented')
  })

  it('should have the correct message', () => {
    expect(new NotImplemented().message).toBe('Not Implemented')
  })

  it('should have the correct name', () => {
    expect(new NotImplemented().name).toBe('NotImplemented')
  })

  it('should serialize to the correct JSON', () => {
    expect(new NotImplemented().toJSON()).toEqual({
      status: HttpStatus.NOT_IMPLEMENTED,
      message: 'Not Implemented',
    })
  })
})
