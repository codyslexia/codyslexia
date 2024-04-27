/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { UniqueEntityID } from './unique-entity-id'
import type { AggregateRoot } from './aggregate-root'

type RegisterCallback = (event: DomainEvent) => void

export interface DomainEvent {
  dateTimeOccurred: Date
  getAggregateId(): UniqueEntityID
}

export interface Handle<DomainEvent> {
  setupSubscriptions(): void
}

export class DomainEvents {
  private static handlersMap = {}
  private static aggregates: AggregateRoot<any>[] = []

  private static findById(id: UniqueEntityID): AggregateRoot<any> | null {
    let found = null
    for (const aggregate of this.aggregates) {
      if (aggregate.id.equals(id)) found = aggregate
    }
    return found
  }

  private static remove(aggregate: AggregateRoot<any>): void {
    const index = this.aggregates.findIndex((a) => a.equals(aggregate))
    this.aggregates.splice(index, 1)
  }

  private static dispatch(event: DomainEvent): void {
    const name = event.constructor.name
    if (this.handlersMap.hasOwnProperty(name)) {
      const handlers = this.handlersMap as any
      for (const handle of handlers[name]) handle(event)
    }
  }

  private static dispatchEvents(aggregate: AggregateRoot<any>): void {
    aggregate.events.map(this.dispatch)
  }

  public static register(callback: RegisterCallback, name: string): void {
    const handlers = this.handlersMap as any
    if (!this.handlersMap.hasOwnProperty(name)) handlers[name] = []
    handlers[name].push(callback)
  }

  public static add(aggregate: AggregateRoot<any>): void {
    const exists = !!this.findById(aggregate.id)
    if (!exists) this.aggregates.push(aggregate)
  }

  public static dispatchById(id: UniqueEntityID): void {
    const aggregate = this.findById(id)

    if (aggregate) {
      this.dispatchEvents(aggregate)
      aggregate.clearEvents()
      this.remove(aggregate)
    }
  }
}
