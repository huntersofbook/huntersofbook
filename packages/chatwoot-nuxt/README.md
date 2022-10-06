![alt text](https://github.com/huntersofbook/huntersofbook/blob/main/docs/public/images/chatwoot-vue.png?raw=true)


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
  ],

  chatwoot: {
    init: {
      websiteToken: 'b6BejyTTuxF4yPt61ZTZHjdB'
    },
    settings: {
      locale: 'en',
      position: 'left',
      launcherTitle: 'Hello Chat',
      // ... and more settings
    }
  }
})
```

### Composables
Add app.vue or add wherever you want.

```vue
<script setup lang="ts">
const { isModalVisible, toggle, toggleBubbleVisibility, popoutChatWindow, ...more } = useChatWoot()
</script>

<template>
  <div class="flex space-x-3">
    <div>{{ isModalVisible }}</div>
    <button @click="toggle('open')">
      open
    </button>
    <button @click="toggle('close')">
      close
    </button>
    <div class="flex space-x-3">
      <button @click="toggleBubbleVisibility('hide')">
        hide
      </button>
      <button @click="toggleBubbleVisibility('show')">
        show
      </button>
      <button @click="popoutChatWindow()">
        open popup
      </button>
    </div>
  </div>
</template>
```

## Init Default

| Option         | Type     | Description                                                       | Default                  |
| -------------- | -------- | ----------------------------------------------------------------- | ------------------------ |
| websiteToken         | `string` | The token given to you when you create a chat widget. |    |
| baseUrl       | `bool`   | Your site's domain, as declared by you in Chatwoot's settings | `https://app.chatwoot.com`    |


## useChatWoot

`useChatWoot()` accepts some

| Option         | Type     | Description                                                        |
| -------------- | -------- | -----------------------------------------------------------------  |
| isModalVisible   | `boolean` | This chat will show you its open status.    |
| toggle       | `'open' or 'close' - Function `   |   You can open and close the chat   |
| setUser       | `key: string, args: ChatwootSetUserProps - Function`   | You can send user information to chatwoot panel.     |
| setCustomAttributes       | `attributes: { [key: string]: string } - Function`   | You can send custom attributes to chatwoot panel.   |
| deleteCustomAttribute       | `key: string - Function`   | You can delete custom attributes to chatwoot panel.   |
| setLocale       | `local: string - Function`   |  Change widget locale  |
| setLabel       | `label: string - Function`   |  You can send label to chatwoot panel.        |
| removeLabel       | `label: string - Function`   |  You can delete label to chatwoot panel.        |
| reset       | `Function` |  You can reset all settings.   |
| toggleBubbleVisibility       | `'hide' or 'show' - Function`   | You can set the speech bubble's hide state.    |
| popoutChatWindow       |  | You can open the conversation as a popup.  |


## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Stub module with `pnpm dev:prepare`
- Run `pnpm dev` to start [playground](./playground) in development mode

## License

MIT License © 2022-PRESENT [productdevbook](https://github.com/productdevbook)
