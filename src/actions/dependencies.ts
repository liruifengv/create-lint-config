import { prompt } from '@astrojs/cli-kit'

import { error, info, spinner, title } from '../messages'
import install from '../../utils/install'

export async function installDependencies() {
  await spinner({
    start: `Dependencies installing with npm...`,
    end: 'Dependencies installed',
    while: () =>
      install({
        cwd: process.cwd(),
        pkgManager: 'npm',
        _arguments: ['install'],
      }).catch((e) => {
        error('error', e)
        process.exit(1)
      }),
  })
}

export async function dependencies(input: boolean) {
  if (input) {
    ({ needInstall } = await prompt({
      name: 'needInstall',
      type: 'confirm',
      label: title('deps'),
      message: `Install dependencies?`,
      hint: 'recommended',
      initial: true,
    }))
    if (needInstall) {
      await installDependencies()
    } else {
      await info('Install deps [skip]', 'Remember to install dependencies after setup.')
    }
  } else {
    await installDependencies()
  }
}
