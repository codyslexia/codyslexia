import { OTP, OTPOptions } from './otp'

import {
  CreateDigest,
  CreateHmacKey,
  HASH_ALGORITHMS,
  HashAlgorithms,
  HexString,
  KEY_ENCODINGS,
  KeyEncodings,
  SecretKey,
  Strategy,
  createDigestPlaceholder,
  isTokenValid,
  keyuri,
  padStart,
} from './utils'

export interface HOTPOptions<T = string> extends OTPOptions {
  createDigest: CreateDigest<T>
  createHmacKey: CreateHmacKey<T>
  algorithm: HashAlgorithms // for calculating the HMAC
  digest?: HexString // for async operations (carefully: same digest, same token)
  digits: number // number of token digits
  encoding: KeyEncodings // secret encoding
}

/**
 * HTOP Class
 */
export class HOTP<T extends HOTPOptions = HOTPOptions> extends OTP<T> {
  public create(defaultOptions: Partial<T> = {}): HOTP<T> {
    return new HOTP<T>(defaultOptions)
  }

  public allOptions(): Readonly<T> {
    return hotpOptions<T>(this.options)
  }

  public generate(secret: SecretKey, counter: number): string {
    return hotpToken<T>(secret, counter, this.allOptions())
  }

  public check(token: string, secret: SecretKey, counter: number): boolean {
    return hotpCheck<T>(token, secret, counter, this.allOptions())
  }

  public verify(opts: { token: string; secret: SecretKey; counter: number }): boolean {
    if (typeof opts !== 'object') {
      throw new Error('Expecting argument 0 of verify to be an object')
    }
    return this.check(opts.token, opts.secret, opts.counter)
  }

  public keyuri(accountName: string, issuer: string, secret: SecretKey, counter: number): string {
    return hotpKeyuri<T>(accountName, issuer, secret, counter, this.allOptions())
  }
}

export function hotpOptionsValidator<T extends HOTPOptions<unknown> = HOTPOptions<unknown>>(
  options: Readonly<Partial<T>>
): void {
  if (typeof options.createDigest !== 'function') {
    throw new Error('Expecting options.createDigest to be a function.')
  }

  if (typeof options.createHmacKey !== 'function') {
    throw new Error('Expecting options.createHmacKey to be a function.')
  }

  if (typeof options.digits !== 'number') {
    throw new Error('Expecting options.digits to be a number.')
  }

  const invalidAlgorithm =
    !options.algorithm || HASH_ALGORITHMS.indexOf(options.algorithm as string) < 0

  if (invalidAlgorithm) {
    throw new Error(
      `Expecting options.algorithm to be one of ${HASH_ALGORITHMS.join(', ')}. Received ${
        options.algorithm
      }.`
    )
  }

  if (!options.encoding || KEY_ENCODINGS.indexOf(options.encoding as string) < 0) {
    throw new Error(
      `Expecting options.encoding to be one of ${KEY_ENCODINGS.join(', ')}. Received ${
        options.encoding
      }.`
    )
  }
}

// derives the HMAC key from the HOTP secret to create token
export const hotpCreateHmacKey: CreateHmacKey = (
  algorithm: HashAlgorithms,
  secret: SecretKey,
  encoding: KeyEncodings
): HexString => {
  return Buffer.from(secret, encoding).toString('hex')
}

export function hotpDefaultOptions<
  T extends HOTPOptions<unknown> = HOTPOptions<unknown>
>(): Partial<T> {
  const options = {
    algorithm: HashAlgorithms.SHA1,
    createHmacKey: hotpCreateHmacKey,
    createDigest: createDigestPlaceholder,
    digits: 6,
    encoding: KeyEncodings.ASCII,
  }

  return options as unknown as Partial<T>
}

export function hotpOptions<T extends HOTPOptions<unknown> = HOTPOptions<unknown>>(
  opt: Readonly<Partial<T>>
): Readonly<T> {
  const options = {
    ...hotpDefaultOptions<T>(),
    ...opt,
  }

  hotpOptionsValidator<T>(options)
  return Object.freeze(options) as Readonly<T>
}

// format counter to string counter
export function hotpCounter(counter: number): HexString {
  const hexCounter = counter.toString(16)
  return padStart(hexCounter, 16, '0')
}

// convert the digest to a token of a specified length
export function hotpDigestToToken(hexDigest: HexString, digits: number): string {
  const digest = Buffer.from(hexDigest, 'hex')
  const offset = digest[digest.length - 1] & 0xf
  const binary =
    ((digest[offset] & 0x7f) << 24) |
    ((digest[offset + 1] & 0xff) << 16) |
    ((digest[offset + 2] & 0xff) << 8) |
    (digest[offset + 3] & 0xff)

  const token = binary % Math.pow(10, digits)
  return padStart(String(token), digits, '0')
}

// generate digest
function hotpDigest<T extends HOTPOptions = HOTPOptions>(
  secret: SecretKey,
  counter: number,
  options: Readonly<T>
): HexString {
  const hexCounter = hotpCounter(counter)

  const hmacKey = options.createHmacKey(options.algorithm, secret, options.encoding)

  return options.createDigest(options.algorithm, hmacKey, hexCounter)
}

/**
 * Generates a HMAC-based One-time Token (HOTP)
 */
export function hotpToken<T extends HOTPOptions<unknown> = HOTPOptions<unknown>>(
  secret: SecretKey,
  counter: number,
  options: Readonly<T>
): string {
  const hexDigest =
    options.digest || hotpDigest<HOTPOptions>(secret, counter, options as HOTPOptions)

  return hotpDigestToToken(hexDigest as HexString, options.digits)
}

// checks the given token against the system generated token
export function hotpCheck<T extends HOTPOptions<unknown> = HOTPOptions<unknown>>(
  token: string,
  secret: SecretKey,
  counter: number,
  options: Readonly<T>
): boolean {
  if (!isTokenValid(token)) {
    return false
  }

  const systemToken = hotpToken<T>(secret, counter, options)
  return token === systemToken
}

export function hotpKeyuri<T extends HOTPOptions<unknown> = HOTPOptions<unknown>>(
  accountName: string,
  issuer: string,
  secret: SecretKey,
  counter: number,
  options: Readonly<T>
): string {
  return keyuri({
    algorithm: options.algorithm,
    digits: options.digits,
    type: Strategy.HOTP,
    accountName,
    counter,
    issuer,
    secret,
  })
}
