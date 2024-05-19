import { AggregateRoot } from './aggregate-root'
import { DomainEvent } from './domain-event'
import { UniqueEntityID } from './unique-entity-id'

describe('AggregateRoot', () => {
  let project: AggregateRoot<any>
  class Project extends AggregateRoot<any> {}
  const id = new UniqueEntityID()

  beforeEach(() => {
    project = new Project({})
  })

  it('should add events correctly', () => {
    const event = { dateTimeOccurred: new Date(), getAggregateId: () => id } as DomainEvent
    project.addEvent(event)
    expect(project.events).toContain(event)
  })

  it('should clear events correctly', () => {
    const event = {} as DomainEvent
    project.addEvent(event)
    project.clearEvents()
    expect(project.events).toHaveLength(0)
  })

  it('should log events correctly', () => {
    const event = { dateTimeOccurred: new Date(), getAggregateId: () => id } as DomainEvent
    const spy = jest.spyOn(console, 'info')
    project.addEvent(event)
    expect(spy).toHaveBeenCalled()
  })
})
