/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path'
import { YamlConfigLoader } from './YamlConfigLoader'

const CONFIG_PATH = path.resolve(__dirname, '../loaders/__mocks__/config.yaml')

describe('YamlConfigLoader', () => {
  it('should load config from yaml file', async () => {
    const config = await new YamlConfigLoader(CONFIG_PATH).load()

    expect(config).toEqual({
      env: 'test-yaml',
      port: 9999,
      name: 'gzipr',
    })
  })
})
