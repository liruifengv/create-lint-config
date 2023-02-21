# create-lint-config

![version](https://img.shields.io/npm/v/create-lint-config)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/liruifengv/create-lint-config/pulls)
![license](https://img.shields.io/npm/l/create-lint-config)
![npm total downloads](https://img.shields.io/npm/dt/create-lint-config.svg)
![npm month downloads](https://img.shields.io/npm/dm/create-lint-config.svg)
![downloads](https://img.shields.io/npm/dw/create-lint-config)

English | [简体中文](./README.zh-CN.md)

### An easy way to create all lint configuration.

#### A particularly large number of config files distracted us. Our goal is to generate these configurations quickly and easily!

## Usage

#### 1. Use default

We offer a shortcut method to generate all default configurations with one click, it includes Eslint, Prettier, StyleLint, CommitLint, husky, lint-staged, and many more.

Execute the following command at the root of your project:

```bash
# npm
npm create lint-config@latest

# yarn
yarn create lint-config

# pnpm
pnpm create lint-config@latest
```

![screenshot](screenshot.png)

#### 2. Use prompt step by step

You can also pass the `-input / -i` flag to enable more flexible options and generate the configuration you want step by step.

```bash
npm create lint-config@latest --input
npm create lint-config@latest -i
```

![screenshot-i](screenshot-i.png)

## Features

- [x] Generate eslint config.
- [x] Generate prettier config.
- [x] Generate stylelint config.
- [x] Generate husky config.
- [x] Generate commitlint config.
- [ ] And more.

### CLI Flags

| Name                | Description                                   |
| :------------------ | :-------------------------------------------- |
| `--help` (`-h`)     | Help info                                     |
| `--template <name>` | Coming soon                                   |
| `--input` (`-i`)    | Use prompt step by step to config your wanted |

## TODO

- Support for selecting templates by passing `-- template` flag.

## ISSUE

Please [contact me](https://github.com/liruifengv/create-lint-config/issues) if you encounter any problems.

## Contributing

Contribution guidelines are coming.

You can still give PR, create more template files and support more configurations.

You can also fork this project and turn it into your own scaffolding. This is allowed.

## License

create-lint-config is released under the MIT License. See the bundled
[LICENSE](./LICENSE) file for details.
