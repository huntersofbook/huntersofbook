![alt text](https://github.com/huntersofbook/huntersofbook/blob/main/docs/public/images/plausible-vue.png?raw=true)
# Plausible Vue
<br/>

### @huntersofbook/plausible-vue [![npm](https://img.shields.io/npm/v/@huntersofbook/plausible-vue.svg)](https://npmjs.com/package/@huntersofbook/plausible-vue)
<br/>

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
  partytown: false,
})

app.use(plausible)
```

## Thanks

Thanks to [@surmon-china](https://github.com/surmon-china), this project loadScript function is heavily inspired by [surmon-china.github.io](https://github.com/surmon-china/surmon-china.github.io).

## License

MIT License © 2022-PRESENT [productdevbook](https://github.com/productdevbook)