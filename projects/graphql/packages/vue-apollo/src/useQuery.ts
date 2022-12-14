import {
  ComputedRef, Ref, computed,
  getCurrentInstance,
  onBeforeUnmount,
  ref,
  unref,
  watch,
} from 'vue'
import type { DocumentNode } from 'graphql'
import {
  NetworkStatus,
} from '@apollo/client/core/index.js'
import type {
  ApolloError,
  ApolloQueryResult,
  ObservableQuery,
  ObservableSubscription,
  OperationVariables,
  WatchQueryFetchPolicy,
  WatchQueryOptions,
} from '@apollo/client/core/index.js'
import { invariant } from '@apollo/client/utilities/globals/index.js'
import { canUseWeakSet, compact, maybeDeepFreeze, mergeOptions } from '@apollo/client/utilities/index.js'
import { equal } from '@wry/equality'
import type { ObservableQueryFields } from '@apollo/client/index.js'
import { paramToRef } from './util/paramToRef'
import { paramToReactive } from './util/paramToReactive'
import { useEventHook } from './util/useEventHook'

import type { CurrentInstance } from './util/types'
import { useApolloClient } from './composable/useApolloClient'
import { DocumentType, verifyDocumentType } from './parser'
import type { DocumentParameter, OptionsParameter, QueryHookOptions, UseQueryOptions, UseQueryReturn, VariablesParameter } from './types/types'
import { RenderPromises } from './ssr'
import { trackQuery } from './util/loadingTracking'

/**
 * Use a query that does not require variables or options.
 * */
export function useQuery<TResult = any>(
  document: DocumentParameter<TResult, undefined>
): UseQueryReturn<TResult, undefined>

/**
 * Use a query that has optional variables but not options
 */
export function useQuery<TResult = any, TVariables extends OperationVariables = OperationVariables>(
  document: DocumentParameter<TResult, TVariables>
): UseQueryReturn<TResult, TVariables>

/**
 * Use a query that has required variables but not options
 */
export function useQuery<TResult = any, TVariables extends OperationVariables = OperationVariables>(
  document: DocumentParameter<TResult, TVariables>,
  variables: VariablesParameter<TVariables>
): UseQueryReturn<TResult, TVariables>

/**
 * Use a query that requires options but not variables.
 */
export function useQuery<TResult = any>(
  document: DocumentParameter<TResult, undefined>,
  variables: undefined | null,
  options: OptionsParameter<TResult, null>,
): UseQueryReturn<TResult, null>

/**
 * Use a query that requires variables and options.
 */
export function useQuery<TResult = any, TVariables extends OperationVariables = OperationVariables>(
  document: DocumentParameter<TResult, TVariables>,
  variables: VariablesParameter<TVariables>,
  options: OptionsParameter<TResult, TVariables>,
): UseQueryReturn<TResult, TVariables>

export function useQuery<
  TResult,
  TVariables extends OperationVariables,
>(
  document: DocumentParameter<TResult, TVariables>,
  variables?: VariablesParameter<TVariables>,
  options?: OptionsParameter<TResult, TVariables>,
): UseQueryReturn<TResult, TVariables> {
  return useQueryImpl<TResult, TVariables>(document, variables, options)
}

const {
  prototype: {
    hasOwnProperty,
  },
} = Object

