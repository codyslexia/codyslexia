import { ZigRunSchema } from './schema'
import executor from './executor'

const options: ZigRunSchema = {}

describe('Run Executor', () => {
  it('can run', async () => {
    const output = await executor(options, {
      root: '',
      cwd: '',
      isVerbose: false,
    })
    expect(output.success).toBe(true)
  })
})
