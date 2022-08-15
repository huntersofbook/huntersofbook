/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/@huntersofbook/**/dist/**/*.js',
    './node_modules/huntersofbook/dist/**/*.js',
    '../../node_modules/huntersofbook/dist/**/*.js',
    '../../node_modules/@huntersofbook/**/dist/**/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
