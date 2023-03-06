module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-case': [
      2,
      'always',
      [
        'lower-case',
        'upper-case',
        'camel-case',
        'kebab-case',
        'pascal-case',
        'sentence-case',
        'snake-case',
        'start-case',
      ],
    ],
    'subject-case': [0],
  },
}
