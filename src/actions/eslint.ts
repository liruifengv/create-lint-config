import { prompt } from '@astrojs/cli-kit'

import { copy } from '../copyTemplate'
import { error, info, spinner, title } from '../messages'

export async function eslint(input: boolean) {
  if (input) {
    ({ needEslint } = await prompt({
      name: 'needEslint',
      type: 'confirm',
      label: title('EslintConfig'),
      message: `Need Eslint?`,
      hint: 'recommended',
      initial: true,
    }))
    if (needEslint) {
      await spinner({
        start: `Eslint config generating...`,
        end: 'Eslint generated',
        while: () => {
          try {
            copy('eslint-base')
          } catch (e) {
            error('error', e)
            process.exit(1)
          }
        },
      })
    } else {
      await info('Eslint [skip]', "Don't  need Eslint")
    }
  }
}
