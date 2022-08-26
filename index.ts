#!/usr/bin/env node
import prompts from 'prompts'
import { red } from 'kolorist'

async function init() {
  console.log('init')
  const cwd = process.cwd()

  let result: {
    needsEslint?: boolean
    styleGuide?: string
    needsPrettier?: boolean
  } = {}

  try {
    result = await prompts(
      [
        {
          name: 'needsEslint',
          type: () => 'toggle',
          message: 'Add ESLint for code quality?',
          initial: true,
          active: 'Yes',
          inactive: 'No'
        },
        {
          name: 'styleGuide',
          type: (prev, values) => {
            if (!values.needsEslint) {
              return null
            }
            return 'select'
          },
          message: 'Select a Linter Config:',
          choices: [
            { title: 'Default Config', value: 'default' },
            { title: 'Airbnb Config', value: 'airbnb' },
            { title: 'Standard Config', value: 'standard' }
          ]
        },
        {
          name: 'needsPrettier',
          type: (prev, values) => {
            if (!values.needsEslint) {
              return null
            }
            return 'toggle'
          },
          message: 'Add Prettier for code formatting?',
          initial: true,
          active: 'Yes',
          inactive: 'No'
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        }
      }
    )
  } catch (cancelled) {
    console.log(cancelled.message)
    process.exit(1)
  }

  const { needsEslint, styleGuide, needsPrettier } = result
  console.log('needsEslint:', needsEslint)
  console.log('styleGuide:', styleGuide)
  console.log('needsPrettier:', needsPrettier)
  
}

init().catch((e) => {
  console.error(e)
})