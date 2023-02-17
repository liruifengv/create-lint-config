#!/usr/bin/env node
import * as fs from 'node:fs'
import * as path from 'node:path'
import deepMerge from '../utils/deepMerge'
import { color, label } from '@astrojs/cli-kit';

async function init () {
  if (!fs.existsSync('./package.json')) {
    throw new Error(color.red("✖") + " package.json not found");
  }
  console.log(`Welcome to use ${label('create-lint-config!', color.bgGreen, color.black)}`)
  const __dirname = path.resolve()
  const templateRoot = path.resolve(__dirname, 'template')
  // eslint
  console.log('Init eslint config...')
  const eslintTemplate = path.resolve(templateRoot, 'eslint-base')
  const files = fs.readdirSync(eslintTemplate)

  for (const file of files) {
    if (file === 'package.json') {
      const existingPkg = JSON.parse(fs.readFileSync('./package.json'))
      const pkg = JSON.parse(fs.readFileSync(path.join(eslintTemplate, file)))
      const updatedPkg = deepMerge(existingPkg, pkg)
      fs.writeFileSync('./package.json', JSON.stringify(updatedPkg, null, 2) + '\n')
    } else {
      const targetPath = path.join(__dirname, file)
      fs.copyFileSync(path.join(eslintTemplate, file), targetPath)
    }
  }
  console.log('Eslint config Done!')

  console.log(`\nNow run:\n`);
  console.log(`  ${color.bold(color.green("npm install"))}`);
  console.log(`  ${color.bold(color.green("npm run lint"))}`);
  console.log();
}

init().catch((e) => {
  console.error(e)
})