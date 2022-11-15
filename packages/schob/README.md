```ts
import { merge } from '@huntersofbook/schob'

const schema = {
  isPro: false,
  darkMode: false,
  pages: {
    home: false,
    settings: false,
  },
}

const newData = {
  isPro: false,
  darkMode: true,
  pages: {
    home: false,
    settings: true,
    hello: false,
  },
  dd: 'dd',
  tt: {
    dd: 'dd',
  },
  cc: [{ dd: 'dd' }],
}

const res = merge({ schema, newData })

// Output:
// {
//     isPro: false,
//     darkMode: true,
//     pages: { home: false, settings: true },
// }
```
