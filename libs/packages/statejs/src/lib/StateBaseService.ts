/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { State } from './State'
import { getErrorMessage } from './utility'
import { StateWrapper, ActionKind, Subscriber } from './types'

export class StateBaseService<T> implements State<T> {
  [key: string]: any

  constructor(element: T) {
    Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      .filter((prop) => typeof this[prop] === 'function' && prop !== 'constructor')
      .forEach((method) => {
        this[method] = this[method].bind(this)
      })

    this.proxiedState = new Proxy<StateWrapper<T>>(
      { __STATE_WRAPPER__: element } as StateWrapper<T>,
      this.createProxyHandler()
    )
  }

  proxiedState: StateWrapper<T>
  isNeedToCheckProperties = false
  actionKind: ActionKind = 'none'
  activeSubscribers: Subscriber[] = []
  activeSubscriberIds: string[] = []
  isAccessToStateAllowed = false
  isUnwrapAllowed = false
  wasChanged = false

  // not allowed outside of the state.update() method
  mutableMethods = [
    // symbol
    'unscopables',
    // map, set and weakset
    'clear',
    'delete',
    'set',
    'add',
    // array
    'pop',
    'push',
    'shift',
    'unshift',
    'splice',
    // typed array
    'fill',
    'reverse',
    'sort',
  ]

  pathToChangedProperty: string[] = []

  addPathToChangedProperty(path: string): void {
    this.pathToChangedProperty.push(path)
  }

  getPathToChangedProperty(): string[] {
    return this.pathToChangedProperty
  }

  resetPathToChangedProperty(): void {
    this.pathToChangedProperty = []
  }

  setWasChangedToTrue(): void {
    this.wasChanged = true
  }

  setWasChangedToFalse(): void {
    this.wasChanged = false
  }

  getWasChanged(): boolean {
    return this.wasChanged
  }

  saveSlots(target: any, prop: any): any {
    return typeof target[prop] == 'function' ? target[prop].bind(target) : target[prop]
  }

  checkAccessKind(target: any, prop: any, path: string[]): any {
    if (typeof target[prop] === 'function') {
      return this.handleFunctionAccess(target, prop, path)
    } else if (this.isObject(target[prop]) && target[prop] !== null) {
      return this.handleObjectAccess(target, prop, path)
    } else {
      return this.saveSlots(target, prop)
    }
  }

  handleFunctionAccess(target: any, prop: any, path: string[]): any {
    if (this.mutableMethods.includes(prop)) {
      if (this.getIsAccessToStateAllowed()) {
        this.setWasChangedToTrue()
        const newPath = path.concat(prop)
        return new Proxy(this.saveSlots(target, prop), this.handler(this, newPath))
      } else {
        throw new Error("Access is denied. Use 'update' method to do this.")
      }
    } else {
      if (this.getIsUnwrapAllowed()) {
        return this.saveSlots(target, prop)
      }
      const newPath = path.concat(prop)
      return new Proxy(this.saveSlots(target, prop), this.handler(this, newPath))
    }
  }

  handleObjectAccess(target: any, prop: any, path: string[]): any {
    if (this.getIsUnwrapAllowed()) {
      return this.saveSlots(target, prop)
    }
    const newPath = path.concat(prop)
    return new Proxy(this.saveSlots(target, prop), this.handler(this, newPath))
  }

  handler(context: State<T>, path: string[]): ProxyHandler<StateWrapper<T>> {
    return {
      get(target: any, prop: any): any {
        return context.checkAccessKind(target, prop, path)
      },
      set(target: any, prop: any, val: any): boolean {
        if (context.getIsAccessToStateAllowed()) {
          if (target[prop] !== val) {
            context.setWasChangedToTrue()
            target[prop] = val

            if (context.isNeedToCheckProperties && context.actionKind === 'update') {
              const newPath = path.concat(prop).filter((i) => i !== '__STATE_WRAPPER__')
              const pathString = newPath.join('.')

              if (pathString.length) {
                context.addPathToChangedProperty(pathString)
              }
            }
          }

          return true
        } else {
          throw new Error('Access is denied.')
        }
      },
      defineProperty() {
        throw new Error('Access is denied.')
      },
      deleteProperty() {
        throw new Error('Access is denied.')
      },
    }
  }

  createProxyHandler(): ProxyHandler<StateWrapper<T>> {
    return this.handler(this, [])
  }

  addSubscriber(subscriber: Subscriber): void {
    this.activeSubscribers.push(subscriber)
  }

  generateId(exist: string[], length = 14): string {
    const id = Math.random().toString(36).substring(2, length)
    if (!exist.includes(id)) {
      return id
    }

    return this.generateId(exist)
  }

  generateSubscriberId(): string {
    const id = this.generateId(this.activeSubscriberIds)
    this.activeSubscriberIds.push(id)

    return id
  }

  isSubscriberActive(subscriberId: string): boolean {
    return this.activeSubscriberIds.includes(subscriberId)
  }

  unsubscribeById(subscriberId: string): void {
    if (this.isSubscriberActive(subscriberId)) {
      this.activeSubscribers = this.activeSubscribers.filter(
        (i) => i.subscriptionId != subscriberId
      )
      this.activeSubscriberIds = this.activeSubscriberIds.filter((i) => i != subscriberId)
    }
  }

  unsubscribeByIds(subscriberIds: string[]): void {
    this.activeSubscribers = this.activeSubscribers.filter(
      (i) => !subscriberIds.includes(i.subscriptionId)
    )
    this.activeSubscriberIds = this.activeSubscriberIds.filter((i) => !subscriberIds.includes(i))
  }

  allowAccessToState(): void {
    this.isAccessToStateAllowed = true
  }
  denyAccessToState(): void {
    this.isAccessToStateAllowed = false
  }

  getIsAccessToStateAllowed(): boolean {
    return this.isAccessToStateAllowed
  }

  allowUnwrap(): void {
    this.isUnwrapAllowed = true
  }

  denyUnwrap(): void {
    this.isUnwrapAllowed = false
  }

  getIsUnwrapAllowed(): boolean {
    return this.isUnwrapAllowed
  }

  runActiveSubscribersCb(): void {
    if (this.activeSubscribers.length > 0) {
      const inactiveSubscribersId: string[] = []

      this.activeSubscribers.forEach((s) => {
        try {
          if (s.condition === undefined || s.condition()) {
            s.subscriptionCallback()
          }
        } catch (error) {
          inactiveSubscribersId.push(s.subscriptionId)

          console.info(
            `One of you subscriber marked as inactive and was removed. Error message - ${getErrorMessage(
              error
            )}`
          )
        }
      })

      if (inactiveSubscribersId.length > 0) {
        this.unsubscribeByIds(inactiveSubscribersId)
      }
    }
  }

  getActiveSubscribersCount(): number {
    return this.activeSubscriberIds.length
  }

  unsubscribeAll(): void {
    this.activeSubscribers = this.activeSubscribers.filter((i) => i.isProtected)
    this.activeSubscriberIds = this.activeSubscribers.map((i) => i.subscriptionId)
  }

  isObject(entity: unknown): boolean {
    return typeof entity === 'object'
  }

  setAcionKindToSet(): void {
    this.actionKind = 'set'
  }

  setAcionKindToUpdate(): void {
    this.actionKind = 'update'
  }

  setAcionKindToNone(): void {
    this.actionKind = 'none'
  }

  isAnyPropertyPartOfAnyPath(properties: string[], paths: string[]): boolean {
    for (const property of properties) {
      for (const path of paths) {
        if (path.startsWith(property)) {
          return true
        }
      }
    }
    return false
  }
}
