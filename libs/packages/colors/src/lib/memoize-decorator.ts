/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Memoize decorator
 * @param target
 * @param propertyName
 * @param descriptor
 */
export function memoize(
  target: unknown,
  propertyName: string,
  descriptor: TypedPropertyDescriptor<any>
) {
  if (descriptor.value != null) descriptor.value = memoizer(descriptor.value)
  else if (descriptor.get != null) descriptor.get = memoizer(descriptor.get)
  else throw new Error('Only put a Memoize decorator on a method or get accessor.')
}

const weakMap = new WeakMap<object, Map<string, unknown>>()

let counter = 0

function memoizer(fn: (...args: any[]) => void) {
  const identifier = counter++

  function decorator(this: any, ...args: any[]) {
    let props = weakMap.get(this)

    if (props == null) {
      props = new Map<string, unknown>()
      weakMap.set(this, props)
    }

    let prop = `__hxlx-memoize_${identifier}`

    if (arguments.length > 0) prop += '_' + JSON.stringify(args)

    let result

    if (props.has(prop)) result = props.get(prop)
    else {
      result = fn.apply(this, args)
      props.set(prop, result)
    }

    return result
  }

  return decorator
}
