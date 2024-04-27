import { getExecOutput } from '@actions/exec'
import { ExecutorContext } from '@nx/devkit'

import executor from './executor'
import { GenerateExecutorSchema } from './schema'

jest.mock('@actions/exec', () => {
  const originalModule = jest.requireActual('@actions/exec')
  return {
    __esModule: true,
    ...originalModule,
    getExecOutput: jest.fn(async () => Promise.resolve({ stderr: '', exitCode: 0 })),
  }
})

const mockContext: Partial<ExecutorContext> = {
  root: 'workspace-root',
  workspace: { version: 2, projects: { foo: { root: 'apps/foo' } } },
  projectName: 'foo',
}

export const expectCommandToHaveBeenCalled = (cmd: string, args: string[]) => {
  expect(getExecOutput).toHaveBeenCalledWith(cmd, args, { ignoreReturnCode: true })
}

describe('Generate Executor', () => {
  beforeEach(() => {
    jest.spyOn(console, 'info').mockImplementation(() => true)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it('empty options', async () => {
    const options: GenerateExecutorSchema = {}
    const output = await executor(options, mockContext as ExecutorContext)
    expect(
      expectCommandToHaveBeenCalled('pnpm exec graphql-codegen', [
        '--config=workspace-root/apps/foo/codegen.ts',
      ])
    )
    expect(output.success).toBeTruthy()
  })

  it('with config options', async () => {
    const options: GenerateExecutorSchema = {
      config: 'workspace-root/apps/foo/codegen.ts',
    }
    const output = await executor(options, mockContext as ExecutorContext)
    expect(
      expectCommandToHaveBeenCalled('pnpm exec graphql-codegen', [
        '--config=workspace-root/apps/foo/codegen.ts',
      ])
    )
    expect(output.success).toBeTruthy()
  })
})
