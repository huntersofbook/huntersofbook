

import {
  defineConfig,
  presetIcons,
} from 'unocss'

export default defineConfig({
  presets: [
    presetIcons({
      scale: 1.2,
      unit: 'em',
      extraProperties: {
        'height': '1.5em',
        'flex-shrink': '0',
      },
    }),
  ],

  include: ['./**/*.vue', './**/*.md'],
})
