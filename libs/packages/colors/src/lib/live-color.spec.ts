import { toRGBA } from '..'
import { LiveColor } from './live-color'
import * as c from './utils'

describe('@packages/colors LiveColor', () => {
  it('should return a valid type object', () => {
    const lime = LiveColor.create('#cbff10')
    expect(lime instanceof LiveColor).toBeTruthy()
  })

  it('.hex(withTransparency?)', () => {
    // transparent colors
    const black = LiveColor.create('rgba(0, 0, 0, 0.5)')
    expect(black.hex()).toEqual('#000000')
    expect(black.hex(true)).toEqual('#00000080')

    // opaque colors
    const lime = LiveColor.create('#cbff10')
    expect(lime.hex()).toEqual('#cbff10')
    expect(lime.hex(true)).toEqual('#cbff10')
  })

  it('.rgb()', () => {
    const lime = LiveColor.create('#cbff10')
    expect(lime.rgb()).toEqual('rgb(203, 255, 16)')
  })

  it('.rgba()', () => {
    const lime = LiveColor.create('#cbff10')
    expect(lime.rgba()).toEqual('rgba(203, 255, 16, 1)')
    expect(lime.alpha(0.2).rgba()).toEqual('rgba(203, 255, 16, 0.2)')
  })

  it('.hsl()', () => {
    const lime = LiveColor.create('#cbff10')
    expect(lime.hsl()).toEqual('hsl(73, 100%, 53%)')
  })

  it('.hsla()', () => {
    const lime = LiveColor.create('#cbff10')
    expect(lime.hsla()).toEqual('hsla(73, 100%, 53%, 1)')
  })

  it('.alpha(number?)', () => {
    const lime = LiveColor.create('#cbff10')
    expect(lime.alpha()).toEqual(1)
    expect(lime.alpha(0.5).alpha()).toEqual(0.5)
  })

  it('.extract(type)', () => {
    const lime = LiveColor.create('#cbff10')
    expect(lime.extract('hsl')).toEqual([73.05439330543932, 1, 0.5313725490196078])
    expect(lime.extract('hsla')).toEqual([73.05439330543932, 1, 0.5313725490196078, 1])
    expect(lime.extract('rgb')).toEqual([203, 255, 16])
    expect(lime.extract('rgba')).toEqual([203, 255, 16, 1])
  })

  it('.contrast(color)', () => {
    const white = LiveColor.create('#fff')
    expect(white.contrast('black')).toEqual(21)
    const black = LiveColor.create('#000')
    expect(black.contrast('white')).toEqual(21)
    const lime = LiveColor.create('#cbff10')
    expect(lime.contrast('white')).toEqual(1.1764189105422398)
    expect(lime.contrast('black')).toEqual(17.8507841142409)
    expect(lime.contrast('black')).toEqual(c.getContrast('#cbff10', 'black'))
  })

  it('.mix(color, weight?)', () => {
    // mix with default weight (0.5)
    const instanceMix = LiveColor.create('#fff').mix('#000').rgba()
    const utilMix = c.mix('#fff', '#000', 0.5)
    expect(instanceMix).toEqual(utilMix)

    // mix with custom weight (0.75)
    const red = LiveColor.create('red')
    const white = LiveColor.create('white')
    expect(red.mix(white.hex(), 0.75).rgba()).toEqual(c.mix('red', 'white', 0.75))
  })

  it('.luminance', () => {
    const lime = LiveColor.create('#cbff10')
    expect(lime.luminance).toEqual(0.842539205712045)
  })

  it('.text', () => {
    const lime = LiveColor.create('#cbff10')
    expect(lime.text).toEqual('#000000')
    const darkGray = LiveColor.create('#111')
    expect(darkGray.text).toEqual('#ffffff')
  })
})

describe('@packages/colors LiveColor instances', () => {
  it('should be composable', () => {
    const LIME = '#cbff10'
    const cor = LiveColor.create(LIME)

    const res = cor.darken(0.1).lighten(0.2).rgba()
    const bench = c.rgba(...toRGBA(c.lighten(c.rgba(...toRGBA(c.darken(LIME, 0.1))), 0.2)))

    expect(res).toEqual(bench)
    expect(cor.saturate(0.3).hsla()).toEqual(c.saturate(LIME, 0.3))
    expect(cor.desaturate(0.3).hsla()).toEqual(c.desaturate(LIME, 0.3))
    expect(cor.transparentize(0.3).rgba()).toEqual(c.transparentize(LIME, 0.3))
    expect(cor.alpha(0.3).rgba()).toEqual(c.transparentize(LIME, 0.7))
  })
})
