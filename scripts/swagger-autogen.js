const { resolve } = require('path')
const { readFileSync } = require('fs')
const swagger = require('swagger-autogen')

const OUTPUT_PATH = './swagger_output.json'

const INPUT_PATHS = [
  resolve(process.cwd(), 'apps/core/project-api/src/module/infra/http/api/main.ts'),
]

const { version } = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json')))

const generateApiSpecs = swagger({ openapi: '3.0.0', info: { title: 'API', version: '2.0.0' } })

const DOCUMENTATION = {
  info: { version },
  tags: [{ name: 'taggedBy', description: 'taggedBy description' }],
}

generateApiSpecs(OUTPUT_PATH, INPUT_PATHS, DOCUMENTATION)
