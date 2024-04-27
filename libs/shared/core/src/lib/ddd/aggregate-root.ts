import { Entity } from './entity'
import { DomainEvent, DomainEvents } from './domain-event'

export abstract class AggregateRoot<T> extends Entity<T> {
  private _events: DomainEvent[] = []

  get events(): DomainEvent[] {
    return this._events
  }

  protected addEvent(event: DomainEvent): void {
    this._events.push(event)
    DomainEvents.add(this)
    this.log(event)
  }

  public clearEvents(): void {
    this._events.splice(0, this._events.length)
  }

  private log(event: DomainEvent): void {
    const self = Reflect.getPrototypeOf(this)
    const instance = Reflect.getPrototypeOf(event)
    const info = `[DomainEvent]: Event Created ${self?.constructor.name} ==> ${instance?.constructor.name}`
    console.info(info)
  }
}
