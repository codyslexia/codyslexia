import {
  ConsoleLogger,
  DotenvConfigLoader,
  ExpressServer,
  HttpStatus,
  InMemoryConfigStore,
} from '@shared/core'

const getTimestamp = () => {
  const currentDate = new Date()
  const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0')
  return `${currentDate.toISOString().slice(0, -1)}${milliseconds}Z`
}

export const config = new InMemoryConfigStore([
  new DotenvConfigLoader('apps/services/webauthn-api/.env'),
])

export const server = ExpressServer.create({
  config,
  trustProxy: true,
  corsEnabled: false,
  port: 3004,
  logger: new ConsoleLogger({
    appName: config.get('APP_NAME') ?? 'webauthn-api',
  }),
  useHttps: Number(config.get('USE_HTTPS')) === 1,
})

const app = server.getApp()

app.get('/', (req, res) => {
  res.json({
    app: config.get('APP_NAME'),
    version: '1.0.0',
    timestamp: getTimestamp(),
  })
})

app.get('*', (_, res) => {
  res.status(HttpStatus.NOT_FOUND).json({
    status: HttpStatus.NOT_FOUND,
    message: `The endpoint you're looking for doesn't exist or couldn't be found.`,
  })
})

server.start()
