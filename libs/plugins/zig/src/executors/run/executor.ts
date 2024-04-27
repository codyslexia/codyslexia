import { execSync } from 'child_process'
import { ExecutorContext, logger } from '@nx/devkit'

import { ZigRunSchema } from './schema'

export const executeCommand = async (
  parameters: string[] = [],
  options: ZigRunSchema
): Promise<{ success: boolean }> => {
  try {
    const { cwd = null, env = {} } = options

    logger.info(`Executing command: ${['zig', ...parameters].join(' ')}`)

    execSync(['zig', ...parameters].join(' '), {
      cwd,
      env: Object.assign(process.env, env),
      stdio: [0, 1, 2],
    })

    return { success: true }
  } catch (error) {
    logger.error(error)
    return { success: false }
  }
}

export default async function runExecutor(options: ZigRunSchema, context: ExecutorContext) {
  const directory = options.cwd ?? context.projectsConfigurations.projects[context.projectName].root
  const mainFile = options.main.replace(`${directory}/`, '')
  return executeCommand(['run', mainFile, ...(options.args ?? [])], {
    cmd: options.cmd,
    cwd: directory,
  })
}
