export class Result<T> {
  public readonly success: boolean
  public readonly value: T | undefined
  public readonly error?: T | string | undefined | null

  public constructor(success: boolean, error?: T | string | null, value?: T) {
    if (success && error) {
      throw new Error('InvalidOperation: A result cannot be successful and contain an error')
    }

    if (!success && !error) {
      throw new Error('InvalidOperation: A failing result needs to contain an error message')
    }
    this.success = success
    this.value = value
    this.error = error
    Object.freeze(this)
  }

  public or<O>(other?: O): T | O {
    if (!this.success) return other as O
    return this.value as T
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, null, value)
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error)
  }

  public static combine(results: Result<any>[]): Result<any> {
    for (const result of results) if (!result.success) return result
    return Result.ok()
  }
}
