import { resolve } from 'path'
import { readFileSync } from 'fs'

import * as D from '@apollo/server/plugin/disabled'
import { ApolloServer } from '@apollo/server'
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway'
import { startStandaloneServer } from '@apollo/server/standalone'

const APOLLO_PORT = Number(process.env.PORT || 4000)

const plugins = [
  D.ApolloServerPluginInlineTraceDisabled(),
  D.ApolloServerPluginUsageReportingDisabled(),
]

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request }) {
    request.http.headers.set('router-authorization', process.env.ROUTER_AUTHORIZATION)
  }
}

const supergraphSchema = readFileSync(
  // TODO: @moatorres - Add logic to handle different environments
  resolve(__dirname, './supergraph.graphql')
)

const gateway = new ApolloGateway({
  supergraphSdl: supergraphSchema.toString(),
  buildService({ url }) {
    return new AuthenticatedDataSource({ url })
  },
})
const server = new ApolloServer({ gateway, plugins })

async function main() {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: APOLLO_PORT },
  })

  console.log(
    JSON.stringify({
      runner: 'graphql-gateway',
      message: `Server is ready at ${url}`,
      timestamp: new Date().toISOString(),
    })
  )
}

main()
