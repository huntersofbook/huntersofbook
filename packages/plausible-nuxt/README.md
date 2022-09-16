# Plausible Nuxt 3 Module
This module huntersofbook team created.

## Features

- Zero-config required
- Auto-import composables usePlausible()

## Setup
```
pnpm add @huntersofbook/plausible-nuxt
```
```
yarn add @huntersofbook/plausible-nuxt
```
```
pnpm add @huntersofbook/plausible-nuxt
```
### Nuxt Config

```ts
export default defineNuxtConfig({
  modules: [
    '@huntersofbook/plausible-nuxt'
  ],
  huntersofbookPlausible: {
    init: {
      domain: 'localhost',
      apiHost: 'https://site.com',
      trackLocalhost: true
    }
  }
})
```


## Init Default

`Plausible()` accepts some [options](https://plausible-tracker.netlify.app/globals.html#plausibleinitoptions) that you may want to provide:

| Option         | Type     | Description                                                       | Default                  |
| -------------- | -------- | ----------------------------------------------------------------- | ------------------------ |
| domain         | `string` | Your site's domain, as declared by you in Plausible's settings    | `location.hostname`      |
| hashMode       | `bool`   | Enables tracking based on URL hash changes.                       | `false`                  |
| trackLocalhost | `bool`   | Enables tracking on *localhost*.                                  | `false`                  |
| apiHost        | `string` | Plausible's API host to use. Change this if you are self-hosting. | `'https://plausible.io'` |

## Settings Default

| Option         | Type     | Description                                                       | Default                  |
| -------------- | -------- | ----------------------------------------------------------------- | ------------------------ |
| enableAutoPageviews | `bool` | Your site's domain, as declared by you in Plausible's settings    | `true`      |
| enableAutoOutboundTracking       | `bool`   | Enables tracking based on URL hash changes.                       | `false`                  |


## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Stub module with `pnpm dev:prepare`
- Run `pnpm dev` to start [playground](./playground) in development mode

## License

Made with ❤️

Published under the [MIT License](./LICENCE).