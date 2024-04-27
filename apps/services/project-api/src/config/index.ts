import { InMemoryConfigStore, TLSConfigLoader, DotenvConfigLoader } from '@shared/core'

export const config = new InMemoryConfigStore([
  new DotenvConfigLoader('apps/services/project-api/.env'),

  new TLSConfigLoader({
    keyFilePath: 'apps/services/project-api/src/config/ssl/server.key',
    certFilePath: 'apps/services/project-api/src/config/ssl/server.crt',
  }),
])
