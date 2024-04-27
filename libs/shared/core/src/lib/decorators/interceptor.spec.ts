/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { interceptor } from './interceptor'

describe('interceptor', () => {
  it('should call the before function before the original method', async () => {
    const beforeFn = jest.fn()

    class Example {
      @interceptor({ before: beforeFn })
      public static test() {
        return 'test'
      }
    }

    Example.test()

    expect(beforeFn).toHaveBeenCalled()
  })

  it('should call the after function after the original method', async () => {
    const consoleSpy = jest.spyOn(console, 'log')

    class Example {
      @interceptor({
        after: (args) => console.log(args),
      })
      public static async test(args = 'DEFAULT') {
        console.log(args)
        return 'test'
      }
    }

    await Example.test()

    expect(consoleSpy).toHaveBeenCalledTimes(2)
    expect(consoleSpy).toHaveBeenCalledWith('DEFAULT')
  })

  it('should call the error function when the original method throws an error', async () => {
    const errorFn = jest.fn()
    const originalMethod = jest.fn(() => {
      throw new Error('Test Error')
    })

    class Example {
      @interceptor({ error: errorFn })
      public static test() {
        originalMethod()
      }
    }

    try {
      Example.test()
    } catch (error) {
      //
    }

    expect(originalMethod).toHaveBeenCalled()
    expect(errorFn).toHaveBeenCalledWith(expect.any(Error))
  })

  it('should NOT throw error when `shouldThrow` is false', async () => {
    class Example {
      @interceptor({ shouldThrow: false })
      public static test() {
        throw new Error('Test Error')
      }
    }

    expect(() => Example.test()).not.toThrow()
  })
})
