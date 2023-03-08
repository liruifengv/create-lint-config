module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['standard-with-typescript', 'prettier', 'plugin:@typescript-eslint/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: [],
  rules: {},
}
