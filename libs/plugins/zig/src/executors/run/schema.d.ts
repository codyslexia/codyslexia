export interface ZigRunSchema {
  main?: string
  cmd?: string
  cwd?: string
  args?: string[]
  env?: { [key: string]: string }
}
