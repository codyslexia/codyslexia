/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { RequestHandler } from '../interfaces/RequestHandler'

/**
 * Represents a middleware that can be used in a web server to handle HTTP requests.
 * @template T The type of options that can be passed to the middleware.
 */
export abstract class Middleware<T = unknown> {
  constructor(protected options: T) {}

  /**
   * This method should be implemented by subclasses to return default options.
   * @returns A function that returns the default options for the middleware.
   */
  abstract getDefaultOptions(): () => T

  /**
   * This method should be implemented by subclasses to return the middleware function.
   * @returns The middleware function that handles HTTP requests.
   */
  abstract getMiddleware(): RequestHandler
}
