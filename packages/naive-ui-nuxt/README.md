![alt text](https://github.com/huntersofbook/huntersofbook/blob/main/docs/public/images/naive-ui-nuxt.png?raw=true)

# Naive UI Nuxt 3 Module
<br/>

### @huntersofbook/naive-ui-nuxt [![npm](https://img.shields.io/npm/v/@huntersofbook/naive-ui-nuxt.svg)](https://npmjs.com/package/@huntersofbook/naive-ui-nuxt)
<br/>

This module huntersofbook team created.

> [Naive UI](https://www.naiveui.com/en-US/light/components/button) integration for [Nuxt](https://nuxtjs.org)

## Features

- Zero-config required
- Auto-import component and imports
- Tailwind CSS support

## Setup
```
pnpm add @huntersofbook/naive-ui-nuxt
```
```
yarn add @huntersofbook/naive-ui-nuxt
```
```
npm add @huntersofbook/naive-ui-nuxt
```
### Nuxt Config

```ts
export default defineNuxtConfig({
  modules: [
    '@huntersofbook/naive-ui-nuxt'
  ],

  // Optionally, specify global naive-ui config
  // Supports options that are normally set via 'n-config-provider'
  // https://www.naiveui.com/en-US/os-theme/docs/customize-theme
  naiveUI: {
    themeOverrides: {
      common: {
        primaryColor: '#ff0000',
        primaryColorHover: '#8b0000'
      }
    }
  }
})
```

### Composables

```vue
<script setup lang="ts">
import { darkTheme } from 'naive-ui'
</script>

<template>
  <NConfigProvider :theme="darkTheme">
    <NGlobalStyle />
    <div>
      Nuxt module playground!
      <NButton>Default</NButton>
    </div>
  </NConfigProvider>
</template>
```

## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Stub module with `pnpm dev:prepare`
- Run `pnpm dev` to start [playground](./playground) in development mode

## License

MIT License © 2022-PRESENT [productdevbook](https://github.com/productdevbook)

## Thanks

Thanks to [@07akioni](https://github.com/07akioni), this project is heavily inspired by [naive-ui-nuxt-demo](https://github.com/07akioni/naive-ui-nuxt-demo).

Thanks to [@tobiasdiez](https://github.com/tobiasdiez), this project is inspired by some code structure.

## 💚 Credits

Nuxt 3 Plugin [danielroe](https://github.com/danielroe)
