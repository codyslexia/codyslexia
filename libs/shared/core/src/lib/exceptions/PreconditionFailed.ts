/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *PreconditionFailed* type errors.
 *
 * @example
 * import { PreconditionFailed } from '@gzipr/core'
 * throw new PreconditionFailed() // HTTP 412 Precondition Failed
 */
export class PreconditionFailed extends HttpException {
  public status = HttpStatus.PRECONDITION_FAILED
  public statusText = 'Precondition Failed'
  public isOperational = true

  constructor(public message = 'Precondition Failed') {
    super(message)
    Object.setPrototypeOf(this, PreconditionFailed.prototype)
  }

  serialize() {
    return [{ status: this.status, message: this.message }]
  }
}
