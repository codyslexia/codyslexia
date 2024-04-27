import { Authenticator, Base32, createDigest, createRandomBytes } from '@backend/auth'

export const authenticator = new Authenticator({
  keyDecoder: Base32.keyDecoder,
  keyEncoder: Base32.keyEncoder,
  createRandomBytes,
  createDigest,
})

export type MemoryDB = {
  users: {
    [key: string]: UserEntry
  }
}

export type UserEntry = {
  id: string
  secret: string
  otpauth: string
  image: string
  backup: string[]
}

const cachedMemoryDb = new Map<UserEntry['id'], UserEntry>()

// temporary hack to store the last user id
let _id: string

export const UserRepo = {
  add: (user: UserEntry): UserEntry => {
    _id = user.id
    cachedMemoryDb.set(user.id, user)
    return user
  },
  findById: (id: string): UserEntry => {
    return cachedMemoryDb.get(_id ?? id)
  },
}

export const db = Array.from(cachedMemoryDb)
