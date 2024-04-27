import { SmartColor } from './smart-color'

describe('@packages/colors', () => {
  describe('SmartColor', () => {
    it('should return a valid instance', () => {
      const black = new SmartColor('#000')

      expect(black.hex).toBeDefined()
      expect(black.hsla).toBeDefined()
      expect(black.readable).toBeDefined()
      expect(black.rgb).toBeDefined()
      expect(black.rgba).toBeDefined()
      expect(black.scales).toBeDefined()
      expect(black instanceof SmartColor).toBeTruthy()
    })

    it('should accept named color values', () => {
      const black = new SmartColor('black')
      expect(black.hex()).toEqual('#000000')
      expect(black.rgba()).toEqual('rgba(0, 0, 0, 1)')
      expect(black.rgb()).toEqual('rgb(0, 0, 0)')
      expect(black.hsla()).toEqual('hsla(0, 0%, 0%, 1)')
      expect(black.readable()).toEqual('#ffffff')
    })

    it('should return color string values in hex, rgb, hsla and rgba', () => {
      const hex = '#0070f3'
      const rgba = 'rgba(0, 112, 243, 1)'
      const rgb = 'rgb(0, 112, 243)'
      const blueH = new SmartColor(hex)
      const blueR = new SmartColor(rgba)

      expect(blueH.hex()).toEqual(hex)
      expect(blueH.rgba()).toEqual(rgba)
      expect(blueH.rgb()).toEqual(rgb)
      expect(blueH.scales()).toEqual(blueR.scales())
      expect(blueH.readable()).toEqual(blueR.readable())
      expect(blueH.hsla()).toEqual(blueR.hsla())

      expect(blueR.hex()).toEqual(hex)
      expect(blueR.rgba()).toEqual(rgba)
      expect(blueR.rgb()).toEqual(rgb)
      expect(blueR.scales()).toEqual(blueH.scales())
      expect(blueR.readable()).toEqual(blueH.readable())
      expect(blueR.hsla()).toEqual(blueH.hsla())
    })
  })
})
