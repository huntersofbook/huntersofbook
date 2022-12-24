import type { ApolloError, ApolloQueryResult, BaseQueryOptions, FetchMoreOptions, FetchMoreQueryOptions, ObservableQuery, OperationVariables, SubscribeToMoreOptions, TypedDocumentNode, WatchQueryOptions } from '@apollo/client'
import type { DocumentNode } from 'graphql'
import type { Ref, VNode } from 'vue'
import type { ReactiveFunction } from '../util/ReactiveFunction'

// Parameters
export type DocumentParameter<TResult, TVariables = undefined> = DocumentNode | Ref<DocumentNode> | ReactiveFunction<DocumentNode> | TypedDocumentNode<TResult, TVariables> | Ref<TypedDocumentNode<TResult, TVariables>> | ReactiveFunction<TypedDocumentNode<TResult, TVariables>>
export type VariablesParameter<TVariables> = TVariables | Ref<TVariables> | ReactiveFunction<TVariables>
export type OptionsParameter<TResult, TVariables> = UseQueryOptions<TResult, TVariables> | Ref<UseQueryOptions<TResult, TVariables>> | ReactiveFunction<UseQueryOptions<TResult, TVariables>>

export interface QueryFunctionOptions<
    TData = any,
    TVariables = OperationVariables,
> extends BaseQueryOptions<TVariables> {
  skip?: boolean
  onCompleted?: (data: TData) => void
  onError?: (error: ApolloError) => void

  // Default WatchQueryOptions for this useQuery, providing initial values for
  // unspecified options, superseding client.defaultOptions.watchQuery (option
  // by option, not whole), but never overriding options previously passed to
  // useQuery (or options added/modified later by other means).
  // TODO What about about default values that are expensive to evaluate?
  defaultOptions?: Partial<WatchQueryOptions<TVariables, TData>>
}

export interface UseQueryOptions<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  TResult = any,
  TVariables = OperationVariables,
> extends Omit<WatchQueryOptions<TVariables>, 'query' | 'variables'> {
  clientId?: string
  enabled?: boolean
  throttle?: number
  debounce?: number
  prefetch?: boolean
}

export interface SubscribeToMoreItem {
  options: any
  unsubscribeFns: (() => void)[]
}

// Return
export interface UseQueryReturn<TResult, TVariables> {
  result: Ref<TResult | undefined>
  loading: Ref<boolean>
  networkStatus: Ref<number | undefined>
  error: Ref<ApolloError | null>
  start: () => void
  stop: () => void
  restart: () => void
  forceDisabled: Ref<boolean>
  document: Ref<DocumentNode>
  variables: Ref<TVariables | undefined>
  options: UseQueryOptions<TResult, TVariables> | Ref<UseQueryOptions<TResult, TVariables>>
  query: Ref<ObservableQuery<TResult, TVariables> | null | undefined>
  refetch: (variables?: TVariables) => Promise<ApolloQueryResult<TResult>> | undefined
  fetchMore: (options: FetchMoreQueryOptions<TVariables, TResult> & FetchMoreOptions<TResult, TVariables>) => Promise<ApolloQueryResult<TResult>> | undefined
  subscribeToMore: <TSubscriptionVariables = OperationVariables, TSubscriptionData = TResult>(options: SubscribeToMoreOptions<TResult, TSubscriptionVariables, TSubscriptionData> | Ref<SubscribeToMoreOptions<TResult, TSubscriptionVariables, TSubscriptionData>> | ReactiveFunction<SubscribeToMoreOptions<TResult, TSubscriptionVariables, TSubscriptionData>>) => void
  onResult: (fn: (param: ApolloQueryResult<TResult>) => void) => {
    off: () => void
  }
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void
  }
  // TODO: called
  //   startPolling: (pollInterval: number)
  //  stopPolling: ()
  // updateQuery
  //   called: Ref<boolean>
  // previousData: Ref<TData | undefined>
  // data: Ref<TData | undefined>
  // observable: Ref<ObservableQuery<TData, TVariables>
  //   client: Ref<ApolloClient<any>>
}
