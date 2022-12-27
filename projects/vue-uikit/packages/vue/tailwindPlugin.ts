import { resolve } from 'path'
import { readdirSync } from 'fs'
import plugin from 'tailwindcss/plugin.js'

console.log(cssFiles)
export default plugin.withOptions(() => {
  return function ({ addComponents }) {
    addComponents()
  }
})
