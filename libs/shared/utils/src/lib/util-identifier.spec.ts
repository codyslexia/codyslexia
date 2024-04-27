/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { identifier } from './util-identifier'

describe('identifier', () => {
  it('should return a prefixed random id', () => {
    expect(identifier('cus')).toContain('cus_')
  })
})
