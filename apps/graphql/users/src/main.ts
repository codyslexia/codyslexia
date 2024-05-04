/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { resolve } from 'path'
import { readFileSync } from 'fs'
import gql from 'graphql-tag'

import * as D from '@apollo/server/plugin/disabled'
import { ApolloServer } from '@apollo/server'
import { buildSubgraphSchema } from '@apollo/subgraph'
import { startStandaloneServer } from '@apollo/server/standalone'

import { federatedContext } from '@shared/utils'
import * as resolvers from './resolvers'

const plugins = [
  D.ApolloServerPluginInlineTraceDisabled(),
  D.ApolloServerPluginUsageReportingDisabled(),
]

const APOLLO_PORT = Number(process.env.PORT || 4001)
const GRAPHQL_SCHEMA_PATH = resolve(__dirname, 'schema.graphql')

async function main() {
  const typeDefs = gql(readFileSync(GRAPHQL_SCHEMA_PATH, { encoding: 'utf-8' }))

  const server = new ApolloServer({
    plugins,
    status400ForVariableCoercionErrors: true,
    schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
  })

  const { url } = await startStandaloneServer(server, {
    context: federatedContext,
    listen: { port: APOLLO_PORT },
  })

  console.log(
    JSON.stringify({
      runner: 'graphql-users',
      message: `Server ready at ${url}.`,
      timestamp: new Date().toISOString(),
    })
  )
}

main()
