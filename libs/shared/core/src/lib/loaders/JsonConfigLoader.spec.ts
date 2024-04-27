/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path'
import { JsonConfigLoader } from './JsonConfigLoader'

const CONFIG_PATH = path.resolve(__dirname, '../loaders/__mocks__/config.json')

describe('JsonConfigLoader', () => {
  it('should load config from json file', () => {
    const config = new JsonConfigLoader(CONFIG_PATH).load()

    expect(config).toEqual({
      env: 'test-json',
      port: 9999,
      name: 'gzipr',
    })
  })
})
