import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import Debug from 'debug'
import { resolve } from 'pathe'
import { globbySync } from 'globby'
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
  if (!existsSync(resolve(ctx.options.templateDir)) || !existsSync(resolve(ctx.options.templateDir, 'schema.json'))) {
    try {
      mkdirSync(resolve(root, ctx.options.templateDir))
    }
    catch (error) {
      console.log('The directory created.')
    }
    const isDirectories = globbySync(resolve(root, ctx.options.templateDir), { onlyDirectories: true })
    if (isDirectories.length === 0)
      writeFileSync(resolve(root, ctx.options.templateDir, 'schema.json'), template)
  }

  if (!existsSync(ctx.options.exportDir)) {
    mkdirSync(resolve(root, ctx.options.exportDir))
    ctx.options.languages.forEach((lang) => {
      writeFileSync(resolve(root, ctx.options.exportDir, `${lang}.json`), template)
    })
  }

  ctx.onFirstUpdate()
}
