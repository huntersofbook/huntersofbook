![alt text](https://github.com/huntersofbook/huntersofbook/blob/main/apps/docs/images/naive-ui.png?raw=true)


# Naive UI Nuxt 3 Module
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
})
```

### Composables

```vue
<script setup lang="ts">
  
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

Made with ❤️

Published under the [MIT License](./LICENCE).