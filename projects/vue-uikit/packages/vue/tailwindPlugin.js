const plugin = require('tailwindcss/plugin')
const styled = require('./dist/index')
module.exports = plugin.withOptions(() => {
  return function ({ addComponents }) {
    addComponents(styled)
  }
})
