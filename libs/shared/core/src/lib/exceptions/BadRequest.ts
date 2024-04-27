/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *BadRequest* type errors.
 *
 * @example
 * import { BadRequest } from '@gzipr/core'
 * throw new BadRequest() // HTTP 412 Bad Request
 */
export class BadRequest extends HttpException {
  public status = HttpStatus.BAD_REQUEST
  public statusText = 'Bad Request'
  public isOperational = true

  constructor(public message = 'Bad Request') {
    super(message)
    Object.setPrototypeOf(this, BadRequest.prototype)
  }

  serialize() {
    return [{ message: 'Bad Request' }]
  }
}
