/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Logger } from '../logger'
import { Context } from './Context'
import { Middleware } from './Middleware'
import { ConfigStore, ErrorHandler } from '../interfaces'

/**
 * Represents the options for configuring a server.
 */
export interface ServerOptions {
  /**
   * The host name or IP address to bind the server to.
   */
  host: string
  /**
   * The port number to bind the server to.
   */
  port: number
}

/**
 * Represents an object that defines the lifecycle methods for a server.
 */
export interface ServerLifecycle {
  /**
   * This method is called when the server is initialized.
   * @returns A promise that resolves when the initialization is complete.
   */
  onInit(): Promise<void>
  /**
   * This method is called when the server is started.
   * @returns A promise that resolves when the server has started.
   */
  onStart(): Promise<void>
  /**
   * This method is called when the server is stopped.
   * @returns A promise that resolves when the server has stopped.
   */
  onStop(): Promise<void>
}

/**
 * Represents a web server that can handle HTTP requests.
 */
export abstract class Server implements ServerLifecycle {
  protected config: ConfigStore
  protected context: Context<object>
  protected middleware: Middleware[]
  protected errorHandler: ErrorHandler

  constructor(protected options: ServerOptions, protected logger: Logger) {}

  async onInit() {
    this.logger.log('Server initializing...')
  }

  async onStart() {
    this.logger.log('Server starting...')
  }

  async onStop() {
    this.logger.log('Server stopping...')
  }

  useMiddleware(middleware: Middleware) {
    this.middleware.push(middleware)
  }

  useErrorHandler(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler
  }

  abstract init(): Promise<void>
  abstract start(): Promise<void>
  abstract stop(): Promise<void>
}
