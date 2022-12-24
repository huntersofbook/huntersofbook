import type { ApolloError, ApolloQueryResult, BaseQueryOptions, FetchMoreOptions, FetchMoreQueryOptions, OperationVariables, SubscribeToMoreOptions, TypedDocumentNode, WatchQueryOptions } from '@apollo/client'
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
    TData = any,
    TVariables = OperationVariables,
> extends Omit<WatchQueryOptions<TVariables>, 'query' | 'variables'> {
  clientId?: string
  enabled?: boolean
  throttle?: number
  debounce?: number
  prefetch?: boolean
}

// Return
export interface QueryResult<TData = any, TVariables = OperationVariables> {
  result: Ref<TData | undefined>
  start: () => void
  stop: () => void
  restart: () => void
  forceDisabled: Ref<boolean>
  document: Ref<DocumentNode>
  variables: Ref<TVariables | undefined>
  options: UseQueryOptions<TData, TVariables> | Ref<UseQueryOptions<TData, TVariables>>
  data: Ref<TData | undefined>
  refetch: (variables?: TVariables) => Promise<ApolloQueryResult<TData>> | undefined
  fetchMore: (options: FetchMoreQueryOptions<TVariables, TData> & FetchMoreOptions<TData, TVariables>) => Promise<ApolloQueryResult<TData>> | undefined
  subscribeToMore: <TSubscriptionVariables = OperationVariables, TSubscriptionData = TData>(options: SubscribeToMoreOptions<TData, TSubscriptionVariables, TSubscriptionData> | Ref<SubscribeToMoreOptions<TData, TSubscriptionVariables, TSubscriptionData>> | ReactiveFunction<SubscribeToMoreOptions<TData, TSubscriptionVariables, TSubscriptionData>>) => void
  onResult: (fn: (param: ApolloQueryResult<TData>) => void) => {
    off: () => void
  }
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void
  }
  error: Ref<ApolloError | null>
  loading: Ref<boolean>
  networkStatus: Ref<number | undefined>
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

export interface QueryDataOptions<TData = any, TVariables = OperationVariables>
  extends QueryFunctionOptions<TData, TVariables> {
  children?: (result: QueryResult<TData, TVariables>) => VNode
  query: DocumentNode | TypedDocumentNode<TData, TVariables>
}

export interface QueryHookOptions<TData = any, TVariables = OperationVariables>
  extends QueryFunctionOptions<TData, TVariables> {
  query?: DocumentNode | TypedDocumentNode<TData, TVariables>
}
