import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core/index.js'
import {
  DefaultApolloClient,
  provideApolloClient,
} from '@huntersofbook/vue-apollo'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const httpLink = createHttpLink({
    uri: 'https://countries.trevorblades.com',
  })

  const cache = new InMemoryCache()

  let apolloClient: ApolloClient<any>

  if (process.server) {
    apolloClient = new ApolloClient({
      ssrMode: true,
      link: ApolloLink.from([httpLink]),
      cache,
    })
    nuxtApp.hook('app:rendered', () => {
      nuxtApp.payload.data.apollo = apolloClient.extract()
    })
  }
  else {
    apolloClient = new ApolloClient({
      link: ApolloLink.from([httpLink]),
      cache,
      ssrForceFetchDelay: 100,
    })
  }

  provideApolloClient(apolloClient)
  nuxtApp.provide('$apollo', { DefaultApolloClient, apolloClient })
})
