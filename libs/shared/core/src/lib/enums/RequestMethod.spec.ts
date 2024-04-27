import { RequestMethods } from './RequestMethod'

describe('@shared/core - RequestMethod', () => {
  it('should have the correct request method', () => {
    const method = RequestMethods.GET
    expect(method).toBe('get')
  })
})
