# 设置开发环境脚本 (PowerShell)

Write-Host "🚀 Setting up monorepo development environment..." -ForegroundColor Green

# 检查 Node.js
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js >= 18.0.0" -ForegroundColor Red
    exit 1
}

# 检查 pnpm
try {
    $pnpmVersion = pnpm -v
    Write-Host "✅ pnpm version: $pnpmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ pnpm is not installed. Installing pnpm..." -ForegroundColor Yellow
    npm install -g pnpm
}

# 安装依赖
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
pnpm install

# 构建共享包
Write-Host "🔨 Building shared packages..." -ForegroundColor Yellow
pnpm --filter @monorep/utils build
pnpm --filter @monorep/components build
pnpm --filter @monorep/cli build

Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Available commands:" -ForegroundColor Cyan
Write-Host "  pnpm dev              - Start development mode for all packages" -ForegroundColor White
Write-Host "  pnpm build            - Build all packages" -ForegroundColor White
Write-Host "  pnpm test             - Run all tests" -ForegroundColor White
Write-Host "  pnpm lint             - Check code style" -ForegroundColor White
Write-Host "  pnpm format           - Format code" -ForegroundColor White
Write-Host ""
Write-Host "Package-specific commands:" -ForegroundColor Cyan
Write-Host "  pnpm --filter @monorep/backend dev    - Start backend development server" -ForegroundColor White
Write-Host "  pnpm --filter @monorep/frontend dev   - Start frontend development server" -ForegroundColor White
Write-Host "  pnpm --filter @monorep/cli cli        - Run CLI tool" -ForegroundColor White
Write-Host ""
Write-Host "Happy coding! 🎉" -ForegroundColor Green