const require = import.meta.env.SSR
  ? (await import('module')).default.createRequire(import.meta.url)
  : () => {}

const { useI18n, createI18n }: typeof import('vue-i18n') = import.meta.env.SSR
  ? require('vue-i18n')
  : await import('vue-i18n')

export { useI18n, createI18n }
