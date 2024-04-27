/* eslint-disable @typescript-eslint/no-unused-vars */
import * as http from 'http'
import * as crypto from 'crypto'

import { Base32SecretKey } from '../models/authenticator'

function base32tohex(base32: Base32SecretKey) {
  const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  let bits = ''
  let hex = ''
  for (let i = 0; i < base32.length; i++) {
    const val = base32chars.indexOf(base32.charAt(i).toUpperCase())
    bits += (Array(5).fill(0).join('') + val.toString(2)).slice(-5)
  }
  for (let i = 0; i < bits.length - 3; i += 4) {
    const chunk = bits.substr(i, 4)
    hex = hex + parseInt(chunk, 2).toString(16)
  }
  return hex
}

/**
 * Calculate TOTP for the given secret
 * (we store the buffer and secret into the buffer because the crypto hmac function requires buffer inputs)
 */
function getOTP(secret: Base32SecretKey) {
  const charstr = Array(16).fill(0).join('') // '0000000000000000'
  const periods = Math.round(new Date().getTime() / 1000) / 30 // amount of 30-seconds periods between now and epoch
  const timestr = Math.floor(periods).toString(16) //
  const buffer = Buffer.from(charstr.concat(timestr).slice(-16), 'hex')

  // encode the secret from base-32 to hex place it into a buffer and store it as the variable "key".
  const key = Buffer.from(base32tohex(secret), 'hex')

  // use crypto to obtain an SH1 HMAC digest from the key and buffer and create HMAC instances
  const hmac = crypto.createHmac('sha1', key)

  // instruct the HMAC instance that buffer is hex encoded, add buffer and seal it
  hmac.setEncoding('hex')
  hmac.update(buffer)
  hmac.end()

  // the SH1 HMAC output
  const hash = hmac.read()

  // bitwise operations to convert the SH1 HMAC output into a 6 digits code
  const slice = parseInt(hash.slice(-1), 16)
  const split = hash.substr(slice * 2, 8)
  const inter = parseInt(split, 16)
  const token = String(inter & 2147483647).slice(-6)

  return token
}

/**
 * Generate a random base-32 secret
 */
function randomBase32(length: number) {
  const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  length = length % 2 === 0 ? length : length + 1 // ensure even length
  const secret = []

  for (let i = 0; i < length; i++) {
    secret.push(base32chars.split('')[Math.floor(Math.random() * 32)])
  }

  return secret.join('')
}

/**
 * Using the Google chart API to generate a QR code containing the secret
 */
const secret = randomBase32(16)
const issuer = 'Codyslexia: '
const account = 'example@codyslexia.com'
const size = '300x300'
const chartsURL = `https://chart.googleapis.com/chart?chs=${size}&chld=M|0&cht=qr&chl=otpauth://totp/${issuer}@${account}%3Fsecret%3D${secret}`

/**
 * Display in console the 6 digits code every time it changes
 */
console.log('Your random secret is: ' + secret)

function refreshOTP() {
  if (Math.round(new Date().getTime() / 1000) % 30 === 0) {
    console.log(getOTP(secret))
  }
}
setInterval(() => refreshOTP(), 1000)

/**
 * Display the QR code in browser at http://localhost:3000
 */
const server = http.createServer((req, res) => {
  res.writeHead(301, {
    'Cache-Control': 'no-cache', // prevent to reload old QR code when re-running
    Location: chartsURL,
  })
  res.end()
})

// server.listen(3000)

// console.log('Open in your browser http://localhost:3000')
// console.log(getOTP(secret))
