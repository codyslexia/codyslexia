import { EOL } from 'os'
import { AppError } from './AppError'

/**
 * The `ResolutionError` is thrown when a module cannot be resolved.
 *
 * @example
 * const error = new ResolutionError('testModule', ['moduleA', 'moduleB'])
 */
export class ResolutionError extends AppError {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static assert(arg0: boolean, name: string, parameter: string, expected: string, given: number) {
    throw new Error('Method not implemented.')
  }
  // takes the registered modules and unresolved tokens to create a message
  constructor(
    // the name of the module that could not be resolved
    name: string | symbol,

    // the stack of modules that were attempted to resolve the module
    resolutionStack: Array<string | symbol>,

    // an optional message to append to the error
    message?: string
  ) {
    // convert the name to a string if it is a symbol
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof name === 'symbol') name = (name as any).toString()

    // convert all resolution stack symbols to strings
    resolutionStack = resolutionStack.map((val) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      typeof val === 'symbol' ? (val as any).toString() : val
    )

    // add the name of the module that could not be resolved to the resolution stack
    resolutionStack.push(name)

    // convert the resolution stack to a string
    const resolutionPathString = resolutionStack.join(' -> ')

    // create the error message
    let msg = `Could not resolve '${String(name)}'.`

    // add the optional message
    if (message) msg += ` ${message}`

    // add the resolution path
    msg += EOL + EOL
    msg += `Resolution path: ${resolutionPathString}`

    // create the error
    super(msg)
  }
}
