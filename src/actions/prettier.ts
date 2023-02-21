import { prompt } from '@astrojs/cli-kit'

import { copy } from '../copyTemplate'
import { error, info, spinner, title } from '../messages'

export async function prettier(input: boolean) {
  if (input) {
    const { needPrettier } = await prompt({
      name: 'needPrettier',
      type: 'confirm',
      label: title('Prettier'),
      message: `Need Prettier?`,
      hint: 'recommended',
      initial: true,
    })
    if (needPrettier) {
      await spinner({
        start: `Prettier config generating...`,
        end: 'Prettier generated',
        while: () => {
          try {
            copy('prettier-base')
          } catch (e) {
            error('error', e)
            process.exit(1)
          }
        },
      })
    } else {
      await info('Prettier [skip]', "Don't need Prettier")
    }
  }
}
