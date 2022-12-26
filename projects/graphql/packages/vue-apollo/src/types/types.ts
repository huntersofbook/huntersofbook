import type { ApolloClient, ApolloError, ApolloQueryResult, DefaultContext, ObservableQuery, OperationVariables, TypedDocumentNode, WatchQueryOptions } from '@apollo/client/index.js'
import type { DocumentNode } from 'graphql'
import type { Ref, VNode } from 'vue'
import type { ReactiveFunction } from '../util/ReactiveFunction'

// Parameters
export type DocumentParameter<TResult, TVariables = undefined> = DocumentNode | Ref<DocumentNode> | ReactiveFunction<DocumentNode> | TypedDocumentNode<TResult, TVariables> | Ref<TypedDocumentNode<TResult, TVariables>> | ReactiveFunction<TypedDocumentNode<TResult, TVariables>>
export type VariablesParameter<TVariables> = TVariables | Ref<TVariables> | ReactiveFunction<TVariables>
export type OptionsParameter<TResult, TVariables> = UseQueryOptions<TResult, TVariables> | Ref<UseQueryOptions<TResult, TVariables>> | ReactiveFunction<UseQueryOptions<TResult, TVariables>>

export interface BaseQueryOptions<TVariables = OperationVariables>
  extends Omit<WatchQueryOptions<TVariables>, 'query'> {
  ssr?: boolean
  client?: ApolloClient<any>
  context?: DefaultContext
}

export interface QueryFunctionOptions<
  TData = any,
  TVariables = OperationVariables,
> extends BaseQueryOptions<TVariables> {
  skip?: boolean
  onCompleted?: (data: TData) => void
  onError?: (error: ApolloError) => void

  clientId?: string
  enabled?: boolean
  throttle?: number
  debounce?: number
  prefetch?: boolean

  // Default WatchQueryOptions for this useQuery, providing initial values for
  // unspecified options, superseding client.defaultOptions.watchQuery (option
  // by option, not whole), but never overriding options previously passed to
  // useQuery (or options added/modified later by other means).
  // TODO What about about default values that are expensive to evaluate?
  defaultOptions?: Partial<WatchQueryOptions<TVariables, TData>>
}

export interface UseQueryOptions<TData = any, TVariables = OperationVariables>
  extends QueryFunctionOptions<TData, TVariables> {
  query?: DocumentNode | TypedDocumentNode<TData, TVariables>
}

export interface SubscribeToMoreItem {
  options: any
  unsubscribeFns: (() => void)[]
}

export type ObservableQueryFields<TData, TVariables> = Pick<
  ObservableQuery<TData, TVariables>,
  | 'startPolling'
  | 'stopPolling'
  | 'subscribeToMore'
  | 'updateQuery'
  | 'refetch'
  | 'reobserve'
  | 'fetchMore'
>

// Return
export interface UseQueryReturn<TResult, TVariables> extends ObservableQueryFields<TResult, TVariables> {
  result: Ref<ApolloQueryResult<TResult> | undefined>
  loading: Ref<boolean>
  networkStatus: Ref<number | undefined>
  error: Ref<ApolloError | null>
  client: ApolloClient<any>
  start: () => void
  stop: () => void
  restart?: () => void
  forceDisabled: Ref<boolean>
  document: Ref<DocumentNode>
  variables: Ref<TVariables | undefined>
  options: UseQueryOptions<TResult, TVariables> | Ref<UseQueryOptions<TResult, TVariables>>
  observable: Ref<ObservableQuery<TResult, TVariables> | null | undefined>
  onResult: (fn: (param: ApolloQueryResult<TResult>) => void) => {
    off: () => void
  }
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void
  }
  previousResult: Ref<TResult | undefined>
  // TODO: called
  // updateQuery
  //   called: Ref<boolean>
  // data: Ref<TData | undefined>
}

export interface QueryHookOptions<TData = any, TVariables = OperationVariables>
  extends QueryFunctionOptions<TData, TVariables> {
  query?: DocumentNode | TypedDocumentNode<TData, TVariables>
}

export interface QueryDataOptions<TData = any, TVariables = OperationVariables>
  extends QueryFunctionOptions<TData, TVariables> {
  children?: (result: UseQueryReturn<TData, TVariables>) => VNode
  query: DocumentNode | TypedDocumentNode<TData, TVariables>
}
