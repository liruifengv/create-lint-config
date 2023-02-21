import { info, title } from '../messages'

export function success() {
  console.log(title('Success!'))
  console.log("\n You can delete any file or script you don't need. \n")
  console.log(title('Now run'))
  info('lint: ', 'npm run lint')
  info('format: ', 'npm run format')
  info('style: ', 'npm run style')
}
