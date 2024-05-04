/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as S from '@apollo/server/standalone'
import { GraphQLRequest, ContextFunction } from '@apollo/server'
import { IncomingMessage } from 'http'
import { GraphQLError } from 'graphql'

/**
 * This interface is used with `graphql-codegen` to generate types for the resolvers context.
 */
export interface DataSourceContext {
  auth?: string
}

/**
 * Standalone server context function that is used to create the context for the resolvers.
 */
type ServerContext = ContextFunction<[S.StandaloneServerContextFunctionArgument], DataSourceContext>

export const federatedContext: ServerContext = async ({ req }) =>
  isRouterAuthorized(req) ? { auth: req.headers.authorization } : {}

export function validateRequest(request: GraphQLRequest) {
  if (request.operationName === 'IntrospectionQuery') {
    return
  }

  if (!request.http?.headers.get('authorization')) {
    throw new GraphQLError('Missing authentication', {
      extensions: {
        code: 'UNAUTHORIZED',
        http: { status: 401 },
      },
    })
  }
}

export function hasValidSecret(request: IncomingMessage) {
  const routerSecret = process.env['ROUTER_SECRET']
  const routerAuthorization = process.env['ROUTER_AUTHORIZATION']
  const targetHeader = request.headers['router-authorization']
  if (targetHeader == null) return false
  if (routerSecret === targetHeader) return true
  if (routerAuthorization === targetHeader) return true
  return false
}

export function isRouterAuthorized(request: IncomingMessage) {
  if (!hasValidSecret(request)) {
    throw new GraphQLError('Invalid Router Authentication', {
      extensions: {
        code: 'UNAUTHORIZED',
        http: { status: 401 },
      },
    })
  }

  return true
}
