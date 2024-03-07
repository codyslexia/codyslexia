/* eslint-disable @typescript-eslint/no-explicit-any */

export interface CargoToml {
  // workspace is only applicable to the root Cargo.toml
  workspace?: { members: string[] }
  package: any
  dependencies?: Record<
    string,
    string | { version: string; features?: string[]; optional?: boolean }
  >
  'dev-dependencies'?: Record<string, string | { version: string; features: string[] }>
  [key: string]: any
}
