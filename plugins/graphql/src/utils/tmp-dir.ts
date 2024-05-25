import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

export let _tmpDir: string

export function tmpDir(): string {
  if (!_tmpDir) {
    _tmpDir = fs
      .mkdtempSync(path.join(os.tmpdir(), 'plugins-graphql-'))
      .split(path.sep)
      .join(path.posix.sep)
  }
  return _tmpDir
}
