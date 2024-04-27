/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *Conflict* type errors.
 *
 * @example
 * import { Conflict } from '@shared/core'
 * throw new Conflict() // HTTP 409 Conflict
 */
export class Conflict extends HttpException {
  public status = HttpStatus.CONFLICT
  public statusText = 'Conflict'
  public isOperational = true

  constructor(public message = 'Conflict') {
    super(message)
    Object.setPrototypeOf(this, Conflict.prototype)
  }

  serialize() {
    return [{ status: this.status, message: this.message }]
  }
}
