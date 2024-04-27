/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { DebugService } from './DebugService'
import { StateTransactions } from './StateTransactions'
import { StateService, StateComputedService } from './StateService'
import { Computed, Debug, Stateful, SubscriptionOptions } from './types'

export type StateOptions = {
  transactionsLen?: number
}

export function createState<T>(element: T, options?: StateOptions): Stateful<T> {
  let debugService: Debug<T> | undefined

  if (options !== undefined && options.transactionsLen !== undefined) {
    debugService = new DebugService(new StateTransactions(options.transactionsLen))
  }

  return new StateService(element, debugService)
}

export function createComputedState<T>(
  callback: () => T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deps: Stateful<any>[]
): Computed<T> {
  return new StateComputedService<T>(callback, deps)
}

export type { Stateful, Computed, SubscriptionOptions }
