import { ConsoleLogger, ExpressServer, HttpStatus } from '@shared/core'
import { config } from '../../../../config'

export const server = ExpressServer.create({
  config,
  corsEnabled: false,
  logger: new ConsoleLogger({
    appName: config.get('APP_NAME'),
  }),
  useHttps: Number(config.get('USE_HTTPS')) === 1,
})

const app = server.getApp()

app.get('/', (req, res) =>
  res.json({
    name: 'project-api',
    root: 'apps/services/project-api/src/module/infra/http/graphql/main.ts',
    config: config.getEnvironmentVariables(),
  })
)

app.get('*', (_, res) => {
  res.status(HttpStatus.NOT_FOUND).json({
    status: HttpStatus.NOT_FOUND,
    message: `The URL you're looking for doesn't exist or couldn't be found.`,
  })
})

type KebabCase<S extends string> = S extends `${infer T}${infer U}`
  ? `${T extends Uppercase<T> ? '-' : ''}${Lowercase<T>}${KebabCase<U>}`
  : ''

function convertToKebabCase<S extends string>(input: S): KebabCase<S> {
  return input
    .replace(/_/g, '-')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase() as KebabCase<S>
}

console.log(convertToKebabCase('APP_NAME'))

server.start()
