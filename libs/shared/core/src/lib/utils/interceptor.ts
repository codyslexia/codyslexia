/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Interceptor } from '../interfaces'

export function intercept(interceptor: Interceptor) {
  return function (target: CallableFunction) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (...args: any[]) {
      interceptor.before(...args)
      try {
        const result = target(...args)
        interceptor.after(result, ...args)
        return result
      } catch (error) {
        interceptor.error(error, ...args)
        throw error
      }
    }
  }
}
