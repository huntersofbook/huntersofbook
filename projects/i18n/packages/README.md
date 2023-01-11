![alt text](https://github.com/huntersofbook/huntersofbook/blob/main/docs/public/images/i18n.png?raw=true)

# i18n

Create i18n templates and automatically export them to your desired languages. Unplugin support.


<p>
      <a href="https://www.npmjs.com/package/@huntersofbook/i18n"><img src="https://img.shields.io/npm/v/@huntersofbook/i18n.svg?style=flat&colorA=002438&colorB=28CF8D" alt="Version"></a>
      <a href="https://www.npmjs.com/package/@huntersofbook/i18n"><img src="https://img.shields.io/npm/dm/@huntersofbook/i18n.svg?style=flat&colorA=002438&colorB=28CF8D" alt="Downloads"></a>
      <a href="./LICENSE"><img src="https://img.shields.io/github/license/huntersofbook/huntersofbook.svg?style=flat&colorA=002438&colorB=28CF8D" alt="License"></a>
      <a href="https://github.com/huntersofbook/huntersofbook">
      <img src="https://img.shields.io/github/stars/huntersofbook/huntersofbook.svg?style=social&label=Star&maxAge=2592000" alt="Github Stars"> </a>
      <a href="https://chat.huntersofbook.com"> <img src="https://img.shields.io/discord/1008640116564181023?color=7289da&label=Discord&logo=discord&logoColor=white" alt="Discord"></a>
</p>

## Installation

```bash
pnpm add -D @huntersofbook/i18n
```
It will be the `.i18n` folder. Save there by adding `en.json`, `tr.json`. It will automatically create a `language` folder for you and import your data there.

## Youtube Setup Video

[![Youtube](https://raw.githubusercontent.com/huntersofbook/huntersofbook/main/docs/public/images/youtube/i18n.png)](https://www.youtube.com/watch?v=b33Zk0LfKkM)


## Usage

### Vite

```ts
import i18n from '@huntersofbook/i18n/vite'

export default defineConfig({
  plugins: [
    i18n({
      languages: ['tr', 'en', 'cn'],
    }),
  ],
})
```

### Nuxt 3
```ts
export default defineNuxtConfig({
  modules: [
    '@huntersofbook/i18n/nuxt',
  ],
  huntersofbookI18n: {
    languages: ['tr', 'en', 'cn'],
  },
})
```

## Support

Join our [Discord channel](https://discord.gg/xAj9uqMrjC) or [open an issue](https://github.com/huntersofbook/huntersofbook/issues).

## Configuration

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| **languages** | `string[]` | `['tr', 'en', 'cn']` | Languages extensions to export |
| **templateDir** | `string` | `'.i18n'` | Template folder |
| **exportDir** | `string` | `'language'` | Template export folder |
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
- or `packages/i18n` in `dev:package` | `dev:playground-vite` used.



## Thank you
Thanks to @antfu, this project is heavily inspired by [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components).

Thanks to this cover image designed by @0fatihyildiz.


## License

MIT License © 2023-PRESENT [productdevbook](https://github.com/productdevbook)