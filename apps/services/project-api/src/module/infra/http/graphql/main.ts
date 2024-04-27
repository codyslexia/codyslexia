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

const APOLLO_PORT = Number(process.env.GRAPHQL_PORT || 4002)
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
      runner: 'backend-projects-graphql',
      message: `Server ready at ${url}.`,
      timestamp: new Date().toISOString(),
    })
  )
}

main()
