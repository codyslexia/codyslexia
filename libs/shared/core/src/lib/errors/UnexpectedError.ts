import { AppError } from './AppError'
import { HttpStatus } from '../enums'

/**
 * Exception for *Unexpected* type errors.
 */
export class UnexpectedError extends AppError {
  public status = HttpStatus.INTERNAL_SERVER_ERROR
  public statusText = 'Unexpected Error'
  public isOperational = false

  constructor(public message = 'Unexpected Error') {
    super(message)
    Object.setPrototypeOf(this, UnexpectedError.prototype)
  }

  serialize() {
    return [{ status: this.status, message: 'Unexpected Error' }]
  }
}
