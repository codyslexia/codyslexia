/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { StateTransactions } from './StateTransactions'

/**
 * Wrapper for the ability to save entities other than an object or array.
 */
export type StateWrapper<T> = { __STATE_WRAPPER__: T }

/**
 * Subscriber object for internal use.
 */
export type Subscriber = {
  subscriptionId: string
  subscriptionCallback: () => void
  /**
   * To determine whether subscribers need to be notified of a status change.
   * For internal use.
   */
  condition?: () => boolean
  isProtected: boolean
}

/**
 * A callback function that will be called every time the state changes.
 * Can take the updated state as an argument.
 */
export type SubscriptionCallback<T> = (newState: T) => void

/**
 * A callback function for unsubscribing.
 */
export type UnsubscribeCallback = () => void

/** Callback for state updates. */
export type UpdateCallback<T> = (state: T) => void

/**
 * It may contain additional information about the subscriber,
 * as well as a condition for notification, a mark that the subscriber is protected and properties to watch.
 */
export type SubscriptionOptions<T> = {
  condition?: (state: T) => boolean
  protected?: boolean
  properties?: Array<string>
}

export type ActionKind = 'update' | 'set' | 'none'

export type Transaction<T> = {
  number: number
  snapshot: T
  timestamp: number
}

export type TransactionDiff<T> = {
  old: T
  new: T
}

export interface Debug<T> {
  transactionService: StateTransactions<T>
}

export interface Computed<T> {
  get(): T
  unwrap(): T
  subscribe(
    callback: SubscriptionCallback<T>,
    subscriptionOptions?: SubscriptionOptions<T>
  ): UnsubscribeCallback
  unsubscribeAll(): void
  getActiveSubscribersCount(): number
}

export interface Stateful<T> {
  set(newState: T): boolean
  get(): T
  subscribe(
    callback: SubscriptionCallback<T>,
    subscriptionOptions?: SubscriptionOptions<T>
  ): UnsubscribeCallback
  unsubscribeAll(): void
  getActiveSubscribersCount(): number
  update(updateCb: UpdateCallback<T>, currentState?: T): void
  unwrap(): T
  asyncAction(action: (stateManager: Stateful<T>) => Promise<void>): Promise<void>
  createSelector<E>(selectorFn: (state: T) => E): Computed<E>
  DEBUG?: Debug<T>
}
