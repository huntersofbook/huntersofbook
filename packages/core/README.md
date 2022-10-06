# @huntersofbook/core

huntersofbook offers specific tools for the vue ecosystem.

## Usage

```ts
import { createHuntersofbookEssential, loadDateFNSLocale } from 'huntersofbook'

const locale = await loadDateFNSLocale({
  locale: 'en',
  storageKey: 'locale'
})

const huntersofbook = createHuntersofbookEssential({
    config: { dateLocale: locale }
})
app.use(i18n)

```

## License

MIT License &copy; 2022-PRESENT [productdevbook](https://github.com/productdevbook)


## Thanks

Thanks to [@epicmaxco](https://github.com/epicmaxco/vuestic-admin), this project is inspired by code structure.
