import { NxPlugin } from '@nx/devkit'
import { createDependencies } from './graph/create-dependencies'
import { createNodes } from './graph/create-nodes'

const plugin: NxPlugin = {
  name: '@plugins/golang',
  createDependencies,
  createNodes,
}

export = plugin
