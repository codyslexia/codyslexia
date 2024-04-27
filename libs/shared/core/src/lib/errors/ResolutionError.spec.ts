import { AppError } from './AppError'
import { ResolutionError } from './ResolutionError'

describe('@framework/core - ResolutionError', () => {
  it('should create an error with the correct name', () => {
    const error = new ResolutionError('testModule', ['moduleA', 'moduleB'])
    expect(error.name).toBe('ResolutionError')
  })

  it('should create a resolution error with the correct message', () => {
    const name = 'testModule'
    const resolutionStack = ['moduleA', 'moduleB']
    const error = new ResolutionError(name, resolutionStack)
    expect(error.message).toContain(`Could not resolve '${name}'.`)
    expect(error.message).toContain(`Resolution path: moduleA -> moduleB -> ${name}`)
  })

  it('should create a resolution error with additional message', () => {
    const name = 'testModule'
    const resolutionStack = ['moduleA', 'moduleB']
    const message = 'Additional message'
    const error = new ResolutionError(name, resolutionStack, message)
    expect(error.message).toContain(message)
  })

  it('should be an instance of Error', () => {
    const error = new ResolutionError('testModule', ['moduleA', 'moduleB'])
    expect(error instanceof Error).toBe(true)
  })

  it('should be an instance of AppError', () => {
    const error = new ResolutionError('testModule', ['moduleA', 'moduleB'])
    expect(error instanceof AppError).toBe(true)
  })

  it('should be an instance of ResolutionError', () => {
    const error = new ResolutionError('testModule', ['moduleA', 'moduleB'])
    expect(error instanceof ResolutionError).toBe(true)
  })
})
