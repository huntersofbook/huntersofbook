import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import Debug from 'debug'
import type { Context } from '../context'

const debug = Debug('unplugin-i18n-watch:glob')

export function searchI18nFiles(ctx: Context) {
  debug(`started with: [${ctx.options.globs.join(', ')}]`)
  const root = ctx.root

  const template = `{
  "huntersofbook": "read a book",
  "hello": "hello",
  "githubStar": "https://github.com/huntersofbook/huntersofbook",
  "sponsor": "https://github.com/sponsors/productdevbook"
}
`

  // check is directory
  if (!existsSync(ctx.options.templateDir)) {
    mkdirSync(ctx.options.templateDir)

    writeFileSync(`${root}/${ctx.options.templateDir
      }/schema.json`, template)
  }

  if (!existsSync(ctx.options.exportDir)) {
    mkdirSync(ctx.options.exportDir)
    ctx.options.languages.forEach((lang) => {
      writeFileSync(`${ctx.options.exportDir}/${lang}.json`, template)
    })
  }

  ctx.onFirstUpdate()
}
