![alt text](https://github.com/huntersofbook/huntersofbook/blob/main/docs/public/images/schob.jpg?raw=true)

# Schob
<br/>

### @huntersofbook/schob [![npm](https://img.shields.io/npm/v/@huntersofbook/schob.svg)](https://npmjs.com/package/@hunterofbook/schob)
<br/>


## Installation

```bash
pnpm add @huntersofbook/schob
```

## Usage

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

```

### Output
```bash

{
    isPro: false,
    darkMode: true,
    pages: { home: false, settings: true },
 }
 ```


 ## License

MIT License © 2022-PRESENT [productdevbook](https://github.com/productdevbook)