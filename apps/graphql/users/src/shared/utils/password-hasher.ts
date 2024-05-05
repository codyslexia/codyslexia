import bcrypt from 'bcrypt'

export async function toHash(password: string) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

export async function compare(input: string, password: string) {
  return await bcrypt.compare(input, password)
}
