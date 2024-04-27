import { parseToRgba as toRGBA } from './parse-to-rgba'
import { parseToHsla as toHSLA } from './parse-to-hsla'

import * as c from './utils'

export type ColorFormat = 'rgb' | 'rgba' | 'hsl' | 'hsla'
export type ColorMeta = [number, number, number] | [number, number, number, number]

export class LiveColorError extends Error {
  constructor(color: string) {
    super(`[hoxlux/colors]: Failed to parse color: "${color}"`)
  }
}

interface LiveColorProps {
  red: number
  green: number
  blue: number
  hue: number
  saturation: number
  lightness: number
  alpha: number
}

export class LiveColor {
  private readonly props: LiveColorProps

  private constructor(props: LiveColorProps) {
    this.props = {
      red: c.clamp(props.red, 0, 255),
      green: c.clamp(props.green, 0, 255),
      blue: c.clamp(props.blue, 0, 255),
      hue: c.clamp(props.hue, 0, 100),
      saturation: c.clamp(props.saturation, 0, 1),
      lightness: c.clamp(props.lightness, 0, 1),
      alpha: c.clamp(props.alpha, 0, 1),
    }
  }

  static create<C extends string>(color: C) {
    const [red, green, blue, alpha] = toRGBA(color)
    const [hue, saturation, lightness] = toHSLA(color)

    return new LiveColor({
      red,
      green,
      blue,
      hue,
      saturation,
      lightness,
      alpha,
    })
  }

  darken(amount = 0.5) {
    const transformed = new LiveColor({
      ...this.props,
      lightness: this.props.lightness - c.clamp(amount),
    })
    return LiveColor.create(transformed.hsla())
  }

  lighten(amount = 0.5) {
    const transformed = new LiveColor({
      ...this.props,
      lightness: this.props.lightness + c.clamp(amount),
    })
    return LiveColor.create(transformed.hsla())
  }

  desaturate(amount = 0.5) {
    const transformed = new LiveColor({
      ...this.props,
      saturation: this.props.saturation - c.clamp(amount),
    })
    return LiveColor.create(transformed.hsla())
  }

  saturate(amount = 0.5) {
    const transformed = new LiveColor({
      ...this.props,
      saturation: this.props.saturation + c.clamp(amount),
    })
    return LiveColor.create(transformed.hsla())
  }

  transparentize(amount = 0.5) {
    const transformed = new LiveColor({
      ...this.props,
      alpha: this.props.alpha - c.clamp(amount),
    })
    return LiveColor.create(transformed.rgba())
  }

  opacify(amount = 0.5) {
    const transformed = new LiveColor({
      ...this.props,
      alpha: this.props.alpha + c.clamp(amount),
    })
    return LiveColor.create(transformed.rgba())
  }

  alpha(): number
  alpha(a: number): LiveColor
  alpha(a?: number): number | LiveColor {
    if (a === undefined) return this.props.alpha
    const transformed = new LiveColor({
      ...this.props,
      alpha: c.clamp(a),
    })
    return LiveColor.create(transformed.rgba())
  }

  /**
   * [See Original SASS method](http://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method)
   */
  mix(color: string, weight = 0.5) {
    const normalize = (n: number, index: number) => (index === 3 ? n : n / 255)

    const [r1, g1, b1, a1] = [
      this.props.red,
      this.props.green,
      this.props.blue,
      this.props.alpha,
    ].map(normalize)

    const [r2, g2, b2, a2] = toRGBA(color).map(normalize)

    const delta = a2 - a1
    const normalized = weight * 2 - 1
    const combined =
      normalized * delta === -1 ? normalized : normalized + delta / (1 + normalized * delta)
    const weight2 = (combined + 1) / 2
    const weight1 = 1 - weight2
    const red = (r1 * weight1 + r2 * weight2) * 255
    const green = (g1 * weight1 + g2 * weight2) * 255
    const blue = (b1 * weight1 + b2 * weight2) * 255
    const alpha = a2 * weight + a1 * (1 - weight)

    const mixed = new LiveColor({ ...this.props, red, green, blue, alpha }).rgba()
    const [hue, saturation, lightness] = toHSLA(mixed)

    return new LiveColor({ hue, saturation, lightness, red, green, blue, alpha })
  }

  extract(): LiveColor
  extract(format: ColorFormat): ColorMeta
  extract(format?: ColorFormat): LiveColor | ColorMeta
  extract(format: ColorFormat = 'rgb') {
    const p = this.props
    switch (format) {
      case 'rgb':
        return [p.red, p.green, p.blue]
      case 'rgba':
        return [p.red, p.green, p.blue, p.alpha]
      case 'hsl':
        return [p.hue, p.saturation, p.lightness]
      case 'hsla':
        return [p.hue, p.saturation, p.lightness, p.alpha]
      default:
        return new LiveColor(this.props)
    }
  }

  // outputs
  hex(withTransparency = false) {
    const hexTransparent = `#${toHexa(this.props.red)}${toHexa(this.props.green)}${toHexa(
      this.props.blue
    )}${this.props.alpha < 1 ? toHexa(Math.round(this.props.alpha * 255)) : ''}`
    return withTransparency ? hexTransparent : hexTransparent.slice(0, 7).trim()
  }

  rgb() {
    return `rgb(${this.props.red.toFixed()}, ${this.props.green.toFixed()}, ${this.props.blue.toFixed()})`
  }

  rgba() {
    return `rgba(${this.props.red.toFixed()}, ${this.props.green.toFixed()}, ${this.props.blue.toFixed()}, ${parseFloat(
      this.props.alpha.toFixed(3)
    )})`
  }

  hsl() {
    return `hsl(${(this.props.hue % 360).toFixed()}, ${(
      this.props.saturation * 100
    ).toFixed()}%, ${parseFloat((this.props.lightness * 100).toFixed())}%)`
  }

  hsla() {
    return `hsla(${(this.props.hue % 360).toFixed()}, ${(
      this.props.saturation * 100
    ).toFixed()}%, ${(this.props.lightness * 100).toFixed()}%, ${parseFloat(
      this.props.alpha.toFixed(3)
    )})`
  }

  contrast(color: string) {
    const other = LiveColor.create(color)
    return this.luminance > other.luminance
      ? (this.luminance + 0.05) / (other.luminance + 0.05)
      : (other.luminance + 0.05) / (this.luminance + 0.05)
  }

  get luminance() {
    function f(x: number) {
      const channel = x / 255
      return channel <= 0.03928 ? channel / 12.92 : Math.pow((channel + 0.055) / 1.055, 2.4)
    }

    return 0.2126 * f(this.props.red) + 0.7152 * f(this.props.green) + 0.0722 * f(this.props.blue)
  }

  get text() {
    return this.luminance > 0.179 ? '#000000' : '#ffffff'
  }
}

// memoizable
function toHexa(x: number) {
  const h = c.clamp(x, 0, 255).toString(16)
  return h.length === 1 ? `0${h}` : h
}

export default LiveColor
