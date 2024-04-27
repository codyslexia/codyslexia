import { HashAlgorithms, KeyEncodings, SecretKey, createDigestPlaceholder } from './utils'
import {
  TOTP,
  TOTPOptions,
  totpCheckWithWindow,
  totpCreateHmacKey,
  totpOptionsValidator,
  totpToken,
} from './totp'

// RFC4648 / RFC3548 Base32 String
export type Base32SecretKey = SecretKey

export interface KeyEncoder<T = Base32SecretKey> {
  (secret: SecretKey, encoding: KeyEncodings): T
}

export interface KeyDecoder<T = SecretKey> {
  (encodedSecret: Base32SecretKey, encoding: KeyEncodings): T
}

export interface CreateRandomBytes<T = string> {
  (size: number, encoding: KeyEncodings): T
}

export interface Options<T = string> extends TOTPOptions<T> {
  // encode a secret key into a base32 string
  keyEncoder: KeyEncoder<T>
  // decode the base32 string into a secret
  keyDecoder: KeyDecoder<T>
  // create a random string containing the defined number of bytes to be used in generating a secret key
  createRandomBytes: CreateRandomBytes<T>
}

export function normalizeOptions<T extends Options<unknown> = Options<unknown>>(
  options: Partial<T>
): void {
  totpOptionsValidator<T>(options)

  if (typeof options.keyDecoder !== 'function') {
    throw new Error('Expecting options.keyDecoder to be a function.')
  }

  if (options.keyEncoder && typeof options.keyEncoder !== 'function') {
    throw new Error('Expecting options.keyEncoder to be a function.')
  }
}

export function createDefaultOptions<T extends Options<unknown> = Options<unknown>>(): Partial<T> {
  const options = {
    algorithm: HashAlgorithms.SHA1,
    createDigest: createDigestPlaceholder,
    createHmacKey: totpCreateHmacKey,
    digits: 6,
    encoding: KeyEncodings.HEX,
    epoch: Date.now(),
    step: 30,
    window: 0,
  }

  return options as unknown as Partial<T>
}

export function withDefaultOptions<T extends Options<unknown> = Options<unknown>>(
  opt: Partial<T>
): Readonly<T> {
  const options = {
    ...createDefaultOptions<T>(),
    ...opt,
  }

  normalizeOptions<T>(options)
  return Object.freeze(options) as Readonly<T>
}

export function encoder<T extends Options<unknown> = Options<unknown>>(
  secret: SecretKey,
  options: Pick<T, 'keyEncoder' | 'encoding'>
): ReturnType<T['keyEncoder']> {
  return options.keyEncoder(secret, options.encoding) as ReturnType<T['keyEncoder']>
}

export function decoder<T extends Options<unknown> = Options<unknown>>(
  secret: Base32SecretKey,
  options: Pick<T, 'keyDecoder' | 'encoding'>
): ReturnType<T['keyDecoder']> {
  return options.keyDecoder(secret, options.encoding) as ReturnType<T['keyDecoder']>
}

export function generateSecret<T extends Options = Options>(
  numberOfBytes: number,
  options: Pick<T, 'keyEncoder' | 'encoding' | 'createRandomBytes'>
): Base32SecretKey {
  const key = options.createRandomBytes(numberOfBytes, options.encoding)
  return encoder<T>(key, options)
}

export function generateToken<T extends Options = Options>(
  secret: Base32SecretKey,
  options: Readonly<T>
): string {
  return totpToken<T>(decoder<T>(secret, options), options)
}

// decode the encodedSecret and pass it to [[totpCheckWithWindow]]
export function checkWithWindow<T extends Options = Options>(
  token: string,
  secret: Base32SecretKey,
  options: Readonly<T>
): number | null {
  return totpCheckWithWindow<T>(token, decoder<T>(secret, options), options)
}

export class Authenticator<T extends Options<string> = Options<string>> extends TOTP<T> {
  public create(options: Partial<T> = {}): Authenticator<T> {
    return new Authenticator<T>(options)
  }

  public allOptions(): Readonly<T> {
    return withDefaultOptions<T>(this.options)
  }

  public generate(secret: Base32SecretKey): string {
    return generateToken<T>(secret, this.allOptions())
  }

  public checkDelta(token: string, secret: Base32SecretKey): number | null {
    return checkWithWindow<T>(token, secret, this.allOptions())
  }

  public encode(secret: SecretKey): Base32SecretKey {
    return encoder<T>(secret, this.allOptions())
  }

  public decode(secret: Base32SecretKey): SecretKey {
    return decoder<T>(secret, this.allOptions())
  }

  public generateSecret(numberOfBytes = 10): Base32SecretKey {
    return generateSecret<T>(numberOfBytes, this.allOptions())
  }
}
