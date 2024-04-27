/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EventEmitter } from 'events'
import { NodeEventBus } from './NodeEventBus'

describe('NodeEventBus', () => {
  let eventEmitter: EventEmitter
  let eventBus: NodeEventBus

  beforeEach(() => {
    eventEmitter = new EventEmitter()
    eventBus = new NodeEventBus(eventEmitter)
  })

  describe('publish', () => {
    it('should publish events', async () => {
      const listener = jest.fn()
      await eventBus.subscribe('topic', listener)
      await eventBus.publish('topic', 'data')
      expect(listener).toBeCalledWith('data')
    })
  })

  describe('subscribe', () => {
    it('should subscribe to events', async () => {
      const listener = jest.fn()
      await eventBus.subscribe('topic', listener)
      eventEmitter.emit('topic', 'data')
      expect(listener).toBeCalledWith('data')
    })
  })
})
