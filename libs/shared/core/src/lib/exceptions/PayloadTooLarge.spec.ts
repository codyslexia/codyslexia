/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'
import { PayloadTooLarge } from './PayloadTooLarge'

describe('@shared/core - PayloadTooLarge', () => {
  it('should have the correct status code', () => {
    const error = new PayloadTooLarge()
    expect(error.status).toBe(HttpStatus.PAYLOAD_TOO_LARGE)
  })

  it('should have the correct message', () => {
    const error = new PayloadTooLarge()
    expect(error.message).toBe('Payload Too Large')
  })

  it('should have the correct name', () => {
    const error = new PayloadTooLarge()
    expect(error.name).toBe('PayloadTooLarge')
  })

  it('should have the correct status text', () => {
    const error = new PayloadTooLarge()
    expect(error.statusText).toBe('Payload Too Large')
  })

  it('should have the correct serialize result', () => {
    const error = new PayloadTooLarge()
    expect(error.serialize()).toEqual([
      {
        message: 'Payload Too Large',
      },
    ])
  })

  it('should be an instance of PayloadTooLarge', () => {
    const error = new PayloadTooLarge()
    expect(error instanceof PayloadTooLarge).toBe(true)
  })

  it('should be an instance of Error', () => {
    const error = new PayloadTooLarge()
    expect(error instanceof Error).toBe(true)
  })

  it('should be an instance of HttpException', () => {
    const error = new PayloadTooLarge()
    expect(error instanceof HttpException).toBe(true)
  })
})
