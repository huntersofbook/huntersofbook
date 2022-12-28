import plugin from 'tailwindcss/plugin'

export default plugin.withOptions(() => {
  return function ({ addComponents }) {
    addComponents([])
  }
})
