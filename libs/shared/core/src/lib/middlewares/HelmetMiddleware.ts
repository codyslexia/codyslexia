/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import helmet, { HelmetOptions } from 'helmet'
import { Middleware } from '../common'

export class HelmetMiddleware extends Middleware<HelmetOptions> {
  constructor(options?: HelmetOptions) {
    super(options ?? {})
  }

  public getDefaultOptions(): () => Partial<HelmetOptions> {
    return () => ({
      noSniff: true,
    })
  }

  public getMiddleware() {
    const defaultOptions = this.getDefaultOptions()
    return helmet({
      ...defaultOptions(),
      ...this.options,
    } as Readonly<HelmetOptions>)
  }
}
