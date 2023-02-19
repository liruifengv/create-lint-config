#!/usr/bin/env node
import * as fs from 'node:fs'
import { color, label } from '@astrojs/cli-kit'
import { copy } from './copyTemplate'

async function init () {
  if (!fs.existsSync('./package.json')) {
    throw new Error(color.red('✖') + ' package.json not found')
  }
  console.log(`Welcome to use ${label('create-lint-config!', color.bgGreen, color.black)}`)
  // eslint
  copy('eslint-base')
  copy('stylelint-base')

  console.log('\nNow run:\n')
  console.log(`  ${color.bold(color.green('npm install'))}`)
  console.log(`  ${color.bold(color.green('npm run lint'))}`)
  console.log(`  ${color.bold(color.green('npm run style'))}`)
  console.log()
}

init().catch((e) => {
  console.error(e)
})
