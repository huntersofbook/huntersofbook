import { addComponent, addImports, defineNuxtModule } from '@nuxt/kit'
import type { } from '@nuxt/schema'
import { name, version } from '../package.json'

interface Options {
}

export default defineNuxtModule({
  meta: {
    name,
    version,
    configKey: 'printOrPDF',
    compatibility: {
      nuxt: '^3.1.1',
    },
  },
  setup(_options: Options) {
    addImports([{
      name: 'usePrintOrPDF',
      from: '@huntersofbook/print-or-pdf',
    }])

    addComponent({
      name: 'PrintOrPDF',
      export: 'PrintOrPDF',
      filePath: '@huntersofbook/print-or-pdf',
    })
  },
})
