import { Authenticator } from '../models/authenticator'
import { Base32, createDigest, createRandomBytes } from '../plugins'

const authenticator = new Authenticator({
  keyDecoder: Base32.keyDecoder,
  keyEncoder: Base32.keyEncoder,
  createRandomBytes,
  createDigest,
})

export { authenticator }
