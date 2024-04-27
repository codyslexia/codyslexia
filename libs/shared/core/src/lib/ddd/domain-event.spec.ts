import { DomainEvent, DomainEvents } from './domain-event'
import { UniqueEntityID } from './unique-entity-id'

describe('libs/common/ddd/domain-event', () => {
  it.skip('should dispatch events', () => {
    const event: DomainEvent = {
      dateTimeOccurred: new Date(),
      getAggregateId: () => new UniqueEntityID(),
    }
    const handler = jest.fn()
    DomainEvents.register(handler, event.constructor.name)
    DomainEvents.dispatchById(event.getAggregateId())
    expect(handler).toHaveBeenCalledWith(event)
  })
})
