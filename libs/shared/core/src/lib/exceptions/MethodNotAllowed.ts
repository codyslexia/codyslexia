/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *Method Not Allowed* type errors.
 *
 * @example
 * import { InvalidMethod } from '@shared/core'
 * throw new InvalidMethod() // HTTP 405 Method Not Allowed
 */
export class MethodNotAllowed extends HttpException {
  public status = HttpStatus.METHOD_NOT_ALLOWED
  public statusText = 'Method Not Allowed'
  public isOperational = true

  constructor(public override message = 'Method Not Allowed') {
    super('Method Not Allowed')
    Object.setPrototypeOf(this, MethodNotAllowed.prototype)
  }

  serialize() {
    return [{ message: 'Method Not Allowed' }]
  }
}
