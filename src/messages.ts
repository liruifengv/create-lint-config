/* eslint no-console: 'off' */
import { color, label, say as houston, spinner as load } from '@astrojs/cli-kit'
import { align, sleep } from '@astrojs/cli-kit/utils'

let stdout = process.stdout
/** @internal Used to mock `process.stdout.write` for testing purposes */
export function setStdout(writable: typeof process.stdout) {
  stdout = writable
}

export async function say(messages: string | string[], { clear = false, hat = '' } = {}) {
  return houston(messages, { clear, hat, stdout })
}

export async function spinner(args: { start: string; end: string; while: (...args: any) => Promise<any> }) {
  await load(args, { stdout })
}

export const title = (text: string) => align(label(text), 'end', 7) + ' '

export const log = (message: string) => stdout.write(message + '\n')

export const info = async (prefix: string, text: string) => {
  await sleep(100)
  if (stdout.columns < 80) {
    log(`${' '.repeat(5)} ${color.cyan('◼')}  ${color.cyan(prefix)}`)
    log(`${' '.repeat(9)}${color.green(text)}`)
  } else {
    log(`${' '.repeat(5)} ${color.cyan('◼')}  ${color.cyan(prefix)} ${color.green(text)}`)
  }
}

export const error = async (prefix: string, text: string) => {
  if (stdout.columns < 80) {
    log(`${' '.repeat(5)} ${color.red('▲')}  ${color.red(prefix)}`)
    log(`${' '.repeat(9)}${color.dim(text)}`)
  } else {
    log(`${' '.repeat(5)} ${color.red('▲')}  ${color.red(prefix)} ${color.dim(text)}`)
  }
}
