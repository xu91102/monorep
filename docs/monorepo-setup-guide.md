# 企业级 Monorepo 搭建技术方案

## 目录

- [1. 项目概述](#1-项目概述)
- [2. 技术栈选型](#2-技术栈选型)
- [3. 项目结构设计](#3-项目结构设计)
- [4. 搭建流程](#4-搭建流程)
- [5. 核心配置详解](#5-核心配置详解)
- [6. 质量保障体系](#6-质量保障体系)
- [7. CI/CD 流水线](#7-cicd-流水线)
- [8. 最佳实践](#8-最佳实践)

---

## 1. 项目概述

### 1.1 什么是 Monorepo

Monorepo（单一代码仓库）是一种将多个项目或包存储在同一个代码仓库中的软件开发策略。

### 1.2 Monorepo 的优势

- **代码共享**：跨项目共享代码和组件更容易
- **统一工具链**：所有项目使用相同的构建工具、测试框架和代码规范
- **原子提交**：跨项目的变更可以在一次提交中完成
- **依赖管理**：统一管理依赖版本，避免版本冲突
- **重构便利**：大规模重构可以一次性完成

### 1.3 适用场景

- 多个相关联的前端应用
- 前后端分离的全栈项目
- 组件库 + 应用的组合
- 微服务架构的多个服务

---

## 2. 技术栈选型

### 2.1 核心技术栈

| 技术       | 版本  | 用途                     |
| ---------- | ----- | ------------------------ |
| pnpm       | 9.x   | 包管理器，支持 workspace |
| Turborepo  | 2.x   | Monorepo 构建系统        |
| TypeScript | 5.x   | 类型系统                 |
| Vue 3      | 3.5.x | 前端框架                 |
| Express    | 4.x   | 后端框架                 |
| Vite       | 5.x   | 前端构建工具             |

### 2.2 测试工具

| 工具       | 用途                               |
| ---------- | ---------------------------------- |
| Vitest     | 单元测试和集成测试                 |
| fast-check | 属性测试（Property-Based Testing） |
| Playwright | E2E 测试                           |

### 2.3 代码质量工具

| 工具        | 用途         |
| ----------- | ------------ |
| ESLint      | 代码检查     |
| Prettier    | 代码格式化   |
| Husky       | Git Hooks    |
| lint-staged | 暂存文件检查 |
| commitlint  | 提交信息规范 |

---

## 3. 项目结构设计

### 3.1 目录结构

```
monorep/
├── apps/                      # 应用目录
│   ├── backend/              # 后端应用
│   │   ├── src/
│   │   │   ├── config/       # 配置文件
│   │   │   ├── errors/       # 错误类定义
│   │   │   ├── middlewares/  # 中间件
│   │   │   ├── routes/       # 路由
│   │   │   ├── utils/        # 工具函数
│   │   │   └── index.ts      # 入口文件
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── frontend/             # 前端应用
│       ├── src/
│       │   ├── components/   # 页面组件
│       │   ├── router/       # 路由配置
│       │   ├── services/     # API 服务
│       │   ├── stores/       # 状态管理
│       │   └── views/        # 页面视图
│       ├── package.json
│       └── vite.config.ts
├── packages/                  # 共享包目录
│   ├── components/           # UI 组件库
│   │   ├── src/
│   │   │   ├── components/   # 组件实现
│   │   │   ├── composables/  # 组合式函数
│   │   │   └── index.ts
│   │   └── package.json
│   ├── types/                # 类型定义
│   ├── utils/                # 工具函数库
│   └── cli/                  # CLI 工具
├── .github/                   # GitHub 配置
│   └── workflows/            # CI/CD 工作流
│       ├── ci.yml
│       └── cd.yml
├── .husky/                    # Git Hooks
├── docs/                      # 文档目录
├── e2e/                       # E2E 测试
├── scripts/                   # 脚本文件
├── package.json               # 根 package.json
├── pnpm-workspace.yaml        # pnpm workspace 配置
├── turbo.json                 # Turborepo 配置
├── tsconfig.json              # TypeScript 根配置
└── vitest.config.ts           # Vitest 配置
```

### 3.2 包命名规范

- 使用 `@monorep/` 作为 scope
- 应用：`@monorep/backend`、`@monorep/frontend`
- 共享包：`@monorep/components`、`@monorep/utils`、`@monorep/types`

---

## 4. 搭建流程

### 4.1 初始化项目

#### 步骤 1：创建项目目录

```bash
mkdir monorep
cd monorep
```

#### 步骤 2：初始化 pnpm workspace

```bash
# 初始化根 package.json
pnpm init

# 创建 pnpm-workspace.yaml
cat > pnpm-workspace.yaml << EOF
packages:
  - 'apps/*'
  - 'packages/*'
EOF
```

#### 步骤 3：创建目录结构

```bash
# 创建应用目录
mkdir -p apps/backend/src
mkdir -p apps/frontend/src

# 创建共享包目录
mkdir -p packages/components/src
mkdir -p packages/types/src
mkdir -p packages/utils/src
mkdir -p packages/cli/src

# 创建其他目录
mkdir -p .github/workflows
mkdir -p .husky
mkdir -p docs
mkdir -p e2e
mkdir -p scripts
```

### 4.2 配置 TypeScript

#### 步骤 1：安装 TypeScript

```bash
pnpm add -D -w typescript @types/node
```

#### 步骤 2：创建根 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["ES2022"],
    "moduleResolution": "bundler",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": false,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  }
}
```

#### 步骤 3：为每个包创建 tsconfig.json

```json
// apps/backend/tsconfig.json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "types": ["node"],
    "lib": ["ESNext"],
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

### 4.3 配置 Turborepo

#### 步骤 1：安装 Turborepo

```bash
pnpm add -D -w turbo
```

#### 步骤 2：创建 turbo.json

```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^build"]
    },
    "typecheck": {
      "dependsOn": ["^build"]
    },
    "test": {
      "dependsOn": ["^build"],
      "outputs": ["coverage/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

#### 步骤 3：添加 Turborepo 脚本

在根 package.json 中添加：

```json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint && prettier --check .",
    "typecheck": "turbo run typecheck",
    "format": "prettier --write ."
  }
}
```

### 4.4 配置测试框架

#### 步骤 1：安装 Vitest

```bash
pnpm add -D -w vitest @vitest/ui @vitest/coverage-v8
```

#### 步骤 2：创建 vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/types/**',
        '**/*.config.ts',
        '**/coverage/**',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
    setupFiles: [resolve(__dirname, './vitest.setup.ts')],
  },
});
```

#### 步骤 3：安装 fast-check（属性测试）

```bash
pnpm add -D -w fast-check
```

#### 步骤 4：安装 Playwright（E2E 测试）

```bash
pnpm add -D -w @playwright/test
pnpm exec playwright install
```

### 4.5 配置代码质量工具

#### 步骤 1：安装 ESLint 和 Prettier

```bash
pnpm add -D -w eslint prettier eslint-config-prettier
pnpm add -D -w @typescript-eslint/eslint-plugin @typescript-eslint/parser
```

#### 步骤 2：创建 eslint.config.js

```javascript
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];
```

#### 步骤 3：创建 prettier.config.cjs

```javascript
module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 100,
  tabWidth: 2,
  endOfLine: 'lf',
};
```

#### 步骤 4：配置 Git Hooks

```bash
# 安装 husky
pnpm add -D -w husky lint-staged

# 初始化 husky
pnpm exec husky init

# 安装 commitlint
pnpm add -D -w @commitlint/cli @commitlint/config-conventional
```

创建 commitlint.config.js：

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore'],
    ],
  },
};
```

创建 lint-staged.config.js：

```javascript
module.exports = {
  '*.{ts,tsx,vue}': ['eslint --fix', 'prettier --write'],
  '*.{json,md,yml,yaml}': ['prettier --write'],
};
```

创建 .husky/pre-commit：

```bash
#!/usr/bin/env sh
pnpm lint-staged
```

创建 .husky/commit-msg：

```bash
#!/usr/bin/env sh
pnpm exec commitlint --edit $1
```

### 4.6 配置前端应用（Vue 3 + Vite）

#### 步骤 1：安装依赖

```bash
cd apps/frontend
pnpm add vue vue-router pinia
pnpm add -D vite @vitejs/plugin-vue
```

#### 步骤 2：创建 vite.config.ts

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
```

#### 步骤 3：创建基础文件结构

```
apps/frontend/src/
├── App.vue           # 根组件
├── main.ts           # 入口文件
├── router/
│   └── index.ts      # 路由配置
├── stores/
│   └── app.ts        # 状态管理
├── services/
│   ├── http.ts       # HTTP 客户端
│   └── api.ts        # API 接口
└── views/
    ├── Home.vue
    └── About.vue
```

### 4.7 配置后端应用（Express + TypeScript）

#### 步骤 1：安装依赖

```bash
cd apps/backend
pnpm add express cors winston zod prom-client
pnpm add -D @types/express @types/cors @types/node tsx nodemon
```

#### 步骤 2：创建基础文件结构

```
apps/backend/src/
├── index.ts              # 入口文件
├── config/
│   └── env.ts           # 环境配置
├── errors/
│   └── index.ts         # 错误类定义
├── middlewares/
│   ├── errorHandler.ts  # 错误处理
│   └── requestLogger.ts # 请求日志
├── routes/
│   ├── index.ts         # 路由汇总
│   ├── health.ts        # 健康检查
│   └── metrics.ts       # 监控指标
└── utils/
    ├── logger.ts        # 日志工具
    └── response.ts      # 响应工具
```

#### 步骤 3：配置开发脚本

在 package.json 中添加：

```json
{
  "scripts": {
    "dev": "nodemon --exec tsx src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  }
}
```

### 4.8 配置共享包

#### 步骤 1：配置 components 包

```bash
cd packages/components
pnpm add vue
pnpm add -D vite @vitejs/plugin-vue
```

package.json 配置：

```json
{
  "name": "@monorep/components",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./style.css": "./dist/style.css"
  },
  "files": ["dist"],
  "scripts": {
    "build": "vue-tsc && vite build",
    "test": "vitest run"
  }
}
```

#### 步骤 2：配置 utils 包

```bash
cd packages/utils
```

package.json 配置：

```json
{
  "name": "@monorep/utils",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsc",
    "test": "vitest run"
  }
}
```

#### 步骤 3：配置 types 包

```bash
cd packages/types
```

package.json 配置：

```json
{
  "name": "@monorep/types",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsc",
    "typecheck": "tsc --noEmit"
  }
}
```

### 4.9 配置包之间的依赖

在应用的 package.json 中引用共享包：

```json
{
  "dependencies": {
    "@monorep/components": "workspace:*",
    "@monorep/types": "workspace:*",
    "@monorep/utils": "workspace:*"
  }
}
```

安装依赖：

```bash
pnpm install
```

---

## 5. 核心配置详解

### 5.1 环境配置验证

使用 zod 进行环境变量验证：

```typescript
// apps/backend/src/config/env.ts
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z
    .string()
    .regex(/^\d+$/)
    .default('3000')
    .transform((val) => parseInt(val, 10)),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(): EnvConfig {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map(
        (err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`,
      );
      throw new Error(`环境变量验证失败:\n${errorMessages.join('\n')}`);
    }
    throw error;
  }
}
```

在应用启动时验证：

```typescript
// apps/backend/src/index.ts
import { validateEnv } from './config/env';

