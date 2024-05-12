/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { gql } from 'graphql-tag'
import { readFileSync } from 'fs'
import { resolve } from 'path'

import * as D from '@apollo/server/plugin/disabled'
import { ApolloServer } from '@apollo/server'
import { buildSubgraphSchema } from '@apollo/subgraph'
import { startStandaloneServer } from '@apollo/server/standalone'

import { federatedContext } from '@shared/utils'
import * as resolvers from './resolvers'
import { connect, disconnect, log } from './shared/infra/database/mongoose/config'

process.on('uncaughtException', (erro: Error) => {
  log(`Erro Nodejs: Uncaught Exception`)
  console.error(erro.name, erro.message, erro.stack)
  process.exit(1)
})

const plugins = [
  D.ApolloServerPluginInlineTraceDisabled(),
  D.ApolloServerPluginUsageReportingDisabled(),
]

const APOLLO_PORT = Number(process.env.PORT ?? 4002)
const GRAPHQL_SCHEMA_PATH = resolve(__dirname, './schema.graphql')

const typeDefs = gql(readFileSync(GRAPHQL_SCHEMA_PATH, { encoding: 'utf-8' }))

const server = new ApolloServer({
  plugins,
  status400ForVariableCoercionErrors: true,
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
})

async function main() {
  await connect()

  const { url } = await startStandaloneServer(server, {
    context: federatedContext,
    listen: { port: APOLLO_PORT },
  })

  process.on('unhandledRejection', (erro: Error) => {
    log(`Erro Nodejs: Unhandled Rejection`)
    console.error(erro.name, erro.message, erro.stack)
    server.stop()
    disconnect()
    process.exit(1)
  })

  log(`Server ready at ${url}`)
}

main()
