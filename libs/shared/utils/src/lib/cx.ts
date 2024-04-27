/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

type Arguments =
  | string
  | boolean
  | null
  | undefined
  | { [key: PropertyKey]: unknown }
  | Array<unknown>
  | ((...args: unknown[]) => unknown)
  | (() => unknown)

function toValue(mix: Arguments) {
  let k
  let y
  let str = ''

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix
  } else if (typeof mix === 'object') {
    if (Array.isArray(mix)) {
      for (k = 0; k < mix.length; k++) {
        if (mix[k]) {
          if ((y = toValue(mix[k] as Arguments))) {
            str && (str += ' ')
            str += y
          }
        }
      }
    } else {
      for (k in mix) {
        if (mix?.[k]) {
          str && (str += ' ')
          str += k
        }
      }
    }
  }

  return str
}

/**
 * A simple utility for conditionally joining classNames together.
 * @param args
 * @returns string
 *
 * @example
 * cx('foo', 'bar'); // => 'foo bar'
 */
export function cx(...args: Arguments[]) {
  let i = 0
  let tmp
  let x
  let str = ''

  while (i < args.length) {
    if ((tmp = args[i++])) {
      if ((x = toValue(tmp))) {
        str && (str += ' ')
        str += x
      }
    }
  }
  return str
}

export default cx
