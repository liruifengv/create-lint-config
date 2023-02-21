import { execa } from 'execa'

async function install({ pkgManager, cwd, _arguments }: { pkgManager: string; cwd: string; arguments: array }) {
  const installExec = execa(pkgManager, _arguments, { cwd })
  return new Promise<void>((resolve, reject) => {
    installExec.on('error', (e) => reject(e))
    installExec.on('close', () => resolve())
  })
}

export default install
