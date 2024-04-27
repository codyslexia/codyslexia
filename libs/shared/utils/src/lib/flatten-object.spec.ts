/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { flattenObject } from './flatten-object'

const nested = {
  logging: {
    level: 'debug',
    format: 'json',
    enabled: true,
  },
}

describe('@shared/utils - flattenObject', () => {
  it('should flatten an object into a single level object with dot notation keys by default.', () => {
    const flatten = flattenObject(nested)
    expect(flatten).toEqual({
      'logging.level': 'debug',
      'logging.format': 'json',
      'logging.enabled': true,
    })
  })

  it('should flatten an object into a single level object with prefixed keys.', () => {
    const flatten = flattenObject(nested, 'prefix')
    expect(flatten).toEqual({
      'prefix.logging.level': 'debug',
      'prefix.logging.format': 'json',
      'prefix.logging.enabled': true,
    })
  })

  it('should flatten an object into a single level object with custom separators.', () => {
    const flatten = flattenObject(nested, '', '_')
    expect(flatten).toEqual({
      logging_level: 'debug',
      logging_format: 'json',
      logging_enabled: true,
    })
  })

  it('should flatten an object into a single level object with prefixed keys and custom separator.', () => {
    const flatten = flattenObject(nested, 'prefix', '_')
    expect(flatten).toEqual({
      prefix_logging_level: 'debug',
      prefix_logging_format: 'json',
      prefix_logging_enabled: true,
    })
  })
})
