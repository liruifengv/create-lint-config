#!/usr/bin/env node
import * as fs from 'node:fs'
import * as path from 'node:path'
import { copy } from './copyTemplate'
import { color, label } from '@astrojs/cli-kit'
import { error, spinner, title } from './messages'
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
    error('NOT FOUND', 'package.json is not found')
    process.exit(1)
  }
  console.log(`Welcome to use ${label('create-lint-config!', color.bgGreen, color.black)}`)

  const cleanArgv = process.argv.slice(2).filter((arg) => arg !== '--')

  const ctx = getContext(cleanArgv)

  if (ctx.help) {
    help()
    return
  }

  console.log(title('Starting!'))
  if (ctx.template) {
    const templateRoot = path.resolve(__dirname, '../template')
    const template = path.resolve(templateRoot, ctx.template)
    if (!fs.existsSync(template)) {
      error('INVAILD TEMPLATE', 'template is invalid')
      process.exit(1)
    }
    await spinner({
      start: `template ${ctx.template} copying...`,
      end: `Template ${ctx.template} copied`,
      while: () => {
        try {
          copy(ctx.template)
        } catch (e) {
          error('error', e)
          process.exit(1)
        }
      },
    })
    const steps = [husky, dependencies]
    for (const step of steps) {
      await step(ctx.input)
    }
    success()
    return
  }

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
