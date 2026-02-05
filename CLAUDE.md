# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目结构

这是一个使用 pnpm 管理的 monorepo 项目，包含以下结构：

```
monorep/
├── apps/
│   ├── backend/          # 后端应用 (@monorep/backend) - Express + TypeScript
│   └── frontend/         # 前端应用 (@monorep/frontend) - Vue 3 + Vite + TypeScript
├── packages/
│   ├── cli/              # CLI 工具 (@monorep/cli) - 命令行工具
│   ├── components/       # 共享组件 (@monorep/components) - Vue 3 组件库
│   └── utils/           # 工具函数 (@monorep/utils) - TypeScript 工具函数
├── scripts/             # 开发脚本
├── pnpm-workspace.yaml   # Workspace 配置
├── tsconfig.json         # TypeScript 配置
├── prettier.config.js    # Prettier 代码格式化配置
└── package.json         # 根包配置
```

## 常用命令

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 7.0.0

### 快速开始

```bash
# 设置开发环境
./scripts/setup.sh  # Linux/macOS
./scripts/setup.ps1 # Windows PowerShell

# 启动开发环境
./scripts/dev.sh    # Linux/macOS
./scripts/dev.ps1  # Windows PowerShell

# 或者使用 pnpm 命令
pnpm install
pnpm dev
```

### 基础命令

```bash
# 安装所有依赖
pnpm install

# 开发模式（启动所有包）
pnpm dev

# 构建所有包
pnpm build

# 测试所有包
pnpm -r test

# 代码检查和格式化
pnpm lint
pnpm format

# TypeScript 类型检查
pnpm typecheck

# 清理构建产物
pnpm clean
```

### 单独包操作

```bash
# 启动后端开发服务器 (http://localhost:3001)
pnpm --filter @monorep/backend dev

# 启动前端开发服务器 (http://localhost:3000)
pnpm --filter @monorep/frontend dev

# 构建组件包
pnpm --filter @monorep/components build

# 运行 utils 包测试
pnpm --filter @monorep/utils test

# 使用 CLI 工具
pnpm --filter @monorep/cli cli build
pnpm --filter @monorep/cli cli dev --package backend

# 为特定包添加依赖
pnpm add package-name --filter=@monorep/package-name
```

## 架构特点

### 后端应用 (@monorep/backend)

- Express.js 服务器
- TypeScript 支持
- 使用共享工具包 @monorep/utils
- CORS 支持
- 健康检查端点

### 前端应用 (@monorep/frontend)

- Vue 3 + Composition API
- Vite 构建工具
- Vue Router 路由管理
- Pinia 状态管理
- TypeScript 支持
- 使用共享组件和工具包

### 共享组件库 (@monorep/components)

- Vue 3 组件库
- TypeScript 类型支持
- 包含基础 UI 组件：
  - BaseButton: 支持不同类型和尺寸的按钮
  - BaseCard: 卡片容器组件
  - BaseModal: 模态框组件
- 支持全局注册

### 工具函数库 (@monorep/utils)

- 纯 TypeScript 工具函数
- 包含常用功能：
  - formatGreeting: 格式化欢迎消息
  - delay: 延迟执行
  - generateRandomString: 生成随机字符串
  - deepFreeze: 深度冻结对象
  - safeJsonParse: 安全 JSON 解析
  - retry: 重试机制

### CLI 工具 (@monorep/cli)

- 基于 Commander.js 的命令行工具
- 支持的命令：
  - build: 构建包
  - test: 运行测试
  - lint: 代码检查
  - clean: 清理构建产物
  - dev: 开发模式

## 代码规范

### TypeScript 配置

- 目标版本：ESNext
- 模块系统：ESNext modules
- 路径别名：
  - `@/*` -> `src/*`
  - `#/*` -> `types/*`
- 启用装饰器支持
- 包含 Vue 文件支持

### 代码风格 (Prettier)

- 单行字符数：100
- 使用单引号
- 语句末尾添加分号
- 添加尾随逗号 (all)
- HTML 空白符敏感度：strict

### 包命名规范

- 所有包使用 `@monorep/` 命名空间前缀
- 使用 kebab-case 命名 (如 `@monorep/utils`)

## 开发注意事项

1. **包依赖关系**：
   - backend 和 frontend 都依赖 utils 包
   - frontend 依赖 components 包
   - cli 依赖 utils 包

2. **开发工作流**：
   - 先构建共享包（utils, components, cli）
   - 再启动应用开发服务器
   - 使用 scripts/ 中的脚本可以简化流程

3. **端口分配**：
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

4. **热重载**：
   - 前端使用 Vite 热重载
   - 后端使用 tsx watch 模式
   - 共享包修改后需要重新构建

5. **代码格式化**：
   - 已配置 Prettier，建议配合编辑器插件使用
   - 使用 `pnpm format` 格式化所有代码

## 项目状态

✅ 已完成的架构搭建：

- 完整的 monorepo 结构
- TypeScript 配置和类型支持
- Vue 3 前端应用基础
- Express 后端应用基础
- 共享组件库和工具函数
- CLI 工具
- 开发脚本和文档

🚀 项目已可正常运行开发
