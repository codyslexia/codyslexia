/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Request, Response, NextFunction } from 'express'

import { HttpStatus, HttpStatusNames } from '../enums/HttpStatus'

export abstract class ExpressController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected abstract handler(req: Request, res: Response, next?: NextFunction): Promise<void | any>

  public async execute(req: Request, res: Response): Promise<void> {
    // TODO: parse the request body and query params into a dictionary

    try {
      await this.handler(req, res)
    } catch (err) {
      this.fail(res, 'An unexpected error occurred')
    }
  }

  public send<T = unknown>(res: Response, body?: T) {
    if (!body) return res.sendStatus(HttpStatus.OK)
    return res.type('application/json').status(HttpStatus.OK).send(body)
  }

  public json<T = unknown>(res: Response, body?: T) {
    if (!body) return res.sendStatus(HttpStatus.OK)
    return res.type('application/json').status(HttpStatus.OK).json(body)
  }

  public ok<T = unknown>(res: Response, body?: T) {
    if (!body) return res.sendStatus(HttpStatus.OK)
    return res.type('application/json').status(HttpStatus.OK).json(body)
  }

  public created<T = unknown>(res: Response, body?: T) {
    if (!body) return res.sendStatus(HttpStatus.CREATED)
    return res.type('application/json').status(HttpStatus.CREATED).json(body)
  }

  public clientError(res: Response, message?: string) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: message ?? HttpStatusNames.BAD_REQUEST,
    })
  }

  public unauthorized(res: Response, message?: string) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      message: message ?? HttpStatusNames.UNAUTHORIZED,
    })
  }

  public paymentRequired(res: Response, message?: string) {
    return res.status(HttpStatus.PAYMENT_REQUIRED).json({
      status: HttpStatus.PAYMENT_REQUIRED,
      message: message ?? HttpStatusNames.PAYMENT_REQUIRED,
    })
  }

  public forbidden(res: Response, message?: string) {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      message: message ?? HttpStatusNames.FORBIDDEN,
    })
  }

  public notFound(res: Response, message?: string) {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      message: message ?? HttpStatusNames.NOT_FOUND,
    })
  }

  public conflict(res: Response, message?: string) {
    return res.status(HttpStatus.CONFLICT).json({
      status: HttpStatus.CONFLICT,
      message: message ?? HttpStatusNames.CONFLICT,
    })
  }

  public tooMany(res: Response, message?: string) {
    return res.status(HttpStatus.TOO_MANY_REQUESTS).json({
      status: HttpStatus.TOO_MANY_REQUESTS,
      message: message ?? HttpStatusNames.TOO_MANY_REQUESTS,
    })
  }

  public notImplemented(res: Response) {
    return res.status(HttpStatus.NOT_IMPLEMENTED).json({
      status: HttpStatus.NOT_IMPLEMENTED,
      message: HttpStatusNames.NOT_IMPLEMENTED,
    })
  }

  public fail(res: Response, error?: Error | string) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error?.toString() ?? HttpStatusNames.INTERNAL_SERVER_ERROR,
    })
  }
}

export class ExpressControllerExample extends ExpressController {
  protected async handler(req: Request, res: Response): Promise<void> {
    this.ok(res, { message: 'Hello World!' })
  }
}
