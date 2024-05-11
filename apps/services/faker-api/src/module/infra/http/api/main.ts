/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Faker, en } from '@faker-js/faker'
import { generateMockData } from '../../../../module/generate-mock-data'

import { ExpressServer, DotenvConfigLoader, InMemoryConfigStore, ConsoleLogger } from '@shared/core'

const getTimestamp = () => {
  const currentDate = new Date()
  const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0')
  return `${currentDate.toISOString().slice(0, -1)}${milliseconds}Z`
}

export const config = new InMemoryConfigStore([
  new DotenvConfigLoader('apps/services/faker-api/.env'),
])

const logger = new ConsoleLogger({
  appName: config.get('APP_NAME') ?? 'faker-api',
  logLevels: ['log', 'error', 'warn'],
})

export const server = ExpressServer.create({
  config,
  logger,
  useHttps: Number(config.get('USE_HTTPS')) === 1,
  trustProxy: true,
  corsEnabled: false,
})

const app = server.getApp()

const faker = new Faker({ locale: en })

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const data = Array.from({ length: 10 }, () => ({
  name: faker.person.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.number(),
}))

app
  .get('/', (req, res) => {
    try {
      const EXAMPLE = {
        count: 3,
        schema: {
          name: 'person.firstName',
          email: 'internet.email',
          phone: 'phone.number',
        },
      }

      res.json({
        app: config.get('APP_NAME'),
        version: '1.0.0',
        timestamp: getTimestamp(),
        description: 'Dynamically generate mock data using Faker.js',
        example: {
          method: 'POST',
          endpoint: '/faker',
          body: EXAMPLE,
          results: generateMockData(EXAMPLE),
        },
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: error.message })
    }
  })
  .post('/faker', (req, res) => {
    const { schema, count = 1, locale = 'en' } = req.body
    res.json(generateMockData({ schema, count, locale }))
  })

server.start()
