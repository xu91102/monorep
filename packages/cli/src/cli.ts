#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { formatGreeting } from '@monorep/utils';
import { build, test, lint, clean, dev } from './index.js';

const program = new Command();

// 显示欢迎信息
console.log(chalk.green(formatGreeting('Monorepo CLI')));

program.name('monorep').description('CLI tools for monorepo management').version('1.0.0');

// 构建命令
program
  .command('build')
  .description('Build all packages')
  .option('-p, --package <pkg>', 'Build specific package')
  .action(async (options) => {
    try {
      await build(options);
    } catch (error) {
      console.error(chalk.red('Build failed:'), error);
      process.exit(1);
    }
  });

// 测试命令
program
  .command('test')
  .description('Run tests for all packages')
  .option('-p, --package <pkg>', 'Test specific package')
  .option('-w, --watch', 'Watch mode')
  .action(async (options) => {
    try {
      await test(options);
    } catch (error) {
      console.error(chalk.red('Tests failed:'), error);
      process.exit(1);
    }
  });

// 代码检查命令
program
  .command('lint')
  .description('Run linting for all packages')
  .option('-f, --fix', 'Fix linting issues')
  .action(async (options) => {
    try {
      await lint(options);
    } catch (error) {
      console.error(chalk.red('Linting failed:'), error);
      process.exit(1);
    }
  });

// 清理命令
program
  .command('clean')
  .description('Clean build artifacts')
  .option('-a, --all', 'Clean everything including node_modules')
  .action(async (options) => {
    try {
      await clean(options);
    } catch (error) {
      console.error(chalk.red('Clean failed:'), error);
      process.exit(1);
    }
  });

// 开发命令
program
  .command('dev')
  .description('Start development mode')
  .option('-p, --package <pkg>', 'Start specific package')
  .action(async (options) => {
    try {
      await dev(options);
    } catch (error) {
      console.error(chalk.red('Dev mode failed:'), error);
      process.exit(1);
    }
  });

// 解析命令行参数
program.parse();
