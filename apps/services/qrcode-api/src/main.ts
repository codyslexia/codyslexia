import * as qrcode from 'qrcode'

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

const config = new InMemoryConfigStore([new DotenvConfigLoader('apps/services/qrcode-api/.env')])

const logger = new ConsoleLogger({
  appName: config.get('APP_NAME') ?? 'qrcode-api',
  logLevels: ['log', 'warn', 'error'],
})

const server = ExpressServer.create({
  config,
  logger,
  useHttps: Number(config.get('USE_HTTPS')) === 1,
  trustProxy: true,
  corsEnabled: false,
})

const app = server.getApp()

app.get('/generate/:hostname?', async (req, res) => {
  try {
    const url = `https://${req.params?.hostname ?? 'www.codyslexia.com'}`
    const qrCodeDataUrl = await qrcode.toDataURL(url)
    return res.send(`<img src="${qrCodeDataUrl}" alt="QR Code"/>`)
  } catch (error) {
    console.error(error)
    res.status(501).json({ success: false, error })
  }
})

app.get('/', async (req, res) => {
  try {
    const example = await qrcode.toDataURL('https://www.codyslexia.com')
    return res.status(200).json({
      app: config.get('APP_NAME'),
      version: '1.0.0',
      timestamp: getTimestamp(),
      description: 'Dynamically generate QRCodes using qrcode.js',
      example: {
        method: 'GET',
        path: '/url/https://www.codyslexia.com',
        response: {
          success: true,
          body: {
            dataUrl: example,
          },
        },
      },
    })
  } catch (error) {
    console.error(error)
    res.status(501).json({ success: false, error })
  }
})

app.get('*', (_, res) => {
  res.status(HttpStatus.NOT_FOUND).json({
    app: config.get('APP_NAME'),
    status: HttpStatus.NOT_FOUND,
    message: `The endpoint you're looking for doesn't exist or couldn't be found.`,
  })
})

server.start()
