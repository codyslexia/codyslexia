/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Represents a function that can handle an HTTP request.
 * @param req The HTTP request object.
 * @param res The HTTP response object.
 * @param next A function to call to pass control to the next middleware function.
 * @returns A promise that resolves when the request has been handled.
 */
export interface RequestHandler {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any[]): Promise<void | any> | void
}
