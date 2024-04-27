/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { LogLevel, isLogLevelEnabled } from './Logger'

describe('isLogLevelEnabled', () => {
  it('should return false if no logLevels provided', () => {
    expect(isLogLevelEnabled('log', undefined)).toBe(false)
    expect(isLogLevelEnabled('log', [])).toBe(false)
  })

  it('should return true if the targetLevel is included in the logLevels', () => {
    const logLevels: LogLevel[] = ['log', 'error']
    expect(isLogLevelEnabled('log', logLevels)).toBe(true)
  })

  it('should return false if the targetLevel is not included in the logLevels', () => {
    const logLevels: LogLevel[] = ['warn', 'error']
    expect(isLogLevelEnabled('log', logLevels)).toBe(false)
  })

  it('should return true if the targetLevel value is greater than or equal to the highest log level value', () => {
    const logLevels: LogLevel[] = ['log', 'debug']
    expect(isLogLevelEnabled('error', logLevels)).toBe(true)
  })

  it('should return false if the targetLevel value is less than the highest log level value', () => {
    const logLevels: LogLevel[] = ['log', 'debug']
    expect(isLogLevelEnabled('verbose', logLevels)).toBe(false)
  })
})
