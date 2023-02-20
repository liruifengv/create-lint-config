#!/usr/bin/env node
import * as fs from 'node:fs'
import * as path from 'node:path'
import deepMerge from '../utils/deepMerge'

export function copy(templateName: string) {
  console.log(`Init ${templateName} config...`)
  const cwd = process.cwd();
  const root = path.join(cwd, './');
  const templateRoot = path.resolve(__dirname, '../template')
  const eslintTemplate = path.resolve(templateRoot, templateName)
  const files = fs.readdirSync(eslintTemplate)

  for (const file of files) {
    if (file === 'package.json') {
      const existingPkg = JSON.parse(fs.readFileSync('./package.json'))
      const pkg = JSON.parse(fs.readFileSync(path.join(eslintTemplate, file)))
      const updatedPkg = deepMerge(existingPkg, pkg)
      fs.writeFileSync('./package.json', JSON.stringify(updatedPkg, null, 2) + '\n')
    } else {
      const targetPath = path.join(root, file)
      fs.copyFileSync(path.join(eslintTemplate, file), targetPath)
    }
  }
  console.log(`${templateName} config Done!`)
}
