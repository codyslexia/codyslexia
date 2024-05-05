import { ApolloServerErrorCode } from '@apollo/server/errors'
import { GraphQLError } from 'graphql'

export interface FormattedError extends GraphQLError {
  extensions: {
    code: ApolloServerErrorCode
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function formatError(formattedError: FormattedError, error: GraphQLError): FormattedError {
  // Return a different error message
  if (formattedError.extensions.code === ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED) {
    return {
      ...formattedError,
      message: "Your query doesn't match the schema. Try double-checking it!",
    } as FormattedError
  }

  return formattedError
}
