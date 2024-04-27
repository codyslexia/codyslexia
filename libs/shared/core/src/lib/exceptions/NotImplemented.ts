/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *Not Implemented* type errors.
 *
 * @example
 * import { NotImplemented } from '@shared/core'
 * throw new NotImplemented() // HTTP 501 Not Implemented
 */
export class NotImplemented extends HttpException {
  public status = HttpStatus.NOT_IMPLEMENTED
  public statusText = 'Not Implemented'
  public isOperational = true

  constructor(public message = 'Not Implemented') {
    super(message)
    Object.setPrototypeOf(this, NotImplemented.prototype)
  }

  serialize() {
    return [{ status: this.status, message: this.message }]
  }
}
