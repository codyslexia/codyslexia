import { parseToRgba as toRGBA } from './parse-to-rgba'
import { parseToHsla as toHSLA } from './parse-to-hsla'

interface GeneratorOptions {
  steps?: number
  mode?: 'rgba' | 'hex' | 'alpha'
}

export function* scaleGenerator(
  color: string,
  { steps = 10, mode = 'hex' }: GeneratorOptions = { steps: 10, mode: 'hex' }
) {
  const _steps = clamp(steps, 2, 100)
  const ratio = 1 / _steps

  let subtracted = 1
  while (subtracted - ratio > 0) {
    const alpha = Number((subtracted - ratio).toFixed(2))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [r, g, b, a] = toRGBA(color)

    if (mode === 'alpha') yield rgba(r, g, b, alpha)
    else if (mode === 'rgba') {
      yield rgba(...toRGBA(lighten(color, alpha)))
      yield rgba(...toRGBA(darken(color, alpha)))
    } else {
      yield hex(darken(color, alpha))
      yield hex(lighten(color, alpha))
    }

    subtracted = subtracted - ratio
  }
}

export function isBlackOrWhite(c: string) {
  const hexColor = hex(c)
  return hexColor !== '#000000' && hexColor !== '#ffffff' && hexColor !== 'transparent'
}

export function clamp(x: number, min = 0, max = 1) {
  return x < min ? min : x > max ? max : x
}

export function textColor(bg: string, light: string, dark: string) {
  const color = bg.charAt(0) === '#' ? bg.substring(1, 7) : bg
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? dark : light
}

export function textColorW3C(bg: string, light: string, dark: string) {
  const color = bg.charAt(0) === '#' ? bg.substring(1, 7) : bg
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)
  const uicolors = [r / 255, g / 255, b / 255]
  const c = uicolors.map((col) => {
    if (col <= 0.03928) return col / 12.92
    return Math.pow((col + 0.055) / 1.055, 2.4)
  })
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
  return L > 0.179 ? dark : light
}

/**
 * Takes in hsla parts and constructs an hsla string
 *
 * @param hue The color circle (from 0 to 360) - 0 (or 360) is red, 120 is green, 240 is blue
 * @param saturation Percentage of saturation, given as a decimal between 0 and 1
 * @param lightness Percentage of lightness, given as a decimal between 0 and 1
 * @param alpha Percentage of opacity, given as a decimal between 0 and 1
 */
export function hsla(hue: number, saturation: number, lightness: number, alpha: number): string {
  return `hsla(${(hue % 360).toFixed()}, ${guard(0, 100, saturation * 100).toFixed()}%, ${guard(
    0,
    100,
    lightness * 100
  ).toFixed()}%, ${parseFloat(guard(0, 1, alpha).toFixed(3))})`
}

/**
 * Takes in rgba parts and returns an rgba string
 *
 * @param red The amount of red in the red channel, given in a number between 0 and 255 inclusive
 * @param green The amount of green in the red channel, given in a number between 0 and 255 inclusive
 * @param blue The amount of blue in the red channel, given in a number between 0 and 255 inclusive
 * @param alpha Percentage of opacity, given as a decimal between 0 and 1
 */
export function rgba(red: number, green: number, blue: number, alpha: number): string {
  return `rgba(${guard(0, 255, red).toFixed()}, ${guard(0, 255, green).toFixed()}, ${guard(
    0,
    255,
    blue
  ).toFixed()}, ${parseFloat(guard(0, 1, alpha).toFixed(3))})`
}

/**
 * Takes in any color and returns it as a hex code.
 */
export function hex(color: string): string {
  const [r, g, b, a] = toRGBA(color)

  const hex = (x: number) => {
    const h = guard(0, 255, x).toString(16)
    return h.length === 1 ? `0${h}` : h
  }

  return `#${hex(r)}${hex(g)}${hex(b)}${a < 1 ? hex(Math.round(a * 255)) : ''}`
}

/**
 * Darkens using lightness. This is equivalent to subtracting the lightness
 * from the L in HSL.
 *
 * @param amount The amount to darken, given as a decimal between 0 and 1
 */
export function darken(color: string, amount: number): string {
  const [hue, saturation, lightness, alpha] = toHSLA(color)
  return hsla(hue, saturation, lightness - amount, alpha)
}

/**
 * Lightens a color by a given amount. This is equivalent to
 * `darken(color, -amount)`
 *
 * @param amount The amount to darken, given as a decimal between 0 and 1
 */
export function lighten(color: string, amount: number): string {
  return darken(color, -amount)
}

/**
 * Desaturates the input color by the given amount via subtracting from the `s`
 * in `hsla`.
 *
 * @param amount The amount to desaturate, given as a decimal between 0 and 1
 */
export function desaturate(color: string, amount: number): string {
  const [h, s, l, a] = toHSLA(color)
  return hsla(h, s - amount, l, a)
}

