'use client'

import SwaggerUI from 'swagger-ui-react'
import type { SwaggerUIProps } from 'swagger-ui-react'

import 'swagger-ui-react/swagger-ui.css'
import { OpenAPIV3 } from './open-api'

const spec: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Codyslexia REST API ',
    description: "Codyslexia's REST API documentation",
  },
  servers: [
    {
      url: 'https://local.dev',
    },
  ],
  tags: [
    {
      name: 'Go API',
      description: 'API for Go API in the system',
    },
    {
      name: 'GraphQL',
      description: 'Federated GraphQL Gateway with Apollo Federation and Apollo Server',
    },
  ],
  paths: {
    '/api/goapi': {
      summary: 'Get Go API status',
      get: {
        tags: ['Go API'],
        description: 'Retrieves the status of your go api.',
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/graphql': {
      summary: 'GraphQL API',
      post: {
        tags: ['GraphQL'],
        description: "Queries the GraphQL API for the user's data.",
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  query: {
                    type: 'string',
                    default: `query GetProjects { projects { id kind name environment description createdAt updatedAt user { id email } } }`,
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
  },
}

export const Swagger = () => {
  return <SwaggerUI spec={spec} />
}
