/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *Forbidden* type errors.
 *
 * @example
 * import { Forbidden } from '@shared/core'
 * throw new Forbidden() // HTTP 403 Forbidden
 */
export class Forbidden extends HttpException {
  public status = HttpStatus.FORBIDDEN
  public statusText = 'Forbidden'
  public isOperational = false

  constructor(public message = 'Forbidden') {
    super(message)
    Object.setPrototypeOf(this, Forbidden.prototype)
  }

  serialize() {
    return [{ status: this.status, message: this.message }]
  }
}
