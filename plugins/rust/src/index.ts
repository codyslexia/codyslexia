import { NxPlugin } from '@nx/devkit'
import { createDependencies, createNodes } from './graph'

export const nxPlugin: NxPlugin = {
  name: '@plugins/rust',
  createDependencies,
  createNodes,
}
