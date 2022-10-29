// import { defineConfig } from 'tsup'
import pkg from 'tsup'
const { defineConfig } = pkg

export default defineConfig({
  entry: {
    index: 'src/node/cli.ts',
  },
  format: ['esm', 'cjs'],
  target: 'esnext',
  sourcemap: true,
  splitting: false,
})
