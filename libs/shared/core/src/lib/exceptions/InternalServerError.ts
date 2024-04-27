/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *Internal Server Error* type errors.
 *
 * @example
 * import { InternalServerError } from '@shared/core'
 * throw new InternalServerError() // HTTP 500 Internal Server Error
 */
export class InternalServerError extends HttpException {
  public status = HttpStatus.INTERNAL_SERVER_ERROR
  public statusText = 'Internal Server Error'
  public isOperational = true

  constructor(public message = 'Internal Server Error') {
    super(message)
    Object.setPrototypeOf(this, InternalServerError.prototype)
  }

  serialize() {
    return [{ status: this.status, message: 'Internal Server Error' }]
  }
}
