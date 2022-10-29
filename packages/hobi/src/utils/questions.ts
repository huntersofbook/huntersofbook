import {
  blue,
  cyan,
  green,

  magenta,
  red,
  reset,
  yellow,
} from 'colorette'
import consola from 'consola'
import prompts from 'prompts'

type ColorFunc = (str: string | number) => string
interface Plugin {
  name: string
  display: string
  color: ColorFunc
  variants: PluginVariant[]
}
interface PluginVariant {
  name: string
  display: string
  color: ColorFunc
  customCommand?: string
}

const PLUGINS: Plugin[] = [
  {
    color: blue,
    display: 'Compile Plugins',
    name: 'compile-plugin',
    variants: [
      {
        name: 'ts-to-js',
        customCommand: 'tt',
        display: 'TS to JS',
        color: magenta,
      },
    ],
  },
]

export async function questions() {
  let result: prompts.Answers<
        'plugin'
    >
  try {
    result = await prompts([
      {
        type: 'select',
        name: 'plugin',
        message: reset('Select a tool:'),
        initial: 0,
        choices: PLUGINS.map((plugin) => {
          const pluginColor = plugin.color
          return {
            title: pluginColor(plugin.display || plugin.name),
            value: plugin,
          }
        }),
      },
      {
        type: (plugin: Plugin) =>
          plugin && plugin.variants ? 'select' : null,
        name: 'variant',
        message: reset('Select a plugin:'),
        choices: (plugin: Plugin) =>
          plugin.variants.map((variant) => {
            const variantColor = variant.color
            return {
              title: variantColor(variant.display || variant.name),
              value: variant.name,
            }
          }),
      },
    ])
  }
  catch (error) {
    console.log(error, 'e')
    return
  }
  // user choice associated with prompts
  const { plugin } = result

  consola.log(plugin)
}
