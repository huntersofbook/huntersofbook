import prompts from 'prompts'

export interface QuestionPlugin {
  name: string
  display: string
  variants: PluginVariant[]
}
interface PluginVariant {
  name: string
  display: string
  customCommand?: string
}

export async function questions(question: prompts.PromptObject[], choices?: QuestionPlugin[]) {
  let result: prompts.Answers<string> | undefined
  const choice: QuestionPlugin[] = [
    // {
    //   display: 'Compile Plugins',
    //   name: 'compile-plugin',
    //   variants: [
    //     {
    //       name: 'ts-to-js',
    //       customCommand: 'tt',
    //       display: 'TS to JS',
    //     },
    //   ],
    // },
  ]
  if (choices && choices.length > 0)
    choice.push(...choices)

  const questions = [
    // {
    //   type: 'select',
    //   name: 'ts-to-js',
    //   message: reset('Select a tool:'),
    //   initial: 0,
    //   choices: PLUGINS.map((plugin) => {
    //     // const pluginColor = plugin.color
    //     return {
    //       title: plugin.display || plugin.name,
    //       value: plugin,
    //     }
    //   }),
    // },
    // {
    //   type: (plugin: QuestionPlugin) =>
    //     plugin && plugin.variants ? 'select' : null,
    //   name: 'variant',
    //   message: reset('Select a plugin:'),
    //   choices: (plugin: QuestionPlugin) =>
    //     plugin.variants.map((variant) => {
    //     //   const variantColor = variant.color
    //       return {
    //         title: variant.display || variant.name,
    //         value: variant.name,
    //       }
    //     }),
    // },

  ] as prompts.PromptObject[]

  if (question && question.length > 0)
    questions.push(...question)

  try {
    result = await prompts(questions)
  }
  catch (error) {
    console.log(error, 'e')
    return null
  }
  return result
}
