import plugin from 'tailwindcss/plugin.js'

/**
 * The FormKit plugin for Tailwind
 * @public
 */
const huntersofbook = plugin.withOptions((options) => {
  return function ({ addComponents }) {
    addComponents(
      {
        '.btn': {
          '@apply p-5 bg-red-500 text-white': true
        },
      },
    )
  }
})

export default huntersofbook
