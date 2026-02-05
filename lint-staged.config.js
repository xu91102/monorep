/**
 * Lint-staged 配置
 * 在 git commit 前对暂存文件执行检查
 */
export default {
  // TypeScript 和 Vue 文件
  '*.{ts,tsx,vue}': ['eslint --fix', 'prettier --write', () => 'pnpm typecheck'],

  // JSON、Markdown、YAML 文件
  '*.{json,md,yml,yaml}': ['prettier --write'],

  // JavaScript 文件
  '*.{js,jsx,mjs,cjs}': ['eslint --fix', 'prettier --write'],

  // CSS 文件
  '*.{css,scss,less}': ['prettier --write'],
};
