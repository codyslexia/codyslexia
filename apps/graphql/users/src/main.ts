/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { resolve } from 'path'
import { readFileSync } from 'fs'
import { GraphQLError } from 'graphql'
import gql from 'graphql-tag'

import * as D from '@apollo/server/plugin/disabled'
import { ApolloServer } from '@apollo/server'
import { buildSubgraphSchema } from '@apollo/subgraph'
import { ApolloServerErrorCode } from '@apollo/server/errors'
import { startStandaloneServer } from '@apollo/server/standalone'

import { federatedContext } from '@shared/utils'

import * as resolvers from './resolvers'
import { connect, disconnect, log } from './shared/infra/database/mongoose/config'

export interface FormattedError extends GraphQLError {
  extensions: {
    code: ApolloServerErrorCode
  }
}

process.on('uncaughtException', (erro: Error) => {
  log(`Erro Nodejs: Uncaught Exception`)
  console.error(erro.name, erro.message, erro.stack)
  process.exit(1)
})

const plugins = [
  D.ApolloServerPluginInlineTraceDisabled(),
  D.ApolloServerPluginUsageReportingDisabled(),
]

const APOLLO_PORT = Number(process.env.PORT ?? 4001)
const GRAPHQL_SCHEMA_PATH = resolve(__dirname, 'schema.graphql')

async function main() {
  const typeDefs = gql(readFileSync(GRAPHQL_SCHEMA_PATH, { encoding: 'utf-8' }))

  const server = new ApolloServer({
    plugins,
    status400ForVariableCoercionErrors: true,
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formatError: (formattedError: FormattedError, error: GraphQLError) => {
      if (formattedError.extensions.code === ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED) {
        return {
          ...formattedError,
          message: "Your query doesn't match the schema. Try double-checking it!",
        }
      }
      return formattedError
    },
  })

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