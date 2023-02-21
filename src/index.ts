#!/usr/bin/env node
import * as fs from 'node:fs'
import { copy } from './copyTemplate'
import { color, label } from '@astrojs/cli-kit'
import { error, info, spinner, title } from './messages'
import {
  help,
  eslint,
  prettier,
  commitlint,
  stylelint,
  husky,
  installHusky,
  dependencies,
  installDependencies,
  success,
  getContext,
} from './actions'

async function init() {
  if (!fs.existsSync('./package.json')) {
    throw new Error(color.red('✖') + ' package.json not found')
  }
  console.log(`Welcome to use ${label('create-lint-config!', color.bgGreen, color.black)}`)

  const cleanArgv = process.argv.slice(2).filter((arg) => arg !== '--')

  const ctx = getContext(cleanArgv)

  if (ctx.help) {
    help()
    return
  }

  if (ctx.template) {
    info('TODO', 'Template is coming soon!')
    return
  }

  console.log(title('Starting!'))
  if (ctx.input) {
    const steps = [eslint, prettier, commitlint, stylelint, husky, dependencies]
    for (const step of steps) {
      await step(ctx.input)
    }
    success()
    return
  }

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

  await installHusky()

  await installDependencies()

  success()
}

init().catch((e) => {
  console.error(e)
})
