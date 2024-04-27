import { HOTP, HOTPOptions, hotpOptionsValidator, hotpToken } from './hotp'
import {
  CreateHmacKey,
  HASH_ALGORITHMS,
  HashAlgorithms,
  HexString,
  KeyEncodings,
  SecretKey,
  Strategy,
  createDigestPlaceholder,
  isTokenValid,
  keyuri,
} from './utils'

export interface TOTPOptions<T = string> extends HOTPOptions<T> {
  epoch: number // in seconds (UNIX epoch * 1000)
  step: number // in seconds (time step)
  window: number | [number, number] // how many windows/periods (x * step)
}

export interface EpochAvailable {
  current: number
  future: number[]
  past: number[]
}

function parseWindowBounds(win?: unknown): [number, number] {
  if (typeof win === 'number') {
    return [Math.abs(win), Math.abs(win)]
  }

  if (Array.isArray(win)) {
    const [past, future] = win

    if (typeof past === 'number' && typeof future === 'number') {
      return [Math.abs(past), Math.abs(future)]
    }
  }

  throw new Error('Expecting options.window to be an number or [number, number].')
}

export function totpOptionsValidator<T extends TOTPOptions<unknown> = TOTPOptions<unknown>>(
  options: Readonly<Partial<T>>
): void {
  hotpOptionsValidator<T>(options)
  parseWindowBounds(options.window)

  if (typeof options.epoch !== 'number') {
    throw new Error('Expecting options.epoch to be a number.')
  }

  if (typeof options.step !== 'number') {
    throw new Error('Expecting options.step to be a number.')
  }
}

export const totpPadSecret = (
  secret: SecretKey,
  encoding: KeyEncodings,
  minLength: number
): HexString => {
  const currentLength = secret.length
  const hexSecret = Buffer.from(secret, encoding).toString('hex')

  if (currentLength < minLength) {
    const newSecret = new Array(minLength - currentLength + 1).join(hexSecret)
    return Buffer.from(newSecret, 'hex').slice(0, minLength).toString('hex')
  }

  return hexSecret
}

export const totpCreateHmacKey: CreateHmacKey = (
  algorithm: HashAlgorithms,
  secret: SecretKey,
  encoding: KeyEncodings
): HexString => {
  switch (algorithm) {
    case HashAlgorithms.SHA1:
      return totpPadSecret(secret, encoding, 20)
    case HashAlgorithms.SHA256:
      return totpPadSecret(secret, encoding, 32)
    case HashAlgorithms.SHA512:
      return totpPadSecret(secret, encoding, 64)
    default:
      throw new Error(
        `Expecting algorithm to be one of ${HASH_ALGORITHMS.join(', ')}. Received ${algorithm}.`
      )
  }
}

export function totpDefaultOptions<
  T extends TOTPOptions<unknown> = TOTPOptions<unknown>
>(): Partial<T> {
  const options = {
    algorithm: HashAlgorithms.SHA1,
    createDigest: createDigestPlaceholder,
    createHmacKey: totpCreateHmacKey,
    digits: 6,
    encoding: KeyEncodings.ASCII,
    epoch: Date.now(),
    step: 30,
    window: 0,
  }

  return options as unknown as Partial<T>
}

export function totpOptions<T extends TOTPOptions<unknown> = TOTPOptions<unknown>>(
  opt: Partial<T>
): Readonly<T> {
  const options = {
    ...totpDefaultOptions<T>(),
    ...opt,
  }

  totpOptionsValidator<T>(options)
  return Object.freeze(options) as Readonly<T>
}

// generate the counter based on the current epoch and step
export function totpCounter(epoch: number, step: number): number {
  return Math.floor(epoch / step / 1000)
}

// generates a Time-based One-time Token (TOTP)
export function totpToken<T extends TOTPOptions<unknown> = TOTPOptions<unknown>>(
  secret: SecretKey,
  options: Readonly<T>
): string {
  const counter = totpCounter(options.epoch, options.step)
  return hotpToken<T>(secret, counter, options)
}

