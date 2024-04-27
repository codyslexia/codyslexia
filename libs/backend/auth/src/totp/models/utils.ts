export type SecretKey = string
export type HexString = string

export function enumValues(value: Record<string, string>) {
  return Object.keys(value).map((key) => value[key])
}

export enum HashAlgorithms {
  'SHA1' = 'sha1',
  'SHA256' = 'sha256',
  'SHA512' = 'sha512',
}

export const HASH_ALGORITHMS = enumValues(HashAlgorithms)

export enum KeyEncodings {
  'ASCII' = 'ascii',
  'BASE64' = 'base64',
  'HEX' = 'hex',
  'LATIN1' = 'latin1',
  'UTF8' = 'utf8',
}

export const KEY_ENCODINGS = enumValues(KeyEncodings)

export enum Strategy {
  'HOTP' = 'hotp',
  'TOTP' = 'totp',
}

export const STRATEGY = enumValues(Strategy)

export interface CreateHmacKey<T = HexString> {
  (algorithm: HashAlgorithms, secret: SecretKey, encoding: KeyEncodings): T
}

export interface CreateDigest<T = HexString> {
  (algorithm: HashAlgorithms, hmacKey: HexString, counter: HexString): T
}

export interface KeyURIOptions {
  accountName: string
  algorithm?: HashAlgorithms
  counter?: number
  digits?: number
  issuer?: string
  label?: string
  secret: SecretKey
  step?: number
  type: Strategy
}

export const createDigestPlaceholder: CreateDigest = (): string => {
  throw new Error('Please provide an options.createDigest implementation.')
}

export function isTokenValid(value: string): boolean {
  return /^(\d+)$/.test(value)
}

export function padStart(value: string, maxLength: number, fillString: string): string {
  if (value.length >= maxLength) {
    return value
  }

  const padding = Array(maxLength + 1).join(fillString)
  return `${padding}${value}`.slice(-1 * maxLength)
}

// otpauth://totp/Example:alice@google.com?secret=JBSWY3DPEHPK3PXP&issuer=Example
export function keyuri(options: KeyURIOptions): string {
  const params: string[] = [`secret=${options.secret}`]

  if (STRATEGY.indexOf(options.type) < 0) {
    throw new Error(
      `Expecting options.type to be one of ${STRATEGY.join(', ')}. Received ${options.type}.`
    )
  }

  if (options.type === 'hotp') {
    if (options.counter == null || typeof options.counter !== 'number') {
      throw new Error('Expecting options.counter to be a number when options.type is "hotp".')
    }

    params.push(`counter=${options.counter}`)
  }

  if (options.type === 'totp' && options.step) {
    params.push(`period=${options.step}`)
  }

  if (options.digits) {
    params.push(`digits=${options.digits}`)
  }

  if (options.algorithm) {
    params.push(`algorithm=${options.algorithm.toUpperCase()}`)
  }

  let label = encodeURIComponent(options.accountName)

  if (options.issuer) {
    const issuer = encodeURIComponent(options.issuer)
    label = `${issuer}:${label}`
    params.push(`issuer=${issuer}`)
  }

  const query = params.join('&')
  return `otpauth://${options.type}/${label}?${query}`
}
