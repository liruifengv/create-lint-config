#!/usr/bin/env node
import * as fs from 'node:fs'
import { color, label } from '@astrojs/cli-kit'
import { copy } from './copyTemplate'
import { execa } from 'execa';

async function install({ pkgManager, cwd, _arguments}: { pkgManager: string; cwd: string, arguments: array }) {
	const installExec = execa(pkgManager, _arguments, { cwd });
	return new Promise<void>((resolve, reject) => {
		installExec.on('error', (e) => reject(e));
		installExec.on('close', () => resolve());
	});
}

async function init() {
  if (!fs.existsSync('./package.json')) {
    throw new Error(color.red('✖') + ' package.json not found')
  }
  console.log(`Welcome to use ${label('create-lint-config!', color.bgGreen, color.black)}`)
  // base template
  copy('base')

  console.log('Dependencies installing with npm...')

  try {
    await install({
      cwd: process.cwd(),
      pkgManager: 'npm',
      _arguments: ['install']
    })
  } catch (e) {
    error('error', e);
    process.exit(1);
  }

  console.log('Dependencies installed')

  console.log('husky initing...')
  try {
    await install({
      cwd: process.cwd(),
      pkgManager: 'npx',
      _arguments: ['husky', 'install']
    })

    const commitlint = 'npx --no-install commitlint --edit ""'
    await install({
      cwd: process.cwd(),
      pkgManager: 'npx',
      _arguments: ['husky', 'add', '.husky/commit-msg ', commitlint]
    })

    const lintstaged = 'npx lint-staged'
    await install({
      cwd: process.cwd(),
      pkgManager: 'npx',
      _arguments: ['husky', 'add', '.husky/pre-commit ', lintstaged]
    })
  } catch (e) {
    error('error', e);
    process.exit(1);
  }
  console.log('husky done')

  console.log('\nNow run:\n')
  console.log(`  ${color.bold(color.green('npm install'))}`)
  console.log(`  ${color.bold(color.green('npm run lint'))}`)
  console.log(`  ${color.bold(color.green('npm run format'))}`)
  console.log(`  ${color.bold(color.green('npm run style'))}`)
  console.log('\n You can delete any file or script you don\'t need. \n')
  console.log()
}

init().catch((e) => {
  console.error(e)
})
