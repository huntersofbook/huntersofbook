import { ApolloError, isApolloError } from '@apollo/client/core'
import type { GraphQLErrors } from '@apollo/client/errors'

export function toApolloError(error: unknown): ApolloError {
  if (!(error instanceof Error)) {
    return new ApolloError({
      networkError: Object.assign(new Error('Network error'), { originalError: error }),
      errorMessage: String(error),
    })
  }

  if (isApolloError(error))
    return error

  return new ApolloError({ networkError: error, errorMessage: error.message })
}

export function resultErrorsToApolloError(errors: GraphQLErrors): ApolloError {
  return new ApolloError({
    graphQLErrors: errors,
    errorMessage: `GraphQL response contains errors: ${errors.map((e: any) => e.message).join(' | ')}`,
  })
}
