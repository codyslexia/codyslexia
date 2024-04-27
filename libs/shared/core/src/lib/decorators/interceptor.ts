/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Interceptor } from '../interfaces'

/**
 * Decorator to intercept a method call.
 *
 * @param options The interceptor options.
 * @param target The target object.
 * @param propertyKey The property key.
 * @param descriptor The property descriptor.
 * @returns The property descriptor.
 * @example
 * ```ts
 * class Service {
 *   @intercept({
 *     before: (a) => console.log('before:', a),
 *     after: (b) => console.log('after:', b),
 *   })
 *   public static create(name = '') {
 *     console.log('created')
 *     return name.toUpperCase()
 *   }
 * }
 * const s = Service.create('john doe')
 * // before: john doe
 * // created
 * // after: JOHN DOE
 * ```
 * @see https://www.typescriptlang.org/docs/handbook/decorators.html#method-decorators
 */
export function interceptor(options: Interceptor) {
  return function intercept<T = unknown>(
    target: T,
    propertyKey: PropertyKey,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value

    descriptor.value = async function (...args: unknown[]) {
      if (options.before) await options.before(...args)

      try {
        const result = await originalMethod.apply(this, args)
        if (options.after) await options.after(result, ...args)
        return result
      } catch (error) {
        if (options.error) await options.error(error as Error, ...args)
        if (options?.shouldThrow) throw error
      }
    }

    return descriptor
  }
}
