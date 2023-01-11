import { mkdirSync, writeFileSync } from 'node:fs'
import { globbySync } from 'globby'
import Debug from 'debug'
import type { Context } from '../context'

const debug = Debug('unplugin-i18n-watch:glob')

export function searchI18nFiles(ctx: Context) {
  debug(`started with: [${ctx.options.globs.join(', ')}]`)
  const root = ctx.root

  const files = globbySync(ctx.options.globs, {
    ignore: ['node_modules'],
    onlyFiles: true,
    cwd: root,
    absolute: true,
  })

  if (!files.length) {
    // create dic
    // create file
    mkdirSync(`${root}/${ctx.options.templateDir}`, { recursive: true })
    const template = `{
  "huntersofbook": "read a book",
  "hello": "hello"
}
`
    writeFileSync(`${root}/${
      ctx.options.templateDir
    }/template.json`, template)
  }

  if (!files.length)
    console.warn('[unplugin-i18n-watc] no components found')

  debug(`${files.length} components found.`)

  ctx.addFiles(files)
}
