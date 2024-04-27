import { SmartColor } from './smart-color'
import { alphaScale, hexScale, rgbaScale } from './scale-generators'

describe('@packages/colors', () => {
  describe('ColorScale', () => {
    it('should return a valid instance', () => {
      const black = new SmartColor('black')
      expect(black).toEqual(black)
    })

    it('scale creator functions should work with SmartColor instances', () => {
      const black = new SmartColor('black')
      const blue = new SmartColor('#0070f3')

      const hex = hexScale(black.hex())
      expect(hex.length).toEqual(10)
      const hexC = hexScale(blue.hex())
      expect(hexC.length).toEqual(10)

      const rgba = rgbaScale(black.hex())
      expect(rgba.length).toEqual(10)
      const rgbaC = rgbaScale(blue.hex())
      expect(rgbaC.length).toEqual(10)

      const alpha = alphaScale(black.hex())
      expect(alpha.length).toEqual(10)
      const alphaC = alphaScale(blue.hex())
      expect(alphaC.length).toEqual(10)
    })
  })
})
