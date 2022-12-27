/** @type {import('tailwindcss').Config} */
const huntersofbookPlugin = require('@huntersofbook/vue-uikit/tailwindPlugin')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [huntersofbookPlugin],
}
