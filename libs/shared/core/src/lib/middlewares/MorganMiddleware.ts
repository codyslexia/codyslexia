/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Request, Response } from 'express'
import morgan, { Options as MorganOptions, FormatFn } from 'morgan'

import { Logger } from '../logger/Logger'
import { Middleware } from '../common'
import { ConsoleLogger } from '../logger'

export interface MorganMiddlewareOptions {
  format?: string | FormatFn
  options?: MorganOptions<Request, Response>
  logger?: Logger
}

export class MorganMiddleware extends Middleware<MorganMiddlewareOptions> {
  constructor(options?: MorganMiddlewareOptions) {
    super(options ?? {})
  }

  public getDefaultOptions(): () => MorganMiddlewareOptions {
    return () =>
      ({
        format: 'dev',
        options: {},
        logger: new ConsoleLogger(),
      } as MorganMiddlewareOptions)
  }

  public getMiddleware(): ReturnType<typeof morgan> {
    const defaultOptions = this.getDefaultOptions()

    const { format, options, logger } = defaultOptions()

    const morganFormat = format ?? 'dev'
    const morganOptions = options ?? {}

    // TODO: Review this type casting
    return morgan(morganFormat as morgan.FormatFn, {
      ...morganOptions,
      stream: {
        write: (message: string) => logger.log(message.trim()),
      },
    })
  }
}
