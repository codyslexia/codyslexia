import { createHmac, randomBytes } from 'crypto'

import type { CreateRandomBytes } from '../../models/authenticator'
import type { CreateDigest, HashAlgorithms, HexString, KeyEncodings } from '../../models/utils'

export const createDigest: CreateDigest = (
  algorithm: HashAlgorithms,
  hmacKey: HexString,
  counter: HexString
): HexString => {
  const hmac = createHmac(algorithm, Buffer.from(hmacKey, 'hex'))
  const digest = hmac.update(Buffer.from(counter, 'hex')).digest()
  return digest.toString('hex')
}

export const createRandomBytes: CreateRandomBytes = (
  size: number,
  encoding: KeyEncodings
): string => {
  return randomBytes(size).toString(encoding)
}
