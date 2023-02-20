#!/usr/bin/env node
import * as fs from 'node:fs'
import { copy } from './copyTemplate'
import { execa } from 'execa'
import { color, label } from '@astrojs/cli-kit'
import { error, info, spinner, title } from './messages'

async function install({ pkgManager, cwd, _arguments }: { pkgManager: string; cwd: string; arguments: array }) {
  const installExec = execa(pkgManager, _arguments, { cwd })
  return new Promise<void>((resolve, reject) => {
    installExec.on('error', (e) => reject(e))
    installExec.on('close', () => resolve())
  })
}

async function init() {
  if (!fs.existsSync('./package.json')) {
    throw new Error(color.red('✖') + ' package.json not found')
  }
  console.log(`Welcome to use ${label('create-lint-config!', color.bgGreen, color.black)}`)
  console.log(title('Starting!'))
  await spinner({
    start: `Base template copying...`,
    end: 'Template copied',
    while: () => {
      try {
        copy('base')
      } catch (e) {
        error('error', e)
        process.exit(1)
      }
    },
  })

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

  await spinner({
    start: `Husky installing...`,
    end: 'Husky installed',
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
  console.log(title('Success!'))
  console.log("\n You can delete any file or script you don't need. \n")
  console.log(title('Now run'))
  info('lint: ', 'npm run lint')
  info('format: ', 'npm run format')
  info('style: ', 'npm run style')
}

init().catch((e) => {
  console.error(e)
})
