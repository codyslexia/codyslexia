/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { State } from './State'
import { StateBaseService } from './StateBaseService'
import {
  Computed,
  Debug,
  Stateful,
  SubscriptionCallback,
  SubscriptionOptions,
  UnsubscribeCallback,
  UpdateCallback,
} from './types'
import { formatError } from './utility'

export class StateService<E> implements Stateful<E> {
  constructor(element: E, debugService?: Debug<E>) {
    this.set = this.set.bind(this)
    this.get = this.get.bind(this)
    this.subscribe = this.subscribe.bind(this)
    this.unsubscribeAll = this.unsubscribeAll.bind(this)
    this.getActiveSubscribersCount = this.getActiveSubscribersCount.bind(this)
    this.update = this.update.bind(this)
    this.unwrap = this.unwrap.bind(this)
    this.#stateBaseService = new StateBaseService(element)
    this.DEBUG = debugService
  }

  #stateBaseService: State<E>

  DEBUG: Debug<E> | undefined

  set(newState: E): boolean {
    try {
      this.#stateBaseService.setAcionKindToSet()
      this.#stateBaseService.allowAccessToState()
      this.#stateBaseService.proxiedState.__STATE_WRAPPER__ = newState
      this.#stateBaseService.denyAccessToState()

      if (!this.#stateBaseService.getWasChanged()) {
        return false
      }

      if (this.DEBUG !== undefined) {
        this.DEBUG.transactionService.addTransaction(this.unwrap())
      }

      this.#stateBaseService.setWasChangedToFalse()
      this.#stateBaseService.runActiveSubscribersCb()
      this.#stateBaseService.resetPathToChangedProperty()
      this.#stateBaseService.setAcionKindToNone()

      return true
    } catch (error) {
      throw new Error(formatError('An error occurred while setting the new state', error))
    }
  }

  get(): E {
    return this.#stateBaseService.proxiedState.__STATE_WRAPPER__
  }

  subscribe(
    callback: SubscriptionCallback<E>,
    subscriptionOptions: SubscriptionOptions<E> = {}
  ): UnsubscribeCallback {
    const subscriberId = this.#stateBaseService.generateSubscriberId()

    const conditionCb = subscriptionOptions.condition

    if (subscriptionOptions.properties && subscriptionOptions.properties.length > 0) {
      this.#stateBaseService.isNeedToCheckProperties = true
    }

    this.#stateBaseService.addSubscriber({
      subscriptionId: subscriberId,
      subscriptionCallback: () => callback(this.get()),
      condition: (): boolean => {
        if (subscriptionOptions.properties) {
          if (!this.#stateBaseService.isObject(this.unwrap())) {
            throw new Error("You can't add properties to track if your state is not an object")
          }

          try {
            return this.#stateBaseService.isAnyPropertyPartOfAnyPath(
              subscriptionOptions.properties,
              this.#stateBaseService.getPathToChangedProperty()
            )
          } catch (error) {
            throw new Error(
              formatError(
                'An error occurred when accessing a property from the subscriptionOptions list',
                error
              )
            )
          }
        }

        return conditionCb === undefined || conditionCb(this.get())
      },
      isProtected: subscriptionOptions.protected ?? false,
    })

    return (): void => {
      if (!subscriptionOptions.properties || subscriptionOptions.properties.length === 0) {
        this.#stateBaseService.isNeedToCheckProperties = false
      }

      this.#stateBaseService.unsubscribeById(subscriberId)
    }
  }

  unsubscribeAll(): void {
    this.#stateBaseService.isNeedToCheckProperties = false
    this.#stateBaseService.unsubscribeAll()
  }

  getActiveSubscribersCount(): number {
    return this.#stateBaseService.getActiveSubscribersCount()
  }

  update(updateCb: UpdateCallback<E>): boolean {
    try {
      this.#stateBaseService.setAcionKindToUpdate()
      this.#stateBaseService.allowAccessToState()
      updateCb(this.get())
      this.#stateBaseService.denyAccessToState()

      if (!this.#stateBaseService.getWasChanged()) {
        return false
      }

      if (this.DEBUG !== undefined) {
        this.DEBUG.transactionService.addTransaction(this.unwrap())
      }

      this.#stateBaseService.setWasChangedToFalse()
      this.#stateBaseService.runActiveSubscribersCb()
      this.#stateBaseService.resetPathToChangedProperty()
      this.#stateBaseService.setAcionKindToNone()

      return true
    } catch (error) {
      throw new Error(formatError('An error occurred while update the state', error))
    }
  }

  unwrap(): E {
    this.#stateBaseService.allowUnwrap()
    const unwrapped = this.get()
    this.#stateBaseService.denyUnwrap()

    return unwrapped
  }

  async asyncAction(action: (stateManager: Stateful<E>) => Promise<void>): Promise<void> {
    try {
      await action(this)
    } catch (error) {
      throw new Error(
        `An error occurred while dispatching the async action: ${(error as Error).message}`
      )
    }
  }

  createSelector<T>(selectorFn: (state: E) => T): Computed<T> {
    const selector = (): T => selectorFn(this.get())
    return new StateComputedService<T>(selector, [this])
  }
}

export class StateComputedService<T> implements Computed<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(callback: () => T, deps: (Stateful<any> | Computed<any>)[]) {
    if (!deps.length) {
      throw new Error('')
    }

    this.#state = new StateService<T>(callback())

    for (const d of deps) {
      d.subscribe(
        () => {
          this.#state.set(callback())
        },
        { protected: true }
      )
    }

    this.get = this.get.bind(this)
    this.subscribe = this.subscribe.bind(this)
    this.unsubscribeAll = this.unsubscribeAll.bind(this)
    this.getActiveSubscribersCount = this.getActiveSubscribersCount.bind(this)
    this.unwrap = this.unwrap.bind(this)
  }

  #state: Stateful<T>

  get(): T {
    return this.#state.get()
  }

  subscribe(
    callback: SubscriptionCallback<T>,
    subscriptionOptions?: SubscriptionOptions<T>
  ): UnsubscribeCallback {
    return this.#state.subscribe(callback, subscriptionOptions)
  }

  unsubscribeAll(): void {
    this.#state.unsubscribeAll()
  }

  getActiveSubscribersCount(): number {
    return this.#state.getActiveSubscribersCount()
  }

  unwrap(): T {
    return this.#state.unwrap()
  }
}
