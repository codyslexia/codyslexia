/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  ConsoleLogger,
  DotenvConfigLoader,
  ExpressServer,
  HttpStatus,
  InMemoryConfigStore,
} from '@shared/core'

import { UserRepo } from '../../../services/authenticator'
import { TOTPService } from '../../../services/totp-service'

/**
 * Totp Service instance
 */
const totpService = new TOTPService()

const getTimestamp = () => {
  const currentDate = new Date()
  const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0')
  return `${currentDate.toISOString().slice(0, -1)}${milliseconds}Z`
}

export const config = new InMemoryConfigStore([
  new DotenvConfigLoader('apps/services/totp-api/.env'),
])

export const server = ExpressServer.create({
  config,
  trustProxy: true,
  corsEnabled: false,
  logger: new ConsoleLogger({
    appName: config.get('APP_NAME') ?? 'totp-api',
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

/**
 * Generate a new TOTP secret.
 */
app.get('/generate', async (req, res) => {
  try {
    const user = await totpService.generate()
    UserRepo.add(user)
    return res.status(200).json([user])
  } catch (error) {
    console.error(error)
    res.status(501).json({ success: false, error })
  }
})

app.post('/check', async (req, res) => {
  try {
    const { id, token } = req.body
    const result = await totpService.check(id, token)
    return res.status(200).json(result)
  } catch (error) {
    res.status(501).json({ success: false, error })
  }
})

app.post('/verify', async (req, res) => {
  try {
    const { id, token } = req.body
    const result = await totpService.verify(id, token)
    return res.status(200).json(result)
  } catch (error) {
    res.status(501).json({ success: false, error })
  }
})

app.post('/refresh', async (req, res) => {
  try {
    const { id } = req.body
    const result = await totpService.refresh(id)
    return res.status(200).json(result)
  } catch (error) {
    res.status(501).json({ success: false, error })
  }
})

app.post('/recover', async (req, res) => {
  try {
    const { id, token } = req.body
    const result = await totpService.recover(id, token)
    return res.status(200).json(result)
  } catch (error) {
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
