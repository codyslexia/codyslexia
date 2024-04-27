/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createServer } from 'http'
import { idle, ConnectionManager } from './ConnectionManager'

describe('ConnectionManager', () => {
  let serverProcessManager: ConnectionManager
  let mockServer: ReturnType<typeof createServer>

  beforeAll((done) => {
    mockServer = createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.end('Hello, world!')
    })
    serverProcessManager = new ConnectionManager(mockServer)
    const PORT = 9999
    mockServer.listen(PORT, () => {
      done()
    })
  })

  afterAll((done) => {
    serverProcessManager.terminate(done)
    mockServer.close()
  })

  it('should initialize correctly', () => {
    expect(serverProcessManager).toBeInstanceOf(ConnectionManager)
  })

  it('should track new connections', () => {
    const connection: any = { on: jest.fn(), end: jest.fn() }
    serverProcessManager.onConnection(connection)
    expect(connection.on).toHaveBeenCalled()
  })

  it('should track new requests', () => {
    const request: any = { socket: { on: jest.fn() } }
    const response: any = { on: jest.fn() }
    serverProcessManager.onRequest(request, response)
    expect(request.socket[idle]).toBeDefined()
    expect(request.socket[idle]).toEqual(false)
    expect(response.on).toHaveBeenCalled()
  })

  it('should close inactive connections', () => {
    const connection: any = {
      [idle]: true,
      end: jest.fn(),
    }
    serverProcessManager.close(connection)
    expect(connection.end).toHaveBeenCalled()
  })

  it('should not close active connections', () => {
    const connection: any = {
      [idle]: false,
      end: jest.fn(),
    }
    serverProcessManager.close(connection)
    expect(connection.end).not.toHaveBeenCalled()
  })
})
