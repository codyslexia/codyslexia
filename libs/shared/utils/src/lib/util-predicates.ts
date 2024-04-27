/**
 * Copyright (c) 2023-2024 Codyslexia
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */

export const isNull = (x: any): x is null => x === null
export const isUndefined = (x: any): x is undefined => typeof x === 'undefined'
export const isNil = (x: any): x is null | undefined => isUndefined(x) || isNull(x)
export const isEmpty = (x: any): boolean => !(x && x.length > 0)
export const isObject = (o: any): o is object => !isNil(o) && typeof o === 'object'
export const isFunction = (x: any): x is Function => typeof x === 'function'
export const isString = (x: any): x is string => typeof x === 'string'
export const isNumber = (x: any): x is number => typeof x === 'number'
export const isSymbol = (x: any): x is symbol => typeof x === 'symbol'
export const isConstructor = (fn: any): fn is FunctionConstructor =>
  !!fn.prototype && !!fn.prototype.constructor.name

export const isPlainObject = (x: any): x is object => {
  if (!isObject(x)) return false
  const proto = Object.getPrototypeOf(x)
  if (proto === null) return true
  const ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor') && proto.constructor

  return (
    typeof ctor === 'function' &&
    ctor instanceof ctor &&
    Function.prototype.toString.call(ctor) === Function.prototype.toString.call(Object)
  )
}
