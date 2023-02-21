import { prompt } from '@astrojs/cli-kit'

import { copy } from '../copyTemplate'
import { error, info, spinner, title } from '../messages'

export async function commitlint(input: boolean) {
  if (input) {
    const { needCommitlint } = await prompt({
      name: 'needCommitlint',
      type: 'confirm',
      label: title('Commitlint'),
      message: `Need Commitlint?`,
      hint: 'recommended',
      initial: true,
    })
    if (needCommitlint) {
      await spinner({
        start: `Commitlint config generating...`,
        end: 'Commitlint generated',
        while: () => {
          try {
            copy('commitlint-base')
          } catch (e) {
            error('error', e)
            process.exit(1)
          }
        },
      })
    } else {
      await info('Commitlint [skip]', "Don't  need Commitlint")
    }
  }
}