let config;
try {
  config = validateEnv();
  logger.info('环境变量验证成功', { env: config.NODE_ENV });
} catch (error) {
  logger.error('环境变量验证失败', { error });
  process.exit(1);
}
```

### 5.2 错误处理标准化

创建错误类层次结构：

```typescript
// apps/backend/src/errors/index.ts
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = '验证失败') {
    super(message, 400);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = '认证失败') {
    super(message, 401);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = '资源未找到') {
    super(message, 404);
  }
}
```

全局错误处理中间件：

```typescript
// apps/backend/src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import logger from '../utils/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // 记录错误日志
  logger.error('应用错误', {
    message: err.message,
    statusCode,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // 生产环境隐藏敏感信息
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Internal Server Error';
  }

  res.status(statusCode).json({
    success: false,
    code: statusCode,
    message,
  });
};
```

### 5.3 日志系统配置

使用 Winston 配置结构化日志：

```typescript
// apps/backend/src/utils/logger.ts
import winston from 'winston';
import path from 'path';

const { combine, timestamp, printf, colorize, errors, json } = winston.format;

const consoleFormat = printf(({ level, message, timestamp, stack, ...metadata }) => {
  let msg = `${timestamp} [${level}]: ${stack || message}`;
  if (Object.keys(metadata).length > 0) {
    msg += ` ${JSON.stringify(metadata)}`;
  }
  return msg;
});

const fileFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  errors({ stack: true }),
  json(),
);

const defaultMeta = {
  service: 'backend-api',
  environment: process.env.NODE_ENV || 'development',
};

const transports: winston.transport[] = [
  new winston.transports.Console({
    format: combine(colorize(), timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), consoleFormat),
  }),
];

if (process.env.NODE_ENV === 'production') {
  transports.push(
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs/error.log'),
      level: 'error',
      format: fileFormat,
    }),
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs/combined.log'),
      format: fileFormat,
    }),
  );
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true })),
  defaultMeta,
  transports,
});

export default logger;
```

### 5.4 请求日志和 Correlation ID

```typescript
// apps/backend/src/middlewares/requestLogger.ts
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import logger from '../utils/logger';

declare global {
  namespace Express {
    interface Request {
      correlationId?: string;
    }
  }
}

const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();

  // 生成或使用现有的 correlation ID
  const correlationId = (req.headers['x-correlation-id'] as string) || randomUUID();
  req.correlationId = correlationId;
  res.setHeader('X-Correlation-ID', correlationId);

  logger.info('请求开始', {
    correlationId,
    method: req.method,
    path: req.path,
    ip: req.ip,
  });

  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('请求完成', {
      correlationId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next();
};

export default requestLogger;
```

### 5.5 健康检查和监控

#### 健康检查端点

```typescript
// apps/backend/src/routes/health.ts
import { Router, Request, Response } from 'express';
import os from 'os';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();

  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const memoryUsagePercent = ((usedMemory / totalMemory) * 100).toFixed(2);

  const isHealthy = memoryUsagePercent < '90';

  const healthData = {
    status: isHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptime)}s`,
    memory: {
      heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
      systemUsage: `${memoryUsagePercent}%`,
    },
  };

  res.status(isHealthy ? 200 : 503).json(healthData);
});

export default router;
```