/**
 * Saturates a color by converting it to `hsl` and increasing the saturation
 * amount. Equivalent to `desaturate(color, -amount)`
 *
 * @param color Input color
 * @param amount The amount to darken, given as a decimal between 0 and 1
 */
export function saturate(color: string, amount: number): string {
  return desaturate(color, -amount)
}

/**
 * Takes in a color and makes it more transparent by convert to `rgba` and
 * decreasing the amount in the alpha channel.
 *
 * @param amount The amount to increase the transparency by, given as a decimal between 0 and 1
 */
export function transparentize(color: string, amount: number): string {
  const [r, g, b, a] = toRGBA(color)
  return rgba(r, g, b, a - amount)
}

/**
 * Returns a number (float) representing the luminance of a color.
 */
export function getLuminance(color: string): number {
  if (color === 'transparent') return 0

  function f(x: number) {
    const channel = x / 255
    return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4)
  }

  const [r, g, b] = toRGBA(color)
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

/**
 * Returns the contrast ratio between two colors based on
 * [W3's recommended equation for calculating contrast](http://www.w3.org/TR/WCAG20/#contrast-ratiodef).
 */
export function getContrast(color1: string, color2: string): number {
  const luminance1 = getLuminance(color1)
  const luminance2 = getLuminance(color2)

  return luminance1 > luminance2
    ? (luminance1 + 0.05) / (luminance2 + 0.05)
    : (luminance2 + 0.05) / (luminance1 + 0.05)
}

/**
 * Mixes two colors together. Taken from sass's implementation.
 */
export function mix(color1: string, color2: string, weight: number): string {
  const normalize = (n: number, index: number) => (index === 3 ? n : n / 255)

  const [r1, g1, b1, a1] = toRGBA(color1).map(normalize)
  const [r2, g2, b2, a2] = toRGBA(color2).map(normalize)

  /** @see http://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method */
  const alphaDelta = a2 - a1
  const normalizedWeight = weight * 2 - 1
  const combinedWeight =
    normalizedWeight * alphaDelta === -1
      ? normalizedWeight
      : normalizedWeight + alphaDelta / (1 + normalizedWeight * alphaDelta)
  const weight2 = (combinedWeight + 1) / 2
  const weight1 = 1 - weight2

  const r = (r1 * weight1 + r2 * weight2) * 255
  const g = (g1 * weight1 + g2 * weight2) * 255
  const b = (b1 * weight1 + b2 * weight2) * 255
  const a = a2 * weight + a1 * (1 - weight)

  return rgba(r, g, b, a)
}

export default mix

/**
 * Returns black or white for best contrast depending on the luminosity of the
 * given color.
 */
export function readableColor(color: string): string {
  return readableColorIsBlack(color) ? '#000' : '#fff'
}

/**
 * An alternative function to `readableColor`. Returns whether or not the
 * readable color (i.e. the color to be place on top the input color) should be
 * black.
 */
export function readableColorIsBlack(color: string): boolean {
  return getLuminance(color) > 0.179
}

/**
 * A simple guard function:
 *
 * ```js
 * Math.min(Math.max(low, value), high)
 * ```
 */
export function guard(low: number, high: number, value: number): number {
  return Math.min(Math.max(low, value), high)
}

/**
 * Check whether a string is a valid hex string.
 *
 * @example
 * ```js
 * const valid = isHex('#000') // → true
 * const valid = isHex('banana') // → false
 * ```
 */
export function isHex(a: string) {
  return /^#(?:[A-Fa-f0-9]{3}){1,2}$/.test(a)
}

/**
 * Copy data to clipboard on the server.
 *
 * @example
 * ```js
 * const black = ThemeColor.create('#cbff10')
 * pbcopy(JSON.stringify(black.scale(50)))
 * ```
 */
// export function pbcopy(data: string | Buffer) {
//   var proc = require('child_process').spawn('pbcopy')
//   proc.stdin.write(data)
//   proc.stdin.end()
// }

/**
 * Convert an rgba string value to a hex value with alpha blending.
 *
 * @example
 * ```js
 * const hexColor = toHex('rgba(240,246,252,0.1)')
 * // → #f0f6fc19
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toHex(orig: any) {
  let a
  const rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i)
  const alpha = ((rgb && rgb[4]) || '').trim()
  let hex = rgb
    ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
      (rgb[2] | (1 << 8)).toString(16).slice(1) +
      (rgb[3] | (1 << 8)).toString(16).slice(1)
    : orig

  if (alpha !== '') a = alpha
  else a = 0o1

  // multiply before convert to HEX
  a = ((a * 255) | (1 << 8)).toString(16).slice(1)
  hex = hex + a

  return hex
}

export const addColorAlpha = (color: string, alpha: number) => {
  if (!/^#|rgb|RGB/.test(color)) return color
  const [r, g, b] = toRGBA(color)
  const safeAlpha = alpha > 1 ? 1 : alpha < 0 ? 0 : alpha
  return `rgba(${r}, ${g}, ${b}, ${safeAlpha})`
}
