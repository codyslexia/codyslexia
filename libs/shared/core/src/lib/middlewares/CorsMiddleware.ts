/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import cors, { CorsOptions } from 'cors'
import { RequestHandler } from 'express'

import { Middleware } from '../common'

export class CorsMiddleware extends Middleware<CorsOptions> {
  constructor(options?: CorsOptions) {
    super(options ?? {})
  }

  public getDefaultOptions(): () => CorsOptions {
    return () => ({
      origin: process.env.NODE_ENV === 'development' ? '*' : true,
      methods: ['GET', 'POST'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: false,
      preflightContinue: false,
      maxAge: 86400,
    })
  }

  public getMiddleware(): RequestHandler {
    const defaultOptions = this.getDefaultOptions()
    return cors({ ...defaultOptions(), ...this.options })
  }
}
