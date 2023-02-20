import * as esbuild from 'esbuild'

await esbuild.build({
  bundle: true,
  entryPoints: ['src/index.ts'],
  outfile: 'dist/create-lint-config.cjs',
  format: 'cjs',
  platform: 'node',
  target: 'node14',
})
