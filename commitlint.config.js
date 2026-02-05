/**
 * Commitlint 配置
 * 使用 Conventional Commits 规范
 * @see https://commitlint.js.org/
 */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档更新
        'style', // 代码格式调整（不影响代码运行）
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试相关
        'build', // 构建系统或外部依赖变更
        'ci', // CI 配置文件和脚本变更
        'chore', // 其他不修改 src 或测试文件的变更
        'revert', // 回退之前的提交
      ],
    ],
    'subject-case': [0], // 不限制 subject 的大小写
  },
};
