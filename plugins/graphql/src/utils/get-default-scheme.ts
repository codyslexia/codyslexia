import { ExecutorContext, joinPathFragments } from '@nx/devkit'
import { getProjectRoot } from './workspace'
import { CODEGEN_DEFAULT_DIR } from '../generators/configuration/constants'

export const getDefaultScheme = (ctx: ExecutorContext) =>
  joinPathFragments(getProjectRoot(ctx), `${CODEGEN_DEFAULT_DIR}/codegen.ts`)
