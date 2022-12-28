import plugin from 'tailwindcss/plugin.js'

/**
 * The FormKit plugin for Tailwind
 * @public
 */
const FormKitVariants = plugin.withOptions((options) => {
  return function ({ addComponents }) {
    addComponents([])
  }
})

export default FormKitVariants
