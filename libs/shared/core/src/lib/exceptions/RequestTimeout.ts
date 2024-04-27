/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *Request Timeout* type errors.
 *
 * @example
 * import { RequestTimeout } from '@shared/core'
 * throw new RequestTimeout() // HTTP 408 Request Timeout
 */
export class RequestTimeout extends HttpException {
  public status = HttpStatus.REQUEST_TIMEOUT
  public statusText = 'Request Timeout'
  public isOperational = true

  constructor(public message = 'Request Timeout') {
    super(message)
    Object.setPrototypeOf(this, RequestTimeout.prototype)
  }

  serialize() {
    return [{ status: this.status, message: this.message }]
  }
}
