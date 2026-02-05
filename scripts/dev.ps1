# 开发模式启动脚本 (PowerShell)

Write-Host "🚀 Starting development environment..." -ForegroundColor Green

# 检查是否安装了依赖
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    pnpm install
}

# 构建共享包
Write-Host "🔨 Building shared packages..." -ForegroundColor Yellow
pnpm --filter @monorep/utils build
pnpm --filter @monorep/components build
pnpm --filter @monorep/cli build

# 启动开发服务器
Write-Host "🔧 Starting development servers..." -ForegroundColor Yellow
Write-Host ""
Write-Host "📍 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "📍 Backend:  http://localhost:3001" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Yellow
Write-Host ""

# 使用 parallel 模式启动所有开发服务器
pnpm -r --parallel dev