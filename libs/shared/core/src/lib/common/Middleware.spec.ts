/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Middleware } from './Middleware'
import { RequestHandler } from '../interfaces/RequestHandler'

class TestMiddleware extends Middleware<object> {
  constructor(options?: object) {
    super(options)
  }

  getDefaultOptions() {
    return () => ({ option: false })
  }

  getMiddleware(): RequestHandler {
    return async () => ({
      ...this.getDefaultOptions()(),
      ...this.options,
    })
  }
}

describe('@shared/core - Middleware', () => {
  it('should return default options', () => {
    const middleware = new TestMiddleware()
    expect(middleware.getDefaultOptions()()).toEqual({ option: false })
  })

  it('should return options from constructor', async () => {
    const middleware = new TestMiddleware({ option: true })
    expect(await middleware.getMiddleware()()).toEqual({ option: true })
  })
})
