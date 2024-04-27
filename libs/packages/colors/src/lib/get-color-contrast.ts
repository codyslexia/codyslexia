import { parseToRgba as toRGBA } from './parse-to-rgba'

export function getColorContrast(bgColor: string, textColor?: string) {
  const [r, g, b, alpha] = toRGBA(bgColor)
  const perceived = r * 299 + g * 587 + b * 114
  const brightness = Math.round(perceived / 1000)

  let difference = 0

  if (textColor) {
    const [r2, g2, b2] = toRGBA(textColor)
    difference =
      Math.max(r, r2) -
      Math.min(r, r2) +
      (Math.max(g, g2) - Math.min(g, g2)) +
      (Math.max(b, b2) - Math.min(b, b2))
  }

  const shouldInvert = brightness > 150 || alpha < 0.8 || difference > 500

  return shouldInvert ? 'black' : 'white'
}
