/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ConfigStore, ConfigLoader } from '../interfaces'

/**
 * Union of default {@link InMemoryConfigStore} keys.
 */
type InMemoryConfigStoreKey =
  | 'NAME'
  | 'HOST'
  | 'PORT'
  | 'NODE_ENV'
  | 'TLS_KEY'
  | 'TLS_CERT'
  | 'USE_HTTPS'
  | 'TRUST_PROXY'
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {})

type ConfigMap = Record<PropertyKey, string>

/**
 * Allows to load application config from different sources.
 * @param loaders - Array of {@link ConfigLoader} instances.
 */
export class InMemoryConfigStore implements ConfigStore {
  private configuration: ConfigMap = {}
  private environment: 'development' | 'production' | 'test' = 'development'

  constructor(loaders: ConfigLoader[]) {
    this.configuration = loaders.reduce((acc, loader) => ({ ...acc, ...loader.load() }), {})
  }

  public async load(loaders: ConfigLoader[]) {
    const configuration: ConfigMap = {}
    const promises = loaders.map((loader) => loader.load())
    const configs = await Promise.all(promises)
    configs.forEach((c) => Object.assign(configuration, c))
    this.configuration = { ...this.configuration, ...configuration }
  }

  public get<K extends InMemoryConfigStoreKey>(key: K): string | undefined {
    return this.configuration[key] ?? process.env[key] ?? undefined
  }

  public set<K extends InMemoryConfigStoreKey>(key: K, value: string): void {
    this.configuration[key] = value
  }

  public getEnvironmentVariables(): ConfigMap {
    return Object.freeze(this.configuration)
  }

  public isProduction(): boolean {
    return this.environment === 'production'
  }
}
