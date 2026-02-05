#!/bin/bash

# 设置开发环境脚本

echo "🚀 Setting up monorepo development environment..."

# 检查 Node.js 版本
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js >= 18.0.0"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2)
REQUIRED_NODE_VERSION="18.0.0"

if ! node -e "process.exit(require('semver').gte('$NODE_VERSION', '$REQUIRED_NODE_VERSION') ? 0 : 1)" 2>/dev/null; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please install Node.js >= $REQUIRED_NODE_VERSION"
    exit 1
fi

# 检查 pnpm
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
fi

# 安装依赖
echo "📦 Installing dependencies..."
pnpm install

# 构建共享包
echo "🔨 Building shared packages..."
pnpm --filter @monorep/utils build
pnpm --filter @monorep/components build
pnpm --filter @monorep/cli build

echo "✅ Setup complete!"
echo ""
echo "Available commands:"
echo "  pnpm dev              - Start development mode for all packages"
echo "  pnpm build            - Build all packages"
echo "  pnpm test             - Run all tests"
echo "  pnpm lint             - Check code style"
echo "  pnpm format           - Format code"
echo ""
echo "Package-specific commands:"
echo "  pnpm --filter @monorep/backend dev    - Start backend development server"
echo "  pnpm --filter @monorep/frontend dev   - Start frontend development server"
echo "  pnpm --filter @monorep/cli cli        - Run CLI tool"
echo ""
echo "Happy coding! 🎉"