/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EventBus } from '../interfaces/EventBus'

/**
 * Event bus implementation for Node.js.
 *
 * @example
 * import { NodeEventBus } from '@framework/core'
 * const eventBus = new NodeEventBus(EventEmitter)
 * eventBus.publish('topic', 'data')
 */
export class NodeEventBus implements EventBus {
  constructor(private readonly broker: NodeJS.EventEmitter) {
    this.broker = broker
  }

  publish<T>(topic: string, data: T): Promise<void> {
    return new Promise<void>((resolve) => {
      this.broker.emit(topic, data)
      resolve()
    })
  }

  subscribe<T>(topic: string, handler: (data: T) => void): Promise<void> {
    return new Promise<void>((resolve) => {
      const eventListener = (data: T) => {
        handler(data)
      }

      this.broker.on(topic, eventListener)
      resolve()
    })
  }
}
