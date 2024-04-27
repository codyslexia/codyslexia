import 'reflect-metadata'
import * as c from './utils'
import { memoize } from './memoize-decorator'
import { parseToRgba as toRGBA } from './parse-to-rgba'
import { parseToHsla as toHSLA } from './parse-to-hsla'
import { hexScale, rgbaScale, alphaScale } from './scale-generators'

export type ColorMeta = [number, number, number, number]

export const createSmartColor = <C extends string>(color: C) => new SmartColor(color)

interface ScalesMethodOptions {
  transparent?: boolean
}

export class SmartColor<C extends string> {
  private readonly _rgba: ColorMeta
  private readonly _hsla: ColorMeta
  private readonly _hex: C | string

  constructor(color: C) {
    this._rgba = toRGBA(color)
    this._hsla = toHSLA(color)
    this._hex = c.hex(color)
  }

  public static create<C extends string>(color: C) {
    return new SmartColor(color)
  }

  @memoize
  rgba(alpha?: number) {
    const [r, g, b, a] = this._rgba
    return c.rgba(r, g, b, alpha ?? a)
  }

  @memoize
  hsla() {
    return c.hsla(...this._hsla)
  }

  @memoize
  rgb() {
    const [r, g, b] = this._rgba
    return `rgb(${r}, ${g}, ${b})`
  }

  @memoize
  hex() {
    return this._hex
  }

  @memoize
  readable(fg?: string, bg?: string) {
    return c.textColorW3C(this._hex, fg ?? '#ffffff', bg ?? '#000000')
  }

  @memoize
  scales({ transparent }: ScalesMethodOptions = { transparent: true }) {
    return {
      hex: hexScale(this._hex),
      rgba: transparent ? alphaScale(this._hex) : rgbaScale(this._hex),
    }
  }
}
