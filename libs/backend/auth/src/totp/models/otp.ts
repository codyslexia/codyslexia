export interface OTPOptions {
  [key: string]: unknown
}

export class OTP<T extends OTPOptions = OTPOptions> {
  protected _defaultOptions: Readonly<Partial<T>>
  protected _options: Readonly<Partial<T>>

  public constructor(defaultOptions: Partial<T> = {}) {
    this._defaultOptions = Object.freeze({ ...defaultOptions })
    this._options = Object.freeze({})
  }

  public create(defaultOptions: Partial<T> = {}): OTP<T> {
    return new OTP<T>(defaultOptions)
  }

  public clone(defaultOptions: Partial<T> = {}): ReturnType<this['create']> {
    const instance = this.create({
      ...this._defaultOptions,
      ...defaultOptions,
    })
    instance.options = this._options
    return instance as ReturnType<this['create']>
  }

  public get options(): Partial<T> {
    return Object.freeze({
      ...this._defaultOptions,
      ...this._options,
    })
  }

  public set options(options: Partial<T>) {
    this._options = Object.freeze({
      ...this._options,
      ...options,
    })
  }

  public allOptions(): Readonly<T> {
    return this.options as Readonly<T>
  }

  public resetOptions(): void {
    this._options = Object.freeze({})
  }
}
