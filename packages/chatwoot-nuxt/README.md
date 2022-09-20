![alt text](https://github.com/huntersofbook/huntersofbook/blob/main/apps/docs/images/naive-ui.png?raw=true)


# Chatwoot Nuxt 3 Module
This module huntersofbook team created.

> [ChatWoot](https://www.chatwoot.com/help-center) integration for [Nuxt](https://nuxtjs.org)

## Features

- Zero-config required
- Auto-import component and imports
- isOpen support

## Setup
```
pnpm add @huntersofbook/chatwoot-nuxt
```
```
yarn add @huntersofbook/chatwoot-nuxt
```
```
npm add @huntersofbook/chatwoot-nuxt
```

### Nuxt Config

```ts
export default defineNuxtConfig({
  modules: [
    '@huntersofbook/chatwoot-nuxt'
  ]
})
```

### Composables
Add app.vue or add wherever you want.

```vue
<script setup lang="ts">
const { isOpen, toggle, toggleBubbleVisibility, popoutChatWindow } = useChatWoot()

</script>

<template>
  <div class="flex space-x-3">
    <div>{{ isOpen }}</div>
    <button @click="toggle('open')">open</button>
    <button @click="toggle('close')">close</button>
    <div class="flex space-x-3">
      <button @click="toggleBubbleVisibility('hide')">hide</button>
      <button @click="toggleBubbleVisibility('show')">show</button>
      <button @click="popoutChatWindow()">open popup</button>
    </div>
  </div>
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
