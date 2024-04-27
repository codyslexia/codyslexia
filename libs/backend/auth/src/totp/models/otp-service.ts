import { createHmac } from 'crypto'

import { Base32SecretKey } from './authenticator'

export abstract class OTPService {
  private static toHex(base32: Base32SecretKey) {
    const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
    let bits = ''
    let hex = ''
    for (let i = 0; i < base32.length; i++) {
      const val = base32chars.indexOf(base32.charAt(i).toUpperCase())
      bits += (Array(5).fill(0).join('') + val.toString(2)).slice(-5)
    }
    for (let i = 0; i < bits.length - 3; i += 4) {
      const chunk = bits.substring(i, i + 4)
      hex = hex + parseInt(chunk, 2).toString(16)
    }
    return hex
  }

  public static get(secret: Base32SecretKey) {
    // initial string '0000000000000000'
    const charstr = Array(16).fill(0).join('')
    // amount of 30-seconds periods between now and epoch
    const periods = Math.round(new Date().getTime() / 1000) / 30
    // periods to 16-radix string
    const timestr = Math.floor(periods).toString(16)
    // store into a buffer
    const message = Buffer.from(charstr.concat(timestr).slice(-16), 'hex')
    // convert hex secret to base32 and store into a buffer
    const key = Buffer.from(this.toHex(secret), 'hex')

    // generate SH1 HMAC digest from 'key' and 'message' buffers
    const hmac = createHmac('sha1', key)
    // set HMAC instance to 'hex' encoding
    hmac.setEncoding('hex')
    // add the 'message' for the HMAC to digest
    hmac.update(message)
    // close stream
    hmac.end()
    // hash output
    const hash = hmac.read()

    // convert the hash into a 6 digits code
    const slice = parseInt(hash.slice(-1), 16)
    const split = hash.substr(slice * 2, 8)
    const inter = parseInt(split, 16)
    const token = String(inter & 2147483647).slice(-6)

    return token
  }

  public static create(length = 16) {
    const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
    length = length % 2 === 0 ? length : length + 1 // ensure even length
    const secret = []
    for (let i = 0; i < length; i++) {
      secret.push(base32chars.split('')[Math.floor(Math.random() * 32)])
    }
    return secret.join('')
  }

  public static refresh(secret: string) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this

    function update() {
      if (Math.round(new Date().getTime() / 1000) % 30 === 0) {
        // console.log(self.get(secret))
        return self.get(secret)
      }
    }

    setInterval(() => update(), 1000)

    return this.get(secret)
  }
}
