#!/bin/bash

# 开发模式启动脚本

echo "🚀 Starting development environment..."

# 检查是否安装了依赖
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    pnpm install
fi

# 构建共享包
echo "🔨 Building shared packages..."
pnpm --filter @monorep/utils build
pnpm --filter @monorep/components build
pnpm --filter @monorep/cli build

# 启动开发服务器
echo "🔧 Starting development servers..."
echo ""
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend:  http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# 使用 parallel 模式启动所有开发服务器
pnpm -r --parallel dev