/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *Unprocessable Entity* type errors.
 *
 * @example
 * import { UnprocessableEntity } from '@shared/core'
 * throw new UnprocessableEntity() // HTTP 422 Unprocessable Entity
 */
export class UnprocessableEntity extends HttpException {
  public status = HttpStatus.UNPROCESSABLE_ENTITY
  public statusText = 'Unprocessable Entity'
  public isOperational = true

  constructor(public message = 'Unprocessable Entity') {
    super(message)
    Object.setPrototypeOf(this, UnprocessableEntity.prototype)
  }

  serialize() {
    return [{ status: this.status, message: this.message }]
  }
}
