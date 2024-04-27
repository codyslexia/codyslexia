/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import { ActionKind, Subscriber, StateWrapper } from './types'

export interface State<T> {
  isNeedToCheckProperties: boolean
  actionKind: ActionKind
  activeSubscribers: Subscriber[]
  activeSubscriberIds: string[]
  isAccessToStateAllowed: boolean
  isUnwrapAllowed: boolean
  wasChanged: boolean
  mutableMethods: string[]
  pathToChangedProperty: string[]
  proxiedState: StateWrapper<T>

  setWasChangedToTrue(): void
  setWasChangedToFalse(): void
  getWasChanged(): boolean

  saveSlots(target: any, prop: any): any

  handler(context: State<T>, path: string[]): ProxyHandler<StateWrapper<T>>
  createProxyHandler(): ProxyHandler<StateWrapper<T>>

  addSubscriber(subscriber: Subscriber): void
  isSubscriberActive(subscriberId: string): boolean
  unsubscribeById(subscriberId: string): void
  unsubscribeByIds(subscriberIds: string[]): void
  runActiveSubscribersCb(): void
  getActiveSubscribersCount(): number
  unsubscribeAll(): void

  generateId(exist: string[], length: number): string
  generateSubscriberId(): string

  allowAccessToState(): void
  checkAccessKind(target: any, prop: any, path: string[]): any
  denyAccessToState(): void
  getIsAccessToStateAllowed(): boolean

  allowUnwrap(): void
  denyUnwrap(): void
  getIsUnwrapAllowed(): boolean

  addPathToChangedProperty(path: string): void
  getPathToChangedProperty(): string[]
  resetPathToChangedProperty(): void

  setAcionKindToSet(): void
  setAcionKindToUpdate(): void
  setAcionKindToNone(): void

  isAnyPropertyPartOfAnyPath(properties: string[], paths: string[]): boolean
  isObject(entity: unknown): boolean
}
