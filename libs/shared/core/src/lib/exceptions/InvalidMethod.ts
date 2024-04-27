/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { MethodNotAllowed } from './MethodNotAllowed'

/**
 * Defines an HTTP exception for *Method Not Allowed* type errors.
 * Alias for `MethodNotAllowed`.
 *
 * @example
 * import { InvalidMethod } from '@shared/core'
 * throw new InvalidMethod() // HTTP 405 Method Not Allowed
 */
export class InvalidMethod extends MethodNotAllowed {
  override statusText = 'Invalid Method'

  constructor(public override message = 'Invalid Method') {
    super('Invalid Method')
    Object.setPrototypeOf(this, InvalidMethod.prototype)
  }

  override serialize() {
    return [{ message: 'Invalid Method' }]
  }
}
