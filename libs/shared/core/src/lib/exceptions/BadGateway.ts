/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *Bad Gateway* type errors.
 *
 * @example
 * import { BadGatewayError } from '@shared/core'
 * throw new BadGatewayError() // HTTP 502 Bad Gateway
 */
export class BadGatewayError extends HttpException {
  public status = HttpStatus.BAD_GATEWAY
  public statusText = 'Bad Gateway'
  public isOperational = false

  constructor(public override message = 'Bad Gateway') {
    super(message)
    Object.setPrototypeOf(this, BadGatewayError.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}
