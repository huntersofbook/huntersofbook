# Vue 3 Apollo
<br/>

### @huntersofbook/vue-apollo [![npm](https://img.shields.io/npm/v/@huntersofbook/vue-apollo.svg)](https://npmjs.com/package/@huntersofbook/vue-apollo)
<br/>

## Description
Graphql Vue 3 Apollo
- Vue 3 Support
- Only ESM Support
- Apollo Client 3 Support

## Installation

```bash
pnpm add @huntersofbook/vue-apollo
```


## Demo 

Open graphql playground in your browser port 4000/graphql

[![Edit @huntersofbook/vue-apollo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://githubbox.com/huntersofbook/huntersofbook/tree/main/examples/graphql/relay-cursor-paging)

### Docs
```ts
import { DefaultApolloClient } from '@huntersofbook/vue-apollo'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'

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

provide(DefaultApolloClient, apolloClient)

```

## Codegen

```bash
pnpm add -D @graphql-codegen/add @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/named-operations-object @graphql-codegen/typescript-apollo-client-helpers @graphql-codegen/typescript-operations @graphql-codegen/typescript-vue-apollo
```



```yml
overwrite: true

documents: ./src/graphql/**/*.graphql

schema: ./schema.graphql
emitLegacyCommonJSImports: false

generates:
  ./src/graphql/types.ts:
    plugins:
      - add: {content: '// THIS FILE IS GENERATED, DO NOT EDIT!'}
      - add: {content: '/* eslint-disable eslint-comments/no-unlimited-disable */'}
      - add: {content: '/* tslint:disable */'}
      - add: {content: '/* eslint-disable */'}
      - add: {content: // @ts-nocheck}
      - typescript
      - typescript-operations
      - typescript-apollo-client-helpers
      - typescript-vue-apollo
      - named-operations-object
    config:
      enumsAsTypes: true
      withCompositionFunctions: true
      vueApolloComposableImportFrom: '@huntersofbook/vue-apollo'
      vueCompositionApiImportFrom: vue
```

## Inspiration
Codes in this build are inspired by [Vue](https://github.com/vuejs/apollo) and from there the codes were copied. Thanks you for your great work.
Thank you [Akryum](https://github.com/Akryum)

 ## License

MIT License © 2023-PRESENT [productdevbook](https://github.com/productdevbook)