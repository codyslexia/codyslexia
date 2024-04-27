import { randomInt } from 'crypto'

const alphabet = 'abcdefghijklmnopqrstuvwxyz'
const digits = '0123456789'
const lowercase = alphabet
const uppercase = alphabet.toUpperCase()
const special = '#!&@'

export const generateOTP = (length = 6) => {
  const chars = digits + lowercase + uppercase + special
  let otp = ''
  while (otp.length < length) {
    const index = randomInt(0, chars.length)
    otp += chars[index]
  }
  return otp
}
