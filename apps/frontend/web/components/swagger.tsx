'use client'

import SwaggerUI from 'swagger-ui-react'

import 'swagger-ui-react/swagger-ui.css'

const spec = {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'REST API Documentation',
    description: 'Your API documentation.',
  },
  servers: [
    {
      url: 'api.nexa.io',
    },
    {
      url: 'api.hoxlux.com.br',
    },
  ],
  tags: [
    {
      name: 'Projects',
      description: 'API for projects in the system',
    },
  ],
  paths: {
    '/': {
      get: {
        description: '',
        responses: {
          '200': {
            description: 'OK',
          },
        },
      },
    },
    '/status/:id': {
      get: {
        description: 'Retrieves the status of your api.',
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
