const RFC4648 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
const RFC4648_HEX = '0123456789ABCDEFGHIJKLMNOPQRSTUV'
const CROCKFORD = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

type Variant = 'RFC3548' | 'RFC4648' | 'RFC4648-HEX' | 'Crockford'

/**
 * Encodes the given buffer into a string using the specified variant of base32 encoding.
 *
 * @param buffer - The buffer to encode.
 * @param variant - The variant of base32 encoding to use. Default is `'RFC4648'`.
 * @param options - Additional options for encoding. Default is `{ padding: true }`.
 * @returns The encoded string.
 * @throws Error if an unknown `base32` variant is provided.
 *
 * Base32 is a binary-to-text encoding scheme that represents binary data in an ASCII string format.
 * This funcion converts binary data into a base32 string.
 *
 * Here's a breakdown of what each part of the code does:
 *
 * 1. Checks if the `padding` option is provided. If it's not, it uses a default padding value.
 * 2. Gets the length of the input buffer in bytes.
 * 3. Creates a new `Uint8Array` view of the input buffer. This is a typed array that represents an array of 8-bit unsigned integers.
 * 4. Iterates over each byte in the buffer. For each byte, it shifts the current value 8 bits to the left
 * and then performs a bitwise OR operation with the current byte. This effectively appends the current byte to the end of the value.
 * 5. Inside the `for` loop, there's a `while` loop that runs as long as there are at least 5 bits in the value.
 * For each iteration, it appends the base32 character corresponding to the 5 most significant bits of the value to the output string,
 * and then removes those 5 bits from the value.
 * 6. If there are any bits left in the value, it appends the base32 character corresponding to those bits
 * to the output string.
 * 7. If the `padding` option is true, it adds padding characters (`=`) to the end of the output string until its length
 * is a multiple of 8.
 * 8. Finally, it returns the output string, which is the base32 representation of the input buffer.
 *
 */
export function encode(
  buffer: ArrayBuffer,
  variant: Variant = 'RFC4648',
  options: Partial<{ padding: boolean }> = {}
): string {
  let alphabet: string
  let defaultPadding: boolean

  switch (variant) {
    case 'RFC3548':
    case 'RFC4648':
      alphabet = RFC4648
      defaultPadding = true
      break
    case 'RFC4648-HEX':
      alphabet = RFC4648_HEX
      defaultPadding = true
      break
    case 'Crockford':
      alphabet = CROCKFORD
      defaultPadding = false
      break
    default:
      throw new Error(`Unknown base32 variant: ${variant as string}`)
  }

  const padding = options.padding === undefined ? defaultPadding : options.padding
  const length = buffer.byteLength

  const view = new Uint8Array(buffer)

  let bits = 0
  let value = 0
  let output = ''

  for (let i = 0; i < length; i++) {
    value = (value << 8) | view[i]
    bits += 8

    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }

  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31]
  }

  if (padding) {
    while (output.length % 8 !== 0) {
      output += '='
    }
  }

  return output
}

function readChar(alphabet: string, char: string): number {
  const idx = alphabet.indexOf(char)

  if (idx === -1) {
    throw new Error('Invalid character found: ' + char)
  }

  return idx
}

export function decode(input: string, variant: Variant = 'RFC4648'): ArrayBuffer {
  let alphabet: string
  let cleanedInput: string

  switch (variant) {
    case 'RFC3548':
    case 'RFC4648':
      alphabet = RFC4648
      cleanedInput = input.toUpperCase().replace(/=+$/, '')
      break
    case 'RFC4648-HEX':
      alphabet = RFC4648_HEX
      cleanedInput = input.toUpperCase().replace(/=+$/, '')
      break
    case 'Crockford':
      alphabet = CROCKFORD
      cleanedInput = input.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1')
      break
    default:
      throw new Error(`Unknown base32 variant: ${variant as string}`)
  }

  const { length } = cleanedInput

  let bits = 0
  let value = 0

  let index = 0
  const output = new Uint8Array(((length * 5) / 8) | 0)

  for (let i = 0; i < length; i++) {
    value = (value << 5) | readChar(alphabet, cleanedInput[i])
    bits += 5

    if (bits >= 8) {
      output[index++] = (value >>> (bits - 8)) & 255
      bits -= 8
    }
  }

  return output.buffer
}

/**
 * Turn a string of hexadecimal characters into an ArrayBuffer
 */
export function hexToArrayBuffer(hex: string): ArrayBuffer {
  if (hex.length % 2 !== 0) {
    throw new RangeError('Expected string to be an even number of characters')
  }

  const view = new Uint8Array(hex.length / 2)

  for (let i = 0; i < hex.length; i += 2) {
    view[i / 2] = parseInt(hex.substring(i, i + 2), 16)
  }

  return view.buffer
}
