/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { TLSConfigLoader } from './TLSConfigLoader'

describe('TLSConfigLoader', () => {
  it('should load config from file system', () => {
    const loader = new TLSConfigLoader({
      keyFilePath: 'tmp/.nexa/server.key',
      certFilePath: 'tmp/.nexa/server.crt',
    })

    const config = loader.load()

    expect(config).toEqual({
      TLS_KEY: expect.any(String),
      TLS_CERT: expect.any(String),
    })
  })

  it('should load config from environment variables', () => {
    process.env.TLS_KEY = 'key'
    process.env.TLS_CERT = 'cert'

    const loader = new TLSConfigLoader({
      keyFilePath: 'tmp/.nexa/server.key',
      certFilePath: 'tmp/.nexa/server.crt',
    })

    const config = loader.load()

    expect(config).toEqual({
      TLS_KEY: 'key',
      TLS_CERT: 'cert',
    })
  })
})
