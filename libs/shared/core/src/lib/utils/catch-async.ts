/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NextFunction, Request, RequestHandler, Response } from 'express'

type AsyncRequestHandler = <F extends RequestHandler>(
  f: F
) => (req: Request, res: Response, next: NextFunction) => void

/**
 * Calls the function and passes any errors to the next function.
 * @param fn The function to call.
 */
export const catchAsync: AsyncRequestHandler =
  <F extends RequestHandler>(fn: F) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err))
  }

/**
 * Calls the function and catches any errors that occur.
 * @param fn The function to call.
 */
export const tryCatch: AsyncRequestHandler =
  <F extends RequestHandler>(fn: F) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
