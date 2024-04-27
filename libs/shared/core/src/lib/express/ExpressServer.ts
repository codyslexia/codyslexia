/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import http from 'http'
import https from 'https'
import express, { Application, IRouter } from 'express'

import { Logger } from '../logger'
import { ConfigStore } from '../interfaces'
import { HttpStatus, ShutdownSignal } from '../enums'
import { errorHandler, ConnectionManager, Middleware } from '../common'
import { CorsMiddleware, HPPMiddleware, HelmetMiddleware, MorganMiddleware } from '../middlewares'

/**
 * Returns a normalized timestamp string in ISO 8601 format with microseconds and Zulu time.
 * @example
 * ```ts
 * const timestamp = getTimestamp()
 * console.log(timestamp) // 2023-01-01T00:00:00.000000Z
 * ```
 * @returns
 */
const getTimestamp = () => {
  const currentDate = new Date()
  const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0')
  return `${currentDate.toISOString().slice(0, -1)}${milliseconds}Z`
}

export interface ExpressServerOptions {
  port?: number
  logger?: Logger
  config: ConfigStore
  useHttps?: boolean
  corsEnabled?: boolean
  statusEnabled?: boolean
  loggingEnabled?: boolean
  trustProxy?: boolean
  middlewares?: Middleware[]
  onInit?: () => Promise<void>
  onStart?: () => Promise<void>
  onReady?: () => Promise<void>
  onTerminate?: () => Promise<void>
}

/**
 * The ExpressServer class is a wrapper around the Express application.
 * It provides a convenient way to create and configure an Express application.
 */
export class ExpressServer {
  /**
   * Constructs an instance of the ExpressServer class.
   */
  private app: Application
  /**
   * The connection manager instance.
   */
  private manager: ConnectionManager
  /**
   * The HTTP or HTTPS server instance.
   */
  private server: http.Server | https.Server
  /**
   * The logger instance.
   */
  private logger: Logger
  /**
   * The config instance.
   */
  private config: ConfigStore

  /**
   * Constructs an instance of the ExpressServer class.
   * @param options The options to use for the server.
   */
  private constructor(private options?: ExpressServerOptions) {
    this.app = express()
    this.logger = options.logger ?? console
    this.config = options.config
    this.options.middlewares = options.middlewares ?? []
    this.options.corsEnabled = options.corsEnabled ?? true
    this.options.statusEnabled = options.statusEnabled ?? true
    this.options.loggingEnabled = options.loggingEnabled ?? true
    this.init()
  }

  public static create(options?: ExpressServerOptions) {
    return new ExpressServer(options)
  }

  private configProxy() {
    if (this.config.get('TRUST_PROXY') === '1' || this.options.trustProxy) {
      this.app.enable('trust proxy')
      this.app.set('trust proxy', 1)
      this.app.set('trust proxy', true)
    }
  }

  private init() {
    this.handleUncaughtException()

    this.app.disable('x-powered-by')

    this.configProxy()

    this.app.use(express.json({ limit: '10mb' }))
    this.app.use(express.text({ limit: '10mb' }))
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }))

    for (const middleware of this.options.middlewares) {
      this.app.use(middleware.getMiddleware())
    }

    this.app.use(new HelmetMiddleware().getMiddleware())

    if (this.options.corsEnabled) {
      this.app.use(new CorsMiddleware().getMiddleware())
    }

    this.app.use(new HPPMiddleware().getMiddleware())

    if (this.options.loggingEnabled) {
      this.app.use(new MorganMiddleware().getMiddleware())
    }

    this.configStatus()
  }

  public getApp(): Application {
    return this.app
  }

  public getRouter(): IRouter {
    let instance: IRouter
    if (instance) return instance
    else instance = express.Router()
    return instance
  }

  public start(): void {
    const env = this.config.get('NODE_ENV')
    const port = this.config.get('PORT')
    const hostname = this.config.get('HOST')
    const protocol = this.options.useHttps ? 'https' : 'http'
    const server = this.options.useHttps ? this.createHttpsServer() : this.createHttpServer()

    this.server = server
    this.manager = new ConnectionManager(this.server, this.logger)

    server.listen(port, async () => {
      if (this.options.onReady) {
        try {
          await this.options.onReady()
        } catch (error) {
          this.logger.debug(error.stack)
        }
      }

      this.logger.log(`Running in ${env} mode on ${protocol}://${hostname}:${port}`)

      Object.values(ShutdownSignal).forEach((signal) => {
        process.on(signal, () => {
          this.manager.terminate(() => {
            this.logger.log(`${signal} Server is shutting down`)
            process.exit(0)
          })
        })
      })
    })

    this.app.use(async (error, req, res, next) => {
      if (errorHandler.isTrustedError(error)) {
        next(error)
      }
      await errorHandler.handle(error)
    })

    this.handleUnhandledRejection()
  }

  public stop() {
    this.manager.terminate(() => {
      this.logger.log(`See you soon! 👋`)
    })
  }

  private configStatus() {
    if (!this.options.statusEnabled) return
    this.app.use('/status', (req, res) => {
      return res.status(HttpStatus.OK).json({
        app: this.config.get('APP_NAME'),
        version: '1.0.0',
        timestamp: getTimestamp(),
      })
    })
  }

  private createHttpServer(options?: http.ServerOptions): http.Server {
    return http.createServer(options, this.app)
  }

  private createHttpsServer(options?: https.ServerOptions): https.Server {
    const key = this.config.get('TLS_KEY')
    const cert = this.config.get('TLS_CERT')
    return https.createServer({ key, cert, ...options }, this.app)
  }

  private handleUncaughtException() {
    process.on('uncaughtException', (error: Error) => {
      errorHandler.handle(error)

      if (process.env.NODE_ENV !== 'production') {
        this.logger.debug('Uncaught Exception: Server is shutting down')
        this.logger.debug(error.stack)
      }

      if (!errorHandler.isTrustedError(error)) {
        this.manager.terminate(() => {
          this.logger.error('Uncaught Exception: Server is shutting down')
          this.logger.debug(error.stack)
          process.exit(1)
        })
      }
    })
  }

  private handleUnhandledRejection() {
    process.on('unhandledRejection', (reason) => {
      if (process.env.NODE_ENV !== 'production') {
        this.logger.debug('Unhandled Rejection: Server is shutting down')
      }

      if (this.options.onTerminate) {
        this.options.onTerminate()
      }

      if (!errorHandler.isTrustedError(reason)) {
        this.logger.error('Unhandled Rejection: Server is shutting down')
        this.manager.terminate(() => {
          this.server.close(() => {
            this.logger.debug('Exiting process. See you soon! 👋')
            process.exit(0)
          })
        })
      }
    })
  }
}
