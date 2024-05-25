import { ExecutorContext } from '@nx/devkit'

import { getDefaultScheme, runCommand } from '../../utils'

import { GenerateExecutorSchema } from './schema'

export default async function runExecutor(options: GenerateExecutorSchema, ctx: ExecutorContext) {
  return runCommand(options, ctx, {
    description: 'Generating types',
    command: 'graphql-codegen',
    getArgs,
  })
}

const getArgs = (options: GenerateExecutorSchema, ctx: ExecutorContext): string[] => {
  const args = []
  const config = options?.config ?? getDefaultScheme(ctx)

  args.push(`--config=${config}`)

  return args
}
