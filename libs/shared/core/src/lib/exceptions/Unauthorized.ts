/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *Unauthorized* type errors.
 *
 * @example
 * import { Unauthorized } from '@shared/core'
 * throw new Unauthorized() // HTTP 401 Unauthorized
 */
export class Unauthorized extends HttpException {
  public status = HttpStatus.UNAUTHORIZED
  public statusText = 'Unauthorized'
  public isOperational = true

  constructor(public message = 'Unauthorized') {
    super(message)
    Object.setPrototypeOf(this, Unauthorized.prototype)
  }

  serialize() {
    return [{ status: this.status, message: 'Unauthorized' }]
  }
}

/**
 * Defines an HTTP exception for *Not Authorized* type errors.
 * Alias for `Unauthorized`.
 *
 * @example
 * import { NotAuthorized } from '@shared/core'
 * throw new NotAuthorized() // HTTP 401 Not Authorized
 */
export class NotAuthorized extends Unauthorized {
  override statusText = 'Not Authorized'

  constructor() {
    super('Not Authorized')
    Object.setPrototypeOf(this, NotAuthorized.prototype)
  }

  override serialize() {
    return [{ status: this.status, message: 'Not Authorized' }]
  }
}
