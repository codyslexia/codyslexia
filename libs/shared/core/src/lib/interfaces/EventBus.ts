/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Event bus interface.
 *
 * @example
 * import { EventBus } from '@framework/core'
 * import { NatsBroker } from '@infra/nats'
 *
 * class NatsEventBus implements EventBus {
 *  constructor(protected readonly broker: NatsBroker) {}
 * }
 */
export interface EventBus {
  publish<T>(topic: string, data: T): Promise<void>
  subscribe<T>(topic: string, handler: (data: T) => void): Promise<void>
}
