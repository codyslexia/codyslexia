export type ReverseMap<A extends Record<keyof A, keyof any>> = {
  [P in A[keyof A]]: {
    [K in keyof A]: A[K] extends P ? K : never
  }[keyof A]
}

export type Reverse<T> = { [V in T[keyof T] & keyof T]: keyof T }

export const swap = <A extends Record<any, any>>(o: A) =>
  Object.entries(o).reduce(
    (result, [key, value]) => ({ ...result, [value]: key }),
    {}
  ) as ReverseMap<A>
