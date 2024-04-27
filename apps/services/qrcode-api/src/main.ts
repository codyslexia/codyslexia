import {
  ConsoleLogger,
  DotenvConfigLoader,
  ExpressServer,
  HttpStatus,
  InMemoryConfigStore,
} from '@shared/core'

const config = new InMemoryConfigStore([new DotenvConfigLoader('apps/services/qrcode-api/.env')])

const server = ExpressServer.create({
  config,
  corsEnabled: false,
  logger: new ConsoleLogger({ appName: config.get('APP_NAME') }),
  useHttps: Number(config.get('USE_HTTPS')) === 1,
})

const app = server.getApp()

app.get('/qrcode', async (req, res) => {
  try {
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error(error)
    res.status(501).json({ success: false, error })
  }
})

app.get('*', (_, res) => {
  res.status(HttpStatus.NOT_FOUND).json({
    status: HttpStatus.NOT_FOUND,
    message: `The endpoint you're looking for doesn't exist or couldn't be found.`,
  })
})

server.start()
