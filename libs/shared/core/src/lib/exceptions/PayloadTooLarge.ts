/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

/**
 * Defines an HTTP exception for *Payload Too Large* type errors.
 *
 * @example
 * import { PayloadTooLarge } from '@shared/core'
 * throw new PayloadTooLarge() // HTTP 413 Payload Too Large
 */
export class PayloadTooLarge extends HttpException {
  public status = HttpStatus.PAYLOAD_TOO_LARGE
  public statusText = 'Payload Too Large'
  public isOperational = true

  constructor(public message = 'Payload Too Large') {
    super(message)
    Object.setPrototypeOf(this, PayloadTooLarge.prototype)
  }

  serialize() {
    return [{ message: this.message }]
  }
}
