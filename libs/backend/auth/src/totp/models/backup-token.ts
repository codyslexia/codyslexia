import { randomBytes } from 'crypto'

/**
 * Generates a backup token based on the specified pattern.
 * @param pattern The pattern used to generate the backup token. Defaults to 'xxxx-xxxx-xxxx'.
 * @returns The generated backup token.
 */
export function createToken(pattern = 'xxxx-xxxx-xxxx'): string {
  const length = Math.ceil(pattern.split('x').length - 1 / 2)

  const chars = randomBytes(length).toString('hex')
  let code = ''
  let xs = 0

  for (let i = 0; i < pattern.length; i++) {
    code += pattern[i] === 'x' ? chars[xs++] : pattern[i]
  }

  return code
}

/**
 * Creates an array of backup tokens.
 * @param count The number of backup tokens to create. Defaults to 8.
 * @param pattern The pattern used to generate each backup token. Defaults to 'xxxx-xxxx-xxxx'.
 * @returns An array of generated backup tokens.
 */
export function createBackupTokens(count = 8, pattern = 'xxxx-xxxx-xxxx'): string[] {
  const codes = []
  for (let c = 0; c < count; c++) {
    codes.push(createToken(pattern))
  }
  return codes
}
