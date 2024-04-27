import { AppError } from './AppError'
import { UnexpectedError } from './UnexpectedError'
import { HttpStatus } from '../enums'

describe('UnexpectedError', () => {
  it('should create a new instance of UnexpectedError', () => {
    const unexpectedError = new UnexpectedError()
    expect(unexpectedError).toBeInstanceOf(UnexpectedError)
    expect(unexpectedError).toBeInstanceOf(AppError)
    expect(unexpectedError).toBeInstanceOf(Error)
  })

  it('should set the status property correctly', () => {
    const unexpectedError = new UnexpectedError()
    expect(unexpectedError.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR)
  })

  it('should set the statusText property correctly', () => {
    const unexpectedError = new UnexpectedError()
    expect(unexpectedError.statusText).toBe('Unexpected Error')
  })

  it('should set the isOperational property to false', () => {
    const unexpectedError = new UnexpectedError()
    expect(unexpectedError.isOperational).toBe(false)
  })

  it('should set the message property correctly', () => {
    const unexpectedError = new UnexpectedError()
    expect(unexpectedError.message).toBe('Unexpected Error')
  })

  it('should serialize the error correctly', () => {
    const unexpectedError = new UnexpectedError()
    const serialized = unexpectedError.serialize()
    expect(serialized).toEqual([
      { status: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Unexpected Error' },
    ])
  })
})
