export type { Color } from './lib/types/color'
export { SmartColor } from './lib/smart-color'
export { LiveColor, LiveColorError } from './lib/live-color'

export { addColorAlpha } from './lib/utils'
export { getColorContrast } from './lib/get-color-contrast'
export { parseToRgba as toRGBA } from './lib/parse-to-rgba'
export { parseToHsla as toHSLA } from './lib/parse-to-hsla'
export { rgbaScale, hexScale, alphaScale } from './lib/scale-generators'
