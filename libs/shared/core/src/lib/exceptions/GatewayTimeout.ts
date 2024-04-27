/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *Gateway Timeout* type errors.
 *
 * @example
 * import { GatewayTimeout } from '@shared/core'
 * throw new GatewayTimeout() // HTTP 504 Gateway Timeout
 */
export class GatewayTimeout extends HttpException {
  public status = HttpStatus.GATEWAY_TIMEOUT
  public statusText = 'Gateway Timeout'
  public isOperational = false

  constructor(public message = 'Gateway Timeout') {
    super(message)
    Object.setPrototypeOf(this, GatewayTimeout.prototype)
  }

  serialize() {
    return [{ status: this.status, message: this.message }]
  }
}
