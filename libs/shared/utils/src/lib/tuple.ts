/**
 * Creates a tuple from the provided arguments.
 * @param args The elements of the tuple.
 * @returns The tuple containing the provided elements.
 */
export const tuple = <T extends string[]>(...args: T) => args

/**
 * Creates a tuple from the provided arguments.
 *
 * @param args The arguments to be included in the tuple.
 * @returns A tuple containing the provided arguments.
 */
export const tupleNumber = <T extends number[]>(...args: T) => args
