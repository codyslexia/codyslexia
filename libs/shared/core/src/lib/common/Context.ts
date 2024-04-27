/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Represents a context object that stores key-value pairs of properties.
 * @template T The type of the properties stored in the context object.
 */
export class Context<T extends object> {
  private readonly registry: Map<keyof T, T[keyof T]> = new Map()

  public constructor(private readonly props: T) {
    for (const [key, value] of Object.entries(props)) {
      if (this.registry.has(key as keyof T)) continue
      this.registry.set(key as keyof T, value)
    }
  }

  public resolve<K extends keyof T>(key: K): T[K] {
    return this.registry.get(key) as T[K]
  }

  public extend<U extends object>(props: U): Context<T & U> {
    return new Context<T & U>({ ...this.props, ...props })
  }
}
