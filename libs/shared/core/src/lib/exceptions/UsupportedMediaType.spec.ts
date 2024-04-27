/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'
import { UnsupportedMediaType } from './UsupportedMediaType'

describe('@shared/core - UnsupportedMediaType', () => {
  it('should serialize to an array of objects', () => {
    const error = new UnsupportedMediaType()
    expect(error.serialize()).toEqual([
      { status: HttpStatus.UNSUPPORTED_MEDIA_TYPE, message: 'Unsupported Media Type' },
    ])
  })

  it('should have a message', () => {
    const error = new UnsupportedMediaType()
    expect(error.message).toEqual('Unsupported Media Type')
  })

  it('should have a stack trace', () => {
    const error = new UnsupportedMediaType()
    expect(error.stack).toContain('UnsupportedMediaType')
  })

  it('should have a status code', () => {
    const error = new UnsupportedMediaType()
    expect(error.status).toEqual(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
  })

  it('should have a status text', () => {
    const error = new UnsupportedMediaType()
    expect(error.statusText).toEqual('Unsupported Media Type')
  })

  it('should have a name', () => {
    const error = new UnsupportedMediaType()
    expect(error.name).toEqual('UnsupportedMediaType')
  })

  it('should be an instance of Error', () => {
    const error = new UnsupportedMediaType()
    expect(error).toBeInstanceOf(Error)
  })

  it('should be an instance of HttpException', () => {
    const error = new UnsupportedMediaType()
    expect(error).toBeInstanceOf(HttpException)
  })

  it('should be an instance of UnsupportedMediaType', () => {
    const error = new UnsupportedMediaType()
    expect(error).toBeInstanceOf(UnsupportedMediaType)
  })
})
