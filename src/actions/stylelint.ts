import { prompt } from '@astrojs/cli-kit'

import { copy } from '../copyTemplate'
import { error, info, spinner, title } from '../messages'

export async function stylelint(input: boolean) {
  if (input) {
    ({ needStylelint } = await prompt({
      name: 'needStylelint',
      type: 'confirm',
      label: title('Stylelint'),
      message: `Need Stylelint?`,
      hint: 'recommended',
      initial: true,
    }))
    if (needStylelint) {
      await spinner({
        start: `Stylelint config generating...`,
        end: 'Stylelint generated',
        while: () => {
          try {
            copy('stylelint-base')
          } catch (e) {
            error('error', e)
            process.exit(1)
          }
        },
      })
    } else {
      await info('Stylelint [skip]', "Don't need Stylelint")
    }
  }
}
