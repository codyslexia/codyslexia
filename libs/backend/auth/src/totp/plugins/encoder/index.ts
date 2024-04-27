import { encode, decode } from './main'
import type { Base32SecretKey, KeyDecoder, KeyEncoder } from '../../models/authenticator'
import type { SecretKey, KeyEncodings } from '../../models/utils'

export const keyDecoder: KeyDecoder = (
  encodedSecret: Base32SecretKey,
  encoding: KeyEncodings
): SecretKey => {
  const arrayBuffer = decode(encodedSecret.toUpperCase(), 'RFC4648')
  return Buffer.from(arrayBuffer).toString(encoding)
}

export const keyEncoder: KeyEncoder = (
  secret: SecretKey,
  encoding: KeyEncodings
): Base32SecretKey => {
  return encode(Buffer.from(secret, encoding), 'RFC4648', {
    padding: false,
  })
}

export { encode, decode }
