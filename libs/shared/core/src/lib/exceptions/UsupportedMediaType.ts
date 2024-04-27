/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *Unsupported Media Type* type errors.
 *
 * @example
 * import { UnsupportedMediaType } from '@shared/core'
 * throw new UnsupportedMediaType() // HTTP 415 Unsupported Media Type
 */
export class UnsupportedMediaType extends HttpException {
  public status = HttpStatus.UNSUPPORTED_MEDIA_TYPE
  public statusText = 'Unsupported Media Type'
  public isOperational = false

  constructor(public message = 'Unsupported Media Type') {
    super(message)
    Object.setPrototypeOf(this, UnsupportedMediaType.prototype)
  }

  serialize() {
    return [{ status: HttpStatus.UNSUPPORTED_MEDIA_TYPE, message: this.message }]
  }
}
