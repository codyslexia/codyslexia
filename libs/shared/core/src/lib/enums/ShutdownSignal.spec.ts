import { ShutdownSignal } from './ShutdownSignal'

describe('@shared/core - ShutdownSignal', () => {
  it('should have the correct shutdown signal', () => {
    const signal = ShutdownSignal.SIGINT
    expect(signal).toBe('SIGINT')
  })
})
