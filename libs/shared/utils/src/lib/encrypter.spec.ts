import * as encrypter from './encrypter'

describe('libs/common/encrypter', () => {
  let password: string

  beforeAll(() => {
    password = 'encryptme'
  })

  it('createHash', async () => {
    const hash = await encrypter.createHash(password)
    expect(hash.slice(0, 6)).toEqual('$2b$12')
  })

  it('compareHash', async () => {
    const hash = await encrypter.createHash(password)
    const result = await encrypter.compareHash(password, hash)
    expect(result).toEqual(true)
  })

  it('encryptPassword', async () => {
    const hash = await encrypter.encryptPassword(password)
    expect(hash.slice(0, 6)).toEqual('$2b$12')
  })

  it('comparePassword', async () => {
    const hash = await encrypter.createHash(password)
    const result = await encrypter.comparePassword(password, hash)
    expect(result).toEqual(true)
  })

  it('encrypt/decrypt', async () => {
    const key = 'thispasswordmusthave32characters'
    const encrypted = await encrypter.encrypt(password, key)
    expect(encrypted).toEqual(encrypted)

    const decrypted = await encrypter.decrypt(encrypted, key)
    expect(decrypted).toEqual(password)
  })

  it('createToken/validateToken', () => {
    const token = encrypter.createToken()
    expect(token.length).toEqual(32)
    expect(typeof token).toEqual('string')

    const validToken = encrypter.validateToken(token)
    expect(validToken.length).toEqual(64)
    expect(typeof validToken).toEqual('string')
  })

  it('createKeyPair', async () => {
    const { privateKey, publicKey } = await encrypter.createKeyPair()
    expect(privateKey.length).toEqual(1624 ?? 1628)
    expect(typeof privateKey).toEqual('string')
    expect(publicKey.length).toEqual(392)
    expect(typeof publicKey).toEqual('string')
  })
})
