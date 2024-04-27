import { parseToRgba as toRGBA } from './parse-to-rgba'
import { parseToHsla as toHSLA } from './parse-to-hsla'

import * as c from './utils'

export const unique = <A>(...args: A[]) => Array.from(new Set([...args]))
export const toArray = <A extends string>(g: Generator<A, void, unknown>) =>
  Array.from(new Set(Array.from(g)))

export const isBlackOrWhite = (color: string) =>
  c.hex(color) === '#000000' || c.hex(color) === '#ffffff'

interface ScaleOptions {
  steps?: number
}

/**
 * Generate an array HEX color tones with 2 to 100 variatons
 * of any arbitrary color string, sorted from light to dark.
 *
 * @example
 * ```js
 * const scale = hexScale('rgba(0,0,0,1)')
 * console.log(scale) // ['#111', '#222', '#333', ...etc]
 * ```
 */
export function hexScale<C extends string>(color: C, { steps = 10 }: ScaleOptions = { steps: 10 }) {
  const shouldFilter = !isBlackOrWhite(color)

  return toArray(c.scaleGenerator(color, { steps }))
    .filter((cor) => (shouldFilter ? c.isBlackOrWhite(cor) : cor))
    .sort()
    .reverse()
}

/**
 * Generate an array RGBA color tones with 2 to 100 variatons
 * from any arbitrary color string, sorted from light to dark.
 *
 * @example
 * ```js
 * const scale = rgbaScale('#000')
 * console.log(scale) // ['rgba(77, 77, 77, 1)', 'rgba(55, 55, 55, 1)' ...etc]
 * ```
 */
export function rgbaScale<C extends string>(
  color: C,
  { steps = 10 }: ScaleOptions = { steps: 10 }
) {
  steps = c.clamp(isBlackOrWhite(color) ? steps + 1 : steps, 2, 100)

  const rgbaScale = toArray(
    c.scaleGenerator(color, {
      steps,
      mode: 'rgba',
    })
  ).filter(c.isBlackOrWhite)

  // sort rgba colors by luminance
  const sorted = rgbaScale
    // convert to HSL and keep track of original indices
    .map((c, i) => ({ color: toHSLA(c), index: i }))
    // sort by luminance (lighter → darker)
    .sort((c1, c2) => c2.color[2] - c1.color[2])
    // orderly map over opaque scale
    .map((data) => rgbaScale[data.index])

  return sorted
}

/**
 * Generate an array of HSLA color strings with 2 to 100 variatons of transparency
 * from any arbitrary color string, sorted by luminance from light to dark.
 *
 * @example
 * ```js
 * const scale = rgbaScale('#000')
 * console.log(scale) // ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.2)' ...etc]
 * ```
 */
export function alphaScale<C extends string>(
  color: C,
  { steps = 10 }: ScaleOptions = { steps: 10 }
) {
  const rgbaColor = c.rgba(...toRGBA(color))

  const alpha = toArray(
    c.scaleGenerator(color, {
      steps,
      mode: 'alpha',
    })
  ).filter(isTransparentColor)

  return [rgbaColor, ...alpha].sort()
}

function isTransparentColor<C extends string>(c: C) {
  return (
    c
      .split(')')
      .join('')
      .charAt(c.length - 2) !== '0'
  )
}
