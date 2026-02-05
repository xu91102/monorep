# 更新日志

本文档记录了 monorep 项目架构搭建过程中的所有更改。

## [1.0.0] - 2024-12-05

### 🚀 新功能

- 完整的 pnpm monorepo 架构搭建
- TypeScript 配置和类型支持
- Vue 3 + Vite 前端应用
- Express + TypeScript 后端应用
- 共享组件库和工具函数
- CLI 工具
- 开发脚本和文档

### 📦 项目结构

#### 根目录配置

- **新增** `pnpm-workspace.yaml` - Workspace 配置
- **更新** `package.json` - 修正包名、添加开发脚本
- **新增** `scripts/setup.sh` - Linux/macOS 环境设置脚本
- **新增** `scripts/setup.ps1` - Windows PowerShell 环境设置脚本
- **新增** `scripts/dev.sh` - Linux/macOS 开发启动脚本
- **新增** `scripts/dev.ps1` - Windows PowerShell 开发启动脚本
- **更新** `CLAUDE.md` - 完整的项目文档

#### Apps

##### Backend Application (`@monorep/backend`)

- **更新** `package.json` - 添加依赖和脚本
  - 依赖：express, cors, @monorep/utils
  - 开发依赖：@types/express, @types/cors, tsx
- **新增** `tsconfig.json` - TypeScript 配置
- **新增** `src/index.ts` - Express 服务器入口文件
  - CORS 支持
  - 健康检查端点 `/health`
  - 使用共享工具函数
  - 运行端口：3001

##### Frontend Application (`@monorep/frontend`)

- **更新** `package.json` - 添加依赖和脚本
  - 依赖：vue, vue-router, pinia, @monorep/components, @monorep/utils
  - 开发依赖：@vitejs/plugin-vue, vite, vue-tsc
- **新增** `tsconfig.json` - TypeScript 配置
- **新增** `vite.config.ts` - Vite 构建配置
  - 代理配置：`/api` -> `http://localhost:3001`
  - 路径别名：`@` -> `./src`
- **新增** `index.html` - HTML 入口文件
- **新增** `src/main.ts` - Vue 应用入口
- **新增** `src/App.vue` - 根组件
- **新增** `src/router/index.ts` - Vue Router 配置
- **新增** `src/views/Home.vue` - 首页组件
- **新增** `src/views/About.vue` - 关于页面组件

#### Packages

##### CLI Tools (`@monorep/cli`)

- **新增** `package.json` - CLI 包配置
  - 依赖：commander, chalk, inquirer, ora
  - 二进制文件：`monorep` -> `dist/cli.js`
- **新增** `tsconfig.json` - TypeScript 配置
- **新增** `src/cli.ts` - CLI 入口文件
  - 支持 build, test, lint, clean, dev 命令
  - 彩色输出和进度指示器
- **新增** `src/index.ts` - 模块导出
- **新增** `src/commands/build.ts` - 构建命令
- **新增** `src/commands/test.ts` - 测试命令
- **新增** `src/commands/lint.ts` - 代码检查命令
- **新增** `src/commands/clean.ts` - 清理命令
- **新增** `src/commands/dev.ts` - 开发模式命令

##### Components Library (`@monorep/components`)

- **目录重命名** `packages/componets/` -> `packages/components/`
- **更新** `package.json` - 组件库配置
  - 对等依赖：vue
  - 开发依赖：@vitejs/plugin-vue, vite, vue-tsc
- **新增** `tsconfig.json` - TypeScript 配置
- **新增** `vite.config.ts` - 库构建配置
- **新增** `src/index.ts` - 组件导出和全局注册
- **新增** `src/components/types.ts` - TypeScript 类型定义
- **新增** `src/components/BaseButton.vue` - 按钮组件
  - 支持不同类型：primary, secondary, danger
  - 支持不同尺寸：small, medium, large
  - 支持禁用和加载状态
- **新增** `src/components/BaseCard.vue` - 卡片组件
  - 可选标题、边框、阴影
  - 支持头部、主体、底部插槽
- **新增** `src/components/BaseModal.vue` - 模态框组件
  - 支持遮罩关闭、ESC 关闭
  - 过渡动画效果
  - 可自定义标题和关闭按钮

##### Utils Library (`@monorep/utils`)

- **更新** `package.json` - 工具库配置
  - 开发依赖：jest, @types/jest, ts-jest
- **新增** `tsconfig.json` - TypeScript 配置
- **新增** `src/index.ts` - 工具函数导出
  - `formatGreeting(name: string)` - 格式化欢迎消息
  - `delay(ms: number)` - 延迟执行
  - `generateRandomString(length?: number)` - 生成随机字符串
  - `deepFreeze<T>(obj: T)` - 深度冻结对象
  - `safeJsonParse<T>(jsonString: string, defaultValue: T)` - 安全 JSON 解析
  - `retry<T>(fn: () => Promise<T>, maxRetries?, delayMs?)` - 重试机制

### 🔧 配置更新

#### TypeScript

- **根目录** `tsconfig.json` - 全局 TypeScript 配置
  - 路径别名：`@/*` -> `src/*`, `#/*` -> `types/*`
  - 支持装饰器和 Vue 文件
- **各包** `tsconfig.json` - 继承根配置，设置输出目录

#### Prettier

- `prettier.config.js` - 代码格式化配置
  - 100 字符行宽
  - 单引号
  - 尾随逗号
  - 分号

#### Package Scripts

**根目录** `package.json` 脚本：

- `dev` - 并行启动所有包的开发模式
- `build` - 构建所有包
- `test` - 运行所有测试
- `lint` - 代码检查
- `format` - 代码格式化
- `clean` - 清理构建产物
- `typecheck` - TypeScript 类型检查

### 🔗 包依赖关系

```
@monorep/backend
└── @monorep/utils

@monorep/frontend
├── @monorep/components
└── @monorep/utils

@monorep/cli
└── @monorep/utils

@monorep/components
└── vue (peer dependency)

@monorep/utils
└── (无内部依赖)
```

### 🌐 网络服务

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:3001
- **Backend API**: http://localhost:3001/health

### 📝 使用说明

#### 快速开始

```bash
# Windows
./scripts/setup.ps1  # 设置环境
./scripts/dev.ps1    # 启动开发

# Linux/macOS
./scripts/setup.sh   # 设置环境
./scripts/dev.sh     # 启动开发

# 或使用 pnpm
pnpm install
pnpm dev
```

#### 开发命令

```bash
# 构建所有包
pnpm build

# 运行测试
pnpm -r test

# 代码检查
pnpm lint

# 格式化代码
pnpm format

# 单独操作包
pnpm --filter @monorep/backend dev
pnpm --filter @monorep/frontend dev
pnpm --filter @monorep/components build
pnpm --filter @monorep/utils test
```

### ✅ 验证清单

- [x] pnpm workspace 配置正确
- [x] 所有包的 package.json 配置完整
- [x] TypeScript 配置继承正常
- [x] 包依赖关系正确建立
- [x] 开发脚本可以正常执行
- [x] 前端和后端可以独立开发
- [x] 共享包可以被正确引用
- [x] 代码格式化配置生效
- [x] CLI 工具可以正常使用
- [x] 文档完整准确

### 🐛 已知问题

- 无已知问题

### 🎯 下一步计划

- [ ] 添加测试框架配置
- [ ] 添加 CI/CD 配置
- [ ] 添加更多共享组件
- [ ] 添加更多工具函数
- [ ] 完善错误处理
- [ ] 添加日志系统

---

**注意**: 此文档记录了从初始空项目到完整 monorepo 架构的所有更改。所有更改都已验证可以正常工作。
