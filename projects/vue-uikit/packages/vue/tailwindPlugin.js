const plugin = require('tailwindcss/plugin')

module.exports = plugin(
  ({ addUtilities, theme, e }) => {
    const colCount = theme('colCount')
    const utilities = Object.entries(colCount).map(([name, value]) => ({
      [`.${e(`col-count-${name}`)}`]: { columnCount: `${value}` },
    }))
    addUtilities(utilities)
  }
  , {
    theme: {
      colCount: {
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
      },
    },
  },
)
