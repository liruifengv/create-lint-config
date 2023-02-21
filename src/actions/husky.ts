import { prompt } from '@astrojs/cli-kit'

import { error, info, spinner, title } from '../messages'
import install from '../../utils/install'

export async function installHusky() {
  await spinner({
    start: `Husky installing...`,
    end: 'Husky installed',
    while: () =>
      install({
        cwd: process.cwd(),
        pkgManager: 'npx',
        _arguments: ['husky', 'install'],
      }).catch((e) => {
        error('error', e)
        process.exit(1)
      }),
  })

  await spinner({
    start: `Adding commit-msg lint...`,
    end: 'Commit-msg lint added',
    while: () =>
      install({
        cwd: process.cwd(),
        pkgManager: 'npx',
        _arguments: ['husky', 'add', '.husky/commit-msg', 'npx --no-install commitlint --edit ""'],
      }).catch((e) => {
        error('error', e)
        process.exit(1)
      }),
  })

  await spinner({
    start: `Adding lint-staged...`,
    end: 'Lint-staged added',
    while: () =>
      install({
        cwd: process.cwd(),
        pkgManager: 'npx',
        _arguments: ['husky', 'add', '.husky/pre-commit', 'npx lint-staged'],
      }).catch((e) => {
        error('error', e)
        process.exit(1)
      }),
  })
}

export async function husky(input: boolean) {
  if (input) {
    ({ needHusky } = await prompt({
      name: 'needHusky',
      type: 'confirm',
      label: title('husky'),
      message: `Need husky to check commit-msg and lint-staged?`,
      hint: 'recommended',
      initial: true,
    }))
    if (needHusky) {
      await installHusky()
    } else {
      await info('Husky [skip]', "Don't need husky")
    }
  } else {
    await installHusky()
  }
}
