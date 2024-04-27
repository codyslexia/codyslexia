/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { EnvConfigLoader } from './EnvConfigLoader'

describe('EnvConfigLoader', () => {
  it('should load config from environment variables', () => {
    const loader = new EnvConfigLoader()
    const config = loader.load()
    expect(config).toEqual(process.env)
    expect(config.NODE_ENV).toEqual('test')
  })
})
