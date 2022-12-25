import { createApp, h, provide } from 'vue'
import './style.css'
import { createApollo } from '@huntersofbook/vue-apollo'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import App from './App.vue'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'https://countries.trevorblades.com',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const app = createApp(App)

const apollo = createApollo({
  client: apolloClient,
})

app.use(apollo)

app.mount('#app')
