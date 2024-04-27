/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import path from 'path'
import { DotenvConfigLoader } from './DotenvConfigLoader'

const CONFIG_PATH = path.resolve(__dirname, '../loaders/__mocks__/.env')

describe('DotenvConfigLoader', () => {
  it('should load config from .env file', () => {
    const config = new DotenvConfigLoader(CONFIG_PATH).load()

    expect(config).toEqual({
      HOST: 'localhost',
      NODE_ENV: 'development',
      PORT: '3000',
      USE_HTTPS: '0',
    })
  })
})