function totpEpochsInWindow(
  epoch: number,
  direction: number,
  deltaPerEpoch: number,
  numOfEpoches: number
): number[] {
  const result: number[] = []

  if (numOfEpoches === 0) {
    return result
  }

  for (let i = 1; i <= numOfEpoches; i++) {
    const delta = direction * i * deltaPerEpoch
    result.push(epoch + delta)
  }

  return result
}

export function totpEpochAvailable(
  epoch: number,
  step: number,
  win: number | [number, number]
): EpochAvailable {
  const bounds = parseWindowBounds(win)
  const delta = step * 1000 // to JS Time

  return {
    current: epoch,
    past: totpEpochsInWindow(epoch, -1, delta, bounds[0]),
    future: totpEpochsInWindow(epoch, 1, delta, bounds[1]),
  }
}

export function totpCheck<T extends TOTPOptions<unknown> = TOTPOptions<unknown>>(
  token: string,
  secret: SecretKey,
  options: Readonly<T>
): boolean {
  if (!isTokenValid(token)) {
    return false
  }

  const systemToken = totpToken(secret, options)
  return token === systemToken
}

export function totpCheckByEpoch<T extends TOTPOptions = TOTPOptions>(
  epochs: number[],
  token: string,
  secret: SecretKey,
  options: Readonly<T>
): number | null {
  let position = null

  epochs.some((epoch, idx): boolean => {
    if (totpCheck<T>(token, secret, { ...options, epoch })) {
      position = idx + 1
      return true
    }

    return false
  })

  return position
}

export function totpCheckWithWindow<T extends TOTPOptions = TOTPOptions>(
  token: string,
  secret: SecretKey,
  options: Readonly<T>
): number | null {
  if (totpCheck(token, secret, options)) {
    return 0
  }

  const epochs = totpEpochAvailable(options.epoch, options.step, options.window)
  const backward = totpCheckByEpoch<T>(epochs.past, token, secret, options)

  if (backward !== null) {
    return backward * -1
  }

  // null = check failed
  // positive number = token at future x * step
  // negative number = token at past x * step
  return totpCheckByEpoch<T>(epochs.future, token, secret, options)
}

export function totpTimeUsed(epoch: number, step: number): number {
  return Math.floor(epoch / 1000) % step
}

export function totpTimeRemaining(epoch: number, step: number): number {
  return step - totpTimeUsed(epoch, step)
}

export function totpKeyuri<T extends TOTPOptions<unknown> = TOTPOptions<unknown>>(
  accountName: string,
  issuer: string,
  secret: SecretKey,
  options: Readonly<T>
): string {
  return keyuri({
    algorithm: options.algorithm,
    digits: options.digits,
    step: options.step,
    type: Strategy.TOTP,
    accountName,
    issuer,
    secret,
  })
}

export class TOTP<T extends TOTPOptions = TOTPOptions> extends HOTP<T> {
  public create(defaultOptions: Partial<T> = {}): TOTP<T> {
    return new TOTP<T>(defaultOptions)
  }

  public allOptions(): Readonly<T> {
    return totpOptions<T>(this.options)
  }

  public generate(secret: SecretKey): string {
    return totpToken<T>(secret, this.allOptions())
  }

  public checkDelta(token: string, secret: SecretKey): number | null {
    return totpCheckWithWindow<T>(token, secret, this.allOptions())
  }

  public check(token: string, secret: SecretKey): boolean {
    const delta = this.checkDelta(token, secret)
    return typeof delta === 'number'
  }

  public verify(opts: { token: string; secret: SecretKey }): boolean {
    if (typeof opts !== 'object') {
      throw new Error('Expecting argument 0 of verify to be an object')
    }
    return this.check(opts.token, opts.secret)
  }

  public timeRemaining(): number {
    const options = this.allOptions()
    return totpTimeRemaining(options.epoch, options.step)
  }

  public timeUsed(): number {
    const options = this.allOptions()
    return totpTimeUsed(options.epoch, options.step)
  }

  public keyuri(accountName: string, issuer: string, secret: SecretKey): string {
    return totpKeyuri<T>(accountName, issuer, secret, this.allOptions())
  }
}
