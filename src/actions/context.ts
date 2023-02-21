import arg from 'arg'

export interface Context {
  help: boolean
  input: boolean
  template?: string
}

export function getContext(argv: string[]): Flags {
  const flags = arg(
    {
      '--template': String,
      '--input': Boolean,
      '--help': Boolean,

      '-i': '--input',
      '-h': '--help',
    },
    { argv, permissive: true }
  )

  const { '--help': help = false, '--template': template, '--input': input = false } = flags

  const context: Context = {
    help,
    input,
    template,
  }

  return context
}
