# create-lint-config

![version](https://img.shields.io/npm/v/create-lint-config)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/liruifengv/create-lint-config/pulls)
![license](https://img.shields.io/npm/l/create-lint-config)
![npm total downloads](https://img.shields.io/npm/dt/create-lint-config.svg)
![npm month downloads](https://img.shields.io/npm/dm/create-lint-config.svg)
![downloads](https://img.shields.io/npm/dw/create-lint-config)

[English](<(./README.md)>) | 简体中文

### 一个一键创建所有的 lint 配置的 CLI 命令行工具。

#### 前端工程中特别多的配置文件例如 Eslint、Prettier 等让我们心烦意乱。我们的目标是快速而轻松地生成这些配置！

## 使用

### 1. 使用默认

我们提供一键生成所有默认配置的快捷方法，它包含 Eslint、Prettier、StyleLint、CommitLint、husky、lint-staged 等等。

在你的项目根目录执行以下命令：

```bash
# npm
npm create lint-config@latest

# yarn
yarn create lint-config

# pnpm
pnpm create lint-config@latest
```

![screenshot](screenshot.png)

### 2. 交互式选择

你也可以传递`--input / -i`标志来启用更灵活的选项，一步步生成你想要的配置

```bash
# npm 6.x
npm create lint-config@latest -i
# npm 7+, 需要传递额外的双破折号。
npm create lint-config@latest -- -i
```

![screenshot-i](screenshot-i.png)

## 3. 使用 `--template` 标志

你可以通过传递`--template`标志来使用模板。

```bash
# npm 6.x
npm create lint-config@latest --template vue
# npm 7+, 需要传递额外的双破折号。
npm create lint-config@latest -- --template vue
```
更多模板见[template 文件夹](https://github.com/liruifengv/create-lint-config/tree/main/template)。

你也可以通过 [PR](https://github.com/liruifengv/create-lint-config/pulls) 来提交你自己的模板。

未来计划支持
- [x] vue
- [ ] vue-ts
- [ ] react
- [ ] react-ts
- [ ] node
- [ ] node-ts
- [ ] astro
- [ ] svelte
- [ ] solidjs
- [ ] and more

## 功能

- [x] 生成 Eslint 配置。
- [x] 生成 prettier 配置。
- [x] 生成 stylelint 配置。
- [x] 生成 husky 配置。
- [x] 生成 commitlint 配置。
- [ ] 期待更多。

### CLI Flags

| Name                | Description                        |
| :------------------ | :--------------------------------- |
| `--help` (`-h`)     | 提供帮助信息                       |
| `--template <name>` |          使用模板                  |
| `--input` (`-i`)    | 使用提示一步一步地配置你想要的东西 |

## 遇到问题？

如果你遇到任何问题欢迎[联系我](https://github.com/liruifengv/create-lint-config/issues)。

## 贡献指南

贡献指南正在到来。

你仍然可以提交 PR，帮助创建更多模板，以及支持更多配置

你也可以 fork 此项目变成你自己的脚手架。也可以发布到公司的私有化 npm ，成为你的 KPI 项目。这是被允许的。

## 开源协议

create-lint-config 使用 MIT 协议发布。在 [LICENSE](./LICENSE) 文件查看详情。
