# @huntersofbook/core

huntersofbook offers specific tools for the vue ecosystem.

## Usage Vue 3

```ts
import { createPlausible } from '@huntersofbook/plausible-vue'

const plausible = createPlausible({
  init: {
    domain: 'domain.com',
    apiHost: 'https://host.com',
    trackLocalhost: true,
  },
  settings: {
    enableAutoOutboundTracking: true,
    enableAutoPageviews: true,
  },
})

app.use(plausible)

```

## License

MIT License &copy; 2022-PRESENT [productdevbook](https://github.com/productdevbook)
