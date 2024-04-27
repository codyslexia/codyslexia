/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { InMemoryConfigStore } from './InMemoryConfigStore'

describe('@shared/core - InMemoryConfigStore', () => {
  it('should load configuration from synchronous loaders', () => {
    const config = new InMemoryConfigStore([
      {
        load: () => ({ NODE_ENV: 'test' }),
      },
    ])
    expect(config.get('NODE_ENV')).toEqual('test')
  })

  it('should load configiguration from asynchronous loaders', async () => {
    const config = new InMemoryConfigStore([
      {
        load: () => ({ NODE_ENV: 'test' }),
      },
    ])

    await config.load([
      {
        load: () => Promise.resolve({ PORT: '3000' }),
      },
    ])

    expect(config.get('NODE_ENV')).toEqual('test')
    expect(config.get('PORT')).toEqual('3000')
  })

  it('should return undefined for unknown key', () => {
    const config = new InMemoryConfigStore([])
    expect(config.get('UNKNOWN_KEY')).toBeUndefined()
  })
})
