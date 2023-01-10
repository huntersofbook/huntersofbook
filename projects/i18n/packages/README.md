![alt text](https://github.com/huntersofbook/huntersofbook/blob/main/docs/public/images/i18n.jpg?raw=true)

# i18n
<br/>

### @huntersofbook/i18n [![npm](https://img.shields.io/npm/v/@huntersofbook/i18n.svg)](https://npmjs.com/package/@huntersofbook/i18n)
<br/>


## Installation

```bash
pnpm add @huntersofbook/i18n
```
It will be the `.i18n` folder. Save there by adding `en.json`, `tr.json`. It will automatically create a `language` folder for you and import your data there.

## Usage

### Vite


```ts
import i18n from '@huntersofbook/i18n/vite'

export default defineConfig({
  plugins: [
    i18n({
      languages: ['tr', 'en', 'ch'],
    }),
  ],
})
```

## Options
## Support

Join our [Discord channel](https://discord.gg/xAj9uqMrjC) or [open an issue](https://github.com/huntersofbook/huntersofbook/issues).

## Configuration

### Basic props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| **languages** | `string[]` | `['tr', 'en', 'ch']` | Schema export language files. |
... soon more detail


## 💻 Development
Node version >= 18
Pnpm version >= 7

- Clone this repository
- Open the project folder `packages/i18n` 
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Go to `i18n/packages` pnpm dev or pnpm build
- Go to `i18n/playground` pnpm dev



## Thank you
Thanks to @antfu, this project is heavily inspired by [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components).

Thanks to this cover image designed by @0fatihyildiz.


## License

MIT License © 2023-PRESENT [productdevbook](https://github.com/productdevbook)