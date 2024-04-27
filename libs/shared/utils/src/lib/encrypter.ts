import * as util from 'util'
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import type { RSAKeyPairOptions, BinaryToTextEncoding, BinaryLike } from 'crypto'

/**
 * Create a bcrypt hash from a string
 * @param payload The `string` or `Buffer` to be hashed
 * @param factor Cost (rounds) of processing the data
 * @returns The encrypted (hashed) data string
 */
export const createHash = async (payload: string | Buffer, factor = 12) => {
  const salt = await bcrypt.genSalt(factor)
  return await bcrypt.hash(payload, salt)
}

export const encryptPassword = createHash

/**
 * Compare a bcrypt hash with a plain string
 * @param x The `string` or `Buffer` to be encrypted
 * @param hash Encrypted string to be compared against `x`
 * @returns `boolean`
 */
export const compareHash = async (x: string | Buffer, hash: string) => {
  return await bcrypt.compare(x, hash)
}

export const comparePassword = compareHash

const algorithm = 'aes-256-cbc'

/**
 * Encrypt (cipher) data
 * @param body Content string to be encrypted
 */
export const encrypt = async (body: BinaryLike, key: string | Uint8Array | readonly number[]) => {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv)
  const message = cipher.update(body)
  const buffer = Buffer.concat([message, cipher.final()])
  return {
    iv: iv.toString('hex'),
    data: buffer.toString('hex'),
  }
}

/**
 * Decrypt (decipher) data
 * @param payload The object `iv` and `data` to be decrypted
 * @returns The decripted `data` string
 */
export const decrypt = async (payload: { iv: string; data: string }, key: string) => {
  const iv = Buffer.from(payload.iv, 'hex')
  const original = Buffer.from(payload.data, 'hex')
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv)
  const parsed = decipher.update(original)
  return Buffer.concat([parsed, decipher.final()]).toString()
}

/**
 * Generates cryptographically strong pseudorandom data. The size argument is a number indicating the number of bytes to generate.
 * @param bytes Number of bytes to generate
 * @param options Buffer encoding
 * @returns Pseudorandom data string
 */
export const createToken = (bytes?: number, options?: { encoder?: BufferEncoding }) => {
  return crypto.randomBytes(bytes ?? 16).toString(options?.encoder ?? 'hex')
}

/**
 * Get derivation of an original cryptographically strong pseudorandom data.
 * @param token Token string to be validated
 * @param options Buffer encoding
 * @returns Pseudorandom data string
 */
export const validateToken = (token: string, options?: { digest?: BinaryToTextEncoding }) => {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest(options?.digest ?? 'hex')
}

type PublicKeyEncoding = RSAKeyPairOptions<'pem', 'pem'>['publicKeyEncoding']['type']
type PrivateKeyEncoding = RSAKeyPairOptions<'pem', 'pem'>['privateKeyEncoding']['type']
type KeyPairLength = RSAKeyPairOptions<'pem', 'pem'>['modulusLength']
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type KeyPairType = 'rsa' | 'rsa-pss' | 'dsa' | 'ec' | 'ed25519' | 'ed448' | 'x25519' | 'x448' | 'dh'

/**
 * Generates a new asymmetric RSA key pair.
 * @param length Number of bytes to generate
 * @param  options Buffer encoding
 * @returns Pseudorandom data `string`
 */
export const createKeyPair = async (
  length?: KeyPairLength | 1024 | 2048 | 4096,
  options?: {
    publicKeyEncoding?: PublicKeyEncoding
    privateKeyEncoding?: PrivateKeyEncoding
  }
) => {
  const generateKeyPair = util.promisify(crypto.generateKeyPair)

  const { privateKey, publicKey } = await generateKeyPair('rsa', {
    modulusLength: length || 2048,
    publicKeyEncoding: {
      type: options?.publicKeyEncoding ?? 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: options?.privateKeyEncoding ?? 'pkcs8',
      format: 'pem',
    },
  })

  const privateKeyString = privateKey
    .split('\n')
    .join()
    .replace(/,/g, '')
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')

  const publicKeyString = publicKey
    .split('\n')
    .join()
    .replace(/,/g, '')
    .replace('-----BEGIN PUBLIC KEY-----', '')
    .replace('-----END PUBLIC KEY-----', '')

  return {
    publicKey: publicKeyString,
    privateKey: privateKeyString,
  }
}
