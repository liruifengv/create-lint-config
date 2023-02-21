import { printHelp } from '../messages.js'

export function help() {
  printHelp({
    commandName: 'npm create lint-config',
    usage: '[...flags]',
    headline: 'Create all lint configuration files.',
    tables: {
      Flags: [
        ['--template <name>', 'Specify your template.'],
        ['--input (-i)', 'Use prompt step by step.'],
      ],
    },
  })
}
