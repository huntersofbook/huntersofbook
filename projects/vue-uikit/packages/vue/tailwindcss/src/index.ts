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
          padding: '.5rem 1rem',
          borderRadius: '.25rem',
          fontWeight: '600',
          backgroundColor: '#2315',
        },
      },
    )
  }
})

export default huntersofbook
