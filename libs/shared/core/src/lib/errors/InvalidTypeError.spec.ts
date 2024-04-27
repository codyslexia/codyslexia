import { AppError } from './AppError'
import { InvalidTypeError } from './InvalidTypeError'

describe('@framework/core - InvalidTypeError', () => {
  it('should be an instance of Error', () => {
    const error = new InvalidTypeError('createUser', 'param', 'string', 123)
    expect(error instanceof Error).toBe(true)
  })

  it('should be an instance of AppError', () => {
    const error = new InvalidTypeError('createUser', 'param', 'string', 123)
    expect(error instanceof AppError).toBe(true)
  })

  it('should be an instance of InvalidTypeError', () => {
    const error = new InvalidTypeError('createUser', 'param', 'string', 123)
    expect(error instanceof InvalidTypeError).toBe(true)
  })

  it('should create a type error with the correct message', () => {
    const name = 'createUser'
    const parameter = 'name'
    const expected = 'string'
    const given = 123
    const error = new InvalidTypeError(name, parameter, expected, given)

    expect(error.message).toBe(
      `The function or method '${name}' expected '${parameter}' to be of type '${expected}', but got '${given}'.`
    )
    expect(error.name).toBe('InvalidTypeError')
  })

  it('should throw an error when condition is false', () => {
    const name = 'createUser'
    const parameter = 'name'
    const expected = 'string'
    const given = 123

    expect(() => {
      InvalidTypeError.assert(false, name, parameter, expected, given)
    }).toThrowError(InvalidTypeError)
  })

  it('should not throw an error when condition is true', () => {
    const name = 'createUser'
    const parameter = 'name'
    const expected = 'string'
    const given = 123

    expect(() => {
      InvalidTypeError.assert(true, name, parameter, expected, given)
    }).not.toThrowError()
  })
})
