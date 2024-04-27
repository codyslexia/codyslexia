/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { resolve } from 'path'
import { readFileSync } from 'fs'
import { ConfigLoader } from '../interfaces'

/**
 * Options for {@link TLSConfigLoader}.
 */
export type TLSConfigLoaderOptions = {
  keyFilePath: string
  certFilePath: string
}

/**
 * Loads certificate and key from file system.
 */
export class TLSConfigLoader implements ConfigLoader {
  private readonly certPath: string
  private readonly keyPath: string

  constructor(o: TLSConfigLoaderOptions) {
    this.keyPath = resolve(process.cwd(), o.keyFilePath)
    this.certPath = resolve(process.cwd(), o.certFilePath)
  }

  private shouldLoadFromFile() {
    return !process.env.TLS_KEY || !process.env.TLS_CERT
  }

  public load() {
    if (this.shouldLoadFromFile()) {
      const key = readFileSync(this.keyPath)
      const cert = readFileSync(this.certPath)

      return {
        TLS_KEY: key.toString(),
        TLS_CERT: cert.toString(),
      }
    }

    return {
      TLS_KEY: process.env.TLS_KEY,
      TLS_CERT: process.env.TLS_CERT,
    }
  }
}
