import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index', 'src/ui'],
  clean: true,
  declaration: true,
  externals: ['vue', 'vee-validate', 'yup'],
  rollup: {
    emitCJS: true
  }
})
