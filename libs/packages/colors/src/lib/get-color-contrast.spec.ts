import { getColorContrast } from './get-color-contrast'

describe('@packages/colors - getColorContrast', () => {
  it('it should set color to `white` if contrast is too low', () => {
    const res = getColorContrast('#000', '#222')
    expect(res).toEqual('white')
  })

  it('it should set color to `black` if contrast is too low', () => {
    const res = getColorContrast('#fff', '#fafafa')
    expect(res).toEqual('black')
  })
})
