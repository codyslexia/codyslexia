/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import hpp, { Options as HPPOptions } from 'hpp'
import { Middleware } from '../common'

export class HPPMiddleware extends Middleware<HPPOptions> {
  constructor(options?: HPPOptions) {
    super(options ?? {})
  }

  public getDefaultOptions(): () => HPPOptions {
    return () => ({} as HPPOptions)
  }

  public getMiddleware() {
    const defaultOptions = this.getDefaultOptions()
    return hpp({ ...defaultOptions(), ...this.options })
  }
}
