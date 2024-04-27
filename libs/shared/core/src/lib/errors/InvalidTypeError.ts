import { AppError } from './AppError'

/**
 * Used to create typesafe errors when a parameter is of the wrong type.
 *
 * @param name the name of the function or method that was called
 * @param parameter the name of the parameter that was of the wrong type
 * @param expected the type that was expected
 * @param given the type that was given
 *
 * @example
 * const error = new InvalidTypeError('createFile', 'name', 'string', 123)
 * // error.message === "The function or method 'createFile' expected 'name' to be a 'string', but got 'number'."
 */
export class InvalidTypeError extends AppError {
  constructor(
    // the name of the function that was called
    name: string,
    // the name of the parameter that was of the wrong type
    parameter: string,
    // the type that was expected
    expected: string,
    // the type that was given
    given: unknown
  ) {
    super(
      `The function or method '${name}' expected '${parameter}' to be of type '${expected}', but got '${given}'.`
    )
  }

  static assert<T>(
    condition: T,
    name: string,
    parameter: string,
    expected: string,
    given: unknown
  ) {
    if (!condition) {
      throw new InvalidTypeError(name, parameter, expected, given)
    }
    return condition
  }
}
