/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Interceptor interface for intercepting method calls, requests, responses, process, and errors.
 */
export interface Interceptor {
  before?(...args: any[]): Promise<void> | void
  after?<T>(result: T, ...args: any[]): Promise<void> | void
  error?(error: Error, ...args: any[]): Promise<void> | void
  shouldThrow?: boolean
}
