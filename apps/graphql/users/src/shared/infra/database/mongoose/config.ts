import * as mongoose from 'mongoose'

import { ServiceUnavailable } from '@shared/core'

import { config } from '../../../../config/env'

export async function log(message: string, level = 'info') {
  console.log(
    JSON.stringify({
      runner: 'graphql-users',
      level,
      message,
      timestamp: new Date().toISOString(),
    })
  )
}

/**
 * Connect to the database
 * @returns {Promise<void>}
 * @throws {ServiceUnavailable}
 */
export async function connect(): Promise<void> {
  try {
    await mongoose
      .connect(config.database.uri, {
        dbName: config.database.name,
        pass: config.database.password,
        user: config.database.user,
      })
      .then(() => {
        log(`Connected to '${config.database.name}' database`)
      })
  } catch (error) {
    log(`Error connecting to '${config.database.name}' database`, 'error')
    throw new ServiceUnavailable('Error connecting to database')
  }
}

/**
 * Disconnect from the database
 * @returns {Promise<void>}
 * @throws {ServiceUnavailable}
 */
export async function disconnect(): Promise<void> {
  try {
    await mongoose.disconnect()
  } catch (error) {
    log(`Error disconnecting from '${config.database.name}' database.`)
    throw new ServiceUnavailable('Error disconnecting from database')
  }
}