export function useQueryImpl<TResult, TVariables>(
  document: DocumentParameter<TResult, TVariables>,
  variables?: VariablesParameter<TVariables>,
  options: OptionsParameter<TResult, TVariables> = {},
  lazy = false,
): UseQueryReturn<TResult, TVariables> {
  const documentRef = paramToRef(document)
  verifyDocumentType(documentRef.value, DocumentType.Query)

  const variablesRef = paramToRef(variables)
  const optionsRef = paramToReactive(options)
  // Is on server?
  const vm = getCurrentInstance() as CurrentInstance | null

  const queryOptions = ref<UseQueryOptions<TResult, TVariables>>()
  const watchQueryOptions = ref<WatchQueryOptions<TVariables, TResult>>()

  const obsQuery = ref<ObservableQuery<TResult, TVariables>>()

  let observer: ObservableSubscription | undefined

  const obsQueryFields = ref<Omit<
    ObservableQueryFields<TResult, TVariables>,
    'variables'
  >>()

  let currentDocument: DocumentNode
  let currentVariables: TVariables | undefined
  let currentVariablesSerialized: string

  const result = ref<ApolloQueryResult<TResult>>()
  const previousResult = ref<TResult | undefined>()
  const resultEvent = useEventHook<ApolloQueryResult<TResult>>()

  const error = ref<ApolloError | null>(null)
  const errorEvent = useEventHook<ApolloError>()

  const loading = ref(false)
  vm && trackQuery(loading)

  const networkStatus = ref<number>()

  // Apollo Client
  const { resolveClient } = useApolloClient()

  const client = resolveClient(queryOptions.value?.clientId)
  const renderPromises = ref<RenderPromises>()

  if (client)
    renderPromises.value = new RenderPromises()

  // Enabled state

  const forceDisabled = ref(lazy)
  const enabledOption = computed(() => !queryOptions.value || queryOptions.value.enabled == null || queryOptions.value.enabled)
  const isEnabled = computed(() => enabledOption.value && !forceDisabled.value)

  let started = false

  function isUnRefCheck() {
    if (!queryOptions.value)
      queryOptions.value = unref(optionsRef)
    if (!currentDocument)
      currentDocument = unref(documentRef)
    if (!currentVariables) {
      currentVariables = unref(variablesRef)
      currentVariablesSerialized = JSON.stringify(currentVariables)
    }
  }

  function start() {
    if (started || !isEnabled.value)
      return
    started = true
    error.value = null
    loading.value = true

    isUnRefCheck()

    _useOptions(queryOptions.value!)
    useObservableQuery()
    resultFn()
  }

  function resultFn() {
    function onNextResult(_queryResult: ApolloQueryResult<TResult>) {
      const previousResult = result

      const _result = obsQuery.value!.getCurrentResult()

      if (previousResult.value
        && previousResult.value.loading === _result.loading
        && previousResult.value.networkStatus === _result.networkStatus
        && equal(previousResult.value.data, _result.data))
        return
      setResult(_result)
      resultEvent.trigger(_result)
      loading.value = _result.loading
      networkStatus.value = _result.networkStatus
    }

    const onError = (error: Error) => {
      const last = ((obsQuery.value) as any).last
      observer?.unsubscribe()

      // Unfortunately, if `lastError` is set in the current
      // `observableQuery` when the subscription is re-created,
      // the subscription will immediately receive the error, which will
      // cause it to terminate again. To avoid this, we first clear
      // the last error/result from the `observableQuery` before re-starting
      // the subscription, and restore it afterwards (so the subscription
      // has a chance to stay open).
      try {
        obsQuery.value?.resetLastResults()
        observer = obsQuery.value?.subscribe(onNextResult, onError)
      }
      finally {
        ((obsQuery.value) as any).last = last
      }

      if (!hasOwnProperty.call(error, 'graphQLErrors')) {
        // The error is not a GraphQL error
        throw error
      }

      const previousResult = result.value
      if (
        !previousResult
        || (previousResult && previousResult.loading)
        || !equal(error, previousResult.error)
      ) {
        setResult({
          data: (previousResult && previousResult.data) as TResult,
          error: error as ApolloError,
          loading: false,
          networkStatus: NetworkStatus.error,
        })
      }
    }

    observer = obsQuery.value?.subscribe({
      next: onNextResult,
      error: onError,
    })

    return () => observer?.unsubscribe()
  }

  function setResult(nextResult: ApolloQueryResult<TResult>) {
    const _previousResult = result.value
    if (_previousResult && _previousResult.data)
      previousResult.value = _previousResult.data

    result.value = nextResult
    handleErrorOrCompleted(nextResult)
  }

  function handleErrorOrCompleted(result: ApolloQueryResult<TResult>) {
    if (!result.loading) {
      // wait a tick in case we are in the middle of rendering a component
      Promise.resolve().then(() => {
        if (result.error)
          onError(result.error)
        else if (result.data)
          onCompleted(result.data)
      }).catch((error) => {
        invariant.warn(error)
      })
    }
  }

  function getDefaultFetchPolicy(): WatchQueryFetchPolicy {
    return (
      queryOptions.value?.defaultOptions?.fetchPolicy
      || client.defaultOptions.watchQuery?.fetchPolicy
      || 'cache-first'
    )
  }

  // Defining these methods as no-ops on the prototype allows us to call
  // state.onCompleted and/or state.onError without worrying about whether a
  // callback was provided.
  function onCompleted(_data: TResult) { }
  function onError(_error: ApolloError) { }

  function getObsQueryOptions(): WatchQueryOptions<TVariables, TResult> {
    const toMerge: Array<
      Partial<WatchQueryOptions<TVariables, TResult>>
    > = []

    const globalDefaults = client.defaultOptions.watchQuery
    if (globalDefaults)
      toMerge.push(globalDefaults)

    if (queryOptions.value?.defaultOptions)
      toMerge.push(queryOptions.value.defaultOptions)

    toMerge.push({
      query: currentDocument,
      variables: currentVariables,
      ...queryOptions.value,
    })

    // We use compact rather than mergeOptions for this part of the merge,
    // because we want watchQueryOptions.variables (if defined) to replace
    // this.observable.options.variables whole. This replacement allows
    // removing variables by removing them from the variables input to
    // useQuery. If the variables were always merged together (rather than
    // replaced), there would be no way to remove existing variables.
    // However, the variables from options.defaultOptions and globalDefaults
    // (if provided) should be merged, to ensure individual defaulted
    // variables always have values, if not otherwise defined in
    // observable.options or watchQueryOptions.
    toMerge.push(compact(
      obsQuery.value && obsQuery.value.options,
      queryOptions.value ? queryOptions.value : {},
    ))

    return toMerge.reduce(
      mergeOptions,
    ) as WatchQueryOptions<TVariables, TResult>
  }

  watch(obsQuery, (newVal, oldVal) => {
    if (newVal) {
      obsQueryFields.value = {
        refetch: newVal.refetch.bind(newVal),
        reobserve: newVal.reobserve.bind(newVal),
        fetchMore: newVal.fetchMore.bind(newVal),
        updateQuery: newVal.updateQuery.bind(newVal),
        startPolling: newVal.startPolling.bind(newVal),
        stopPolling: newVal.stopPolling.bind(newVal),
        subscribeToMore: newVal.subscribeToMore.bind(newVal),
      }
    }
  })

  function useObservableQuery() {
    // See if there is an existing observable that was used to fetch the same
    // data and if so, use it instead since it will contain the proper queryId
    // to fetch the result set. This is used during SSR.
    if (renderPromises.value && watchQueryOptions.value) {
      const SSRObservable = renderPromises.value.getSSRObservable(watchQueryOptions.value)
      if (SSRObservable)
        obsQuery.value = SSRObservable

      else if (obsQuery.value)
        // eslint-disable-next-line no-self-assign
        obsQuery.value = obsQuery.value
      else
        obsQuery.value = client.watchQuery(getObsQueryOptions())
    }

    if (obsQuery.value) {
      obsQueryFields.value = {
        refetch: obsQuery.value.refetch.bind(obsQuery.value),
        reobserve: obsQuery.value.reobserve.bind(obsQuery.value),
        fetchMore: obsQuery.value.fetchMore.bind(obsQuery.value),
        updateQuery: obsQuery.value.updateQuery.bind(obsQuery.value),
        startPolling: obsQuery.value.startPolling.bind(obsQuery.value),
        stopPolling: obsQuery.value.stopPolling.bind(obsQuery.value),
        subscribeToMore: obsQuery.value.subscribeToMore.bind(obsQuery.value),
      }
    }

    const ssrAllowed = !(
      queryOptions.value?.ssr === false
      || queryOptions.value?.skip
    )
    if (renderPromises.value && ssrAllowed && obsQuery.value) {
      renderPromises.value.registerSSRObservable(obsQuery.value)
      if (obsQuery.value.getCurrentResult().loading) {
        // TODO: This is a legacy API which could probably be cleaned up
        renderPromises.value.addObservableQueryPromise(obsQuery.value)
      }
    }

    return obsQuery.value
  }

  const ssrDisabledResult = maybeDeepFreeze({
    loading: true,
    data: undefined as unknown as TResult,
    error: undefined,
    networkStatus: NetworkStatus.loading,
  })

  const skipStandbyResult = maybeDeepFreeze({
    loading: false,
    data: undefined as unknown as TResult,
    error: undefined,
    networkStatus: NetworkStatus.ready,
  })

  function _createWatchQueryOptions({
    skip,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ssr,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onCompleted,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onError,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    defaultOptions,
    // The above options are useQuery-specific, so this ...otherOptions spread
    // makes otherOptions almost a WatchQueryOptions object, except for the
    // query property that we add below.
    ...otherOptions
  }: QueryHookOptions<TResult, TVariables> = {}): WatchQueryOptions<TVariables, TResult> {
    // This Object.assign is safe because otherOptions is a fresh ...rest object
    // that did not exist until just now, so modifications are still allowed.
    const watchQueryOptions: WatchQueryOptions<TVariables, TResult>
      = Object.assign(otherOptions, { query: currentDocument })

    if (
      renderPromises.value
      && (
        watchQueryOptions.fetchPolicy === 'network-only'
        || watchQueryOptions.fetchPolicy === 'cache-and-network'
      )
    ) {
      // this behavior was added to react-apollo without explanation in this PR
      // https://github.com/apollographql/react-apollo/pull/1579
      watchQueryOptions.fetchPolicy = 'cache-first'
    }

    if (!watchQueryOptions.variables)
      watchQueryOptions.variables = {} as TVariables

    if (skip) {
      const {
        fetchPolicy = getDefaultFetchPolicy(),
        initialFetchPolicy = fetchPolicy,
      } = watchQueryOptions

      // When skipping, we set watchQueryOptions.fetchPolicy initially to
      // "standby", but we also need/want to preserve the initial non-standby
      // fetchPolicy that would have been used if not skipping.
      Object.assign(watchQueryOptions, {
        initialFetchPolicy,
        fetchPolicy: 'standby',
      } as WatchQueryOptions<TVariables, TResult>)
    }
    else if (!watchQueryOptions.fetchPolicy) {
      watchQueryOptions.fetchPolicy
        = obsQuery.value?.options.initialFetchPolicy
        || getDefaultFetchPolicy()
    }

    return watchQueryOptions
  }

  const _optionsToIgnoreOnce = new (canUseWeakSet ? WeakSet : Set)<
    WatchQueryOptions<TVariables, TResult>
  >()

  function _useOptions(options: UseQueryOptions<TResult, TVariables>) {
    const _watchQueryOptions = _createWatchQueryOptions(
      queryOptions.value = options,
    )

    // Update this.watchQueryOptions, but only when they have changed, which
    // allows us to depend on the referential stability of
    // this.watchQueryOptions elsewhere.
    const currentWatchQueryOptions = _watchQueryOptions

    // To force this equality test to "fail," thereby reliably triggering
    // observable.reobserve, add any current WatchQueryOptions object(s) you
    // want to be ignored to this.optionsToIgnoreOnce. A similar effect could be
    // achieved by nullifying this.watchQueryOptions so the equality test
    // immediately fails because currentWatchQueryOptions is null, but this way
    // we can promise a truthy this.watchQueryOptions at all times.
    if (
      _optionsToIgnoreOnce.has(currentWatchQueryOptions)
      || !equal(watchQueryOptions, currentWatchQueryOptions)
    ) {
      watchQueryOptions.value = _watchQueryOptions
      if (currentWatchQueryOptions && obsQuery.value) {
        // As advertised in the -Once of this.optionsToIgnoreOnce, this trick is
        // only good for one forced execution of observable.reobserve per
        // ignored WatchQueryOptions object, though it is unlikely we will ever
        // see this exact currentWatchQueryOptions object again here, since we
        // just replaced this.watchQueryOptions with watchQueryOptions.
        _optionsToIgnoreOnce.delete(currentWatchQueryOptions)

        // Though it might be tempting to postpone this reobserve call to the
        // useEffect block, we need getCurrentResult to return an appropriate
        // loading:true result synchronously (later within the same call to
        // useQuery). Since we already have this.observable here (not true for
        // the very first call to useQuery), we are not initiating any new
        // subscriptions, though it does feel less than ideal that reobserve
        // (potentially) kicks off a network request (for example, when the
        // variables have changed), which is technically a side-effect.
        obsQuery.value.reobserve(getObsQueryOptions())
        previousResult.value = result.value?.data || previousResult.value
        result.value = undefined
      }
    }

    // Make sure state.onCompleted and state.onError always reflect the latest
    // options.onCompleted and options.onError callbacks provided to useQuery,
    // since those functions are often recreated every time useQuery is called.
    // Like the forceUpdate method, the versions of these methods inherited from
    // InternalState.prototype are empty no-ops, but we can override them on the
    // base state object (without modifying the prototype).
    // onCompleted = options.onCompleted || onCompleted
    // onError = options.onError || onError

    if (
      (renderPromises.value || client.disableNetworkFetches)
      && queryOptions.value.ssr === false
      && !queryOptions.value.skip
    ) {
      // If SSR has been explicitly disabled, and this function has been called
      // on the server side, return the default loading state.
      result.value = ssrDisabledResult
    }
    else if (
      queryOptions.value.skip
      || queryOptions.value.fetchPolicy === 'standby'
    ) {
      // When skipping a query (ie. we're not querying for data but still want to
      // render children), make sure the `data` is cleared out and `loading` is
      // set to `false` (since we aren't loading anything).
      //
      // NOTE: We no longer think this is the correct behavior. Skipping should
      // not automatically set `data` to `undefined`, but instead leave the
      // previous data in place. In other words, skipping should not mandate that
      // previously received data is all of a sudden removed. Unfortunately,
      // changing this is breaking, so we'll have to wait until Apollo Client 4.0
      // to address this.
      result.value = skipStandbyResult
    }
    else if (
      result.value === ssrDisabledResult
      || result.value === skipStandbyResult
    ) {
      result.value = undefined
    }
  }

  let onStopHandlers: Array<() => void> = []

  /**
 * Stop watching the query
 */
  function stop() {
    started = false
    loading.value = false

    onStopHandlers.forEach(handler => handler())
    onStopHandlers = []

    if (obsQuery.value) {
      obsQuery.value.stopPolling()
      obsQuery.value = undefined
    }

    if (observer) {
      observer.unsubscribe()
      observer = undefined
    }
  }

  // Applying document
  watch([documentRef, isEnabled, variablesRef, obsQuery], (value) => {
    const _previousResult = result.value && result.value.data
    const previousData = _previousResult && _previousResult
    if (previousData)
      previousResult.value = previousData

    currentDocument = value[0]
    if (value[1])
      start()
    else
      stop()
  }, {
    immediate: true,
  })

  // Applying variables
  watch(variablesRef, (value, _oldValue) => {
    const serialized = JSON.stringify(value)
    if (serialized !== currentVariablesSerialized)
      currentVariables = value
    start()
    currentVariablesSerialized = serialized
  }, {
    deep: true,
    immediate: true,
  })

  // Applying options
  watch(() => unref(optionsRef), (value) => {
    queryOptions.value = value
    start()
  }, {
    deep: true,
    immediate: true,
  })

  vm && onBeforeUnmount(() => {
    stop()
  })

  return {
    result,
    ...obsQueryFields.value!,
    client,
    observable: obsQuery,
    document: documentRef,
    variables: variablesRef,
    options: optionsRef,
    loading,
    networkStatus,
    error,
    previousResult,
    forceDisabled,
    start,
    stop,
    onResult: resultEvent.on,
    onError: errorEvent.on,
  }
}