#### Prometheus Metrics

```typescript
// apps/backend/src/routes/metrics.ts
import { Router, Request, Response } from 'express';
import client from 'prom-client';

const router = Router();
const register = new client.Registry();

// 添加默认指标
client.collectDefaultMetrics({ register });

// 自定义指标
export const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5],
  registers: [register],
});

router.get('/', async (_req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  const metrics = await register.metrics();
  res.send(metrics);
});

export default router;
```

---

## 6. 质量保障体系

### 6.1 测试策略

#### 单元测试

使用 Vitest 编写单元测试：

```typescript
// packages/utils/src/__tests__/index.test.ts
import { describe, it, expect } from 'vitest';
import { formatGreeting } from '../index';

describe('formatGreeting', () => {
  it('should format greeting correctly', () => {
    expect(formatGreeting('World')).toBe('Hello, World!');
  });

  it('should handle empty string', () => {
    expect(formatGreeting('')).toBe('Hello, !');
  });
});
```

#### 属性测试

使用 fast-check 编写属性测试：

```typescript
// packages/utils/src/__tests__/properties.test.ts
import { describe, it } from 'vitest';
import fc from 'fast-check';
import { formatGreeting } from '../index';

describe('formatGreeting properties', () => {
  it('should always return a string', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = formatGreeting(input);
        return typeof result === 'string';
      }),
      { numRuns: 100 },
    );
  });

  it('should always include the input', () => {
    fc.assert(
      fc.property(fc.string(), (input) => {
        const result = formatGreeting(input);
        return result.includes(input);
      }),
      { numRuns: 100 },
    );
  });
});
```

#### E2E 测试

使用 Playwright 编写 E2E 测试：

```typescript
// e2e/example.spec.ts
import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page).toHaveTitle(/Monorep App/);
});

test('can navigate to about page', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.click('text=About');
  await expect(page).toHaveURL(/.*about/);
});
```

### 6.2 代码覆盖率

配置覆盖率阈值：

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
```

运行覆盖率测试：

```bash
pnpm test:coverage
```

### 6.3 类型检查

在 CI 中强制类型检查：

```bash
pnpm typecheck
```

### 6.4 代码规范检查

```bash
# Lint 检查
pnpm lint

# 格式化检查
pnpm format
```

---

## 7. CI/CD 流水线

### 7.1 CI 工作流

创建 `.github/workflows/ci.yml`：

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm typecheck

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  build:
    runs-on: ubuntu-latest
    needs: [lint, typecheck, test]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: build-artifacts
          path: |
            apps/*/dist
            packages/*/dist
```
