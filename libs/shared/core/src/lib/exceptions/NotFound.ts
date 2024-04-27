/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { HttpStatus } from '../enums'
import { HttpException } from './HttpException'

/**
 * Exception for *Not Found* type errors.
 */
export class NotFound extends HttpException {
  public status = HttpStatus.NOT_FOUND
  public statusText = 'Not Found'
  public isOperational = true

  constructor(public message = 'Not Found') {
    super(message)
    // set prototype explicitly to avoid `instanceof` errors
    Object.setPrototypeOf(this, NotFound.prototype)
  }

  serialize() {
    return [{ message: 'Not Found' }]
  }
}

/**
 * Defines an HTTP exception for *Resource Not Found* type errors.
 * Alias for `NotFound`.
 *
 * @example
 * import { ResourceNotFound } from '@shared/core'
 * throw new ResourceNotFound() // HTTP 404 Resource Not Found
 */
export class ResourceNotFound extends NotFound {
  override statusText = 'Resource Not Found'

  constructor() {
    super('Resource Not Found')
    Object.setPrototypeOf(this, ResourceNotFound.prototype)
  }

  override serialize() {
    return [{ message: 'Resource Not Found' }]
  }
}

/**
 * Defines an HTTP exception for *Page Not Found* type errors.
 * Alias for `NotFound`.
 *
 * @example
 * import { PageNotFound } from '@shared/core'
 * throw new PageNotFound() // HTTP 404 Page Not Found
 */
export class PageNotFound extends NotFound {
  override statusText = 'Page Not Found'

  constructor() {
    super('Page Not Found')
    Object.setPrototypeOf(this, PageNotFound.prototype)
  }

  override serialize() {
    return [{ message: 'Page Not Found' }]
  }
}
