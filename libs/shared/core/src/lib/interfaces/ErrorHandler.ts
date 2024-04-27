/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Represents an object that can handle errors that occur during request processing.
 * @template Request The type of the request object.
 * @template Response The type of the response object.
 * @template Optional The type of the optional arguments.
 * @example
 * ```ts
 * class MyErrorHandler implements ErrorHandler {
 *  async handle(err: Error, req: Request, res: Response, ...optional: unknown[]): Promise<void> {
 *   // Handle the error
 * }
 * ```
 */
export interface ErrorHandler {
  handle(err: Error, req: Request, res: Response, ...optional: unknown[]): Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handle(err: any, req: any, res: any, ...optional: any[]): Promise<void>
}
