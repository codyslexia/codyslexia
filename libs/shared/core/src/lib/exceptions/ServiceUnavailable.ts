/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *Service Unavailable* type errors.
 *
 * @example
 * import { ServiceUnavailable } from '@shared/core'
 * throw new ServiceUnavailable() // HTTP 503 Service Unavailable
 */
export class ServiceUnavailable extends HttpException {
  public status = HttpStatus.SERVICE_UNAVAILABLE
  public statusText = 'Service Unavailable'
  public isOperational = true

  constructor(public message = 'Service Unavailable') {
    super(message)
    Object.setPrototypeOf(this, ServiceUnavailable.prototype)
  }

  serialize() {
    return [{ status: this.status, message: this.message }]
  }
}
