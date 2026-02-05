import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';
import chalk from 'chalk';
import ora from 'ora';

interface CleanOptions {
  all?: boolean;
}

export async function clean(options: CleanOptions): Promise<void> {
  const spinner = ora('Cleaning build artifacts...').start();

  try {
    // 清理构建产物
    spinner.text = 'Cleaning build artifacts...';
    execSync('pnpm -r clean', { stdio: 'inherit' });

    // 如果指定了 --all，也清理 node_modules
    if (options.all) {
      spinner.text = 'Cleaning node_modules...';

      // 清理根目录 node_modules
      if (existsSync('node_modules')) {
        rmSync('node_modules', { recursive: true, force: true });
      }

      // 清理各个包的 node_modules
      const packages = ['apps/*', 'packages/*'];
      for (const pkg of packages) {
        try {
          execSync(`find ${pkg} -name "node_modules" -type d -exec rm -rf {} +`, {
            stdio: 'inherit',
          });
        } catch {
          // 忽略错误，可能目录不存在
        }
      }
    }

    spinner.succeed(chalk.green('Clean completed!'));

    if (options.all) {
      console.log(chalk.yellow('Run "pnpm install" to reinstall dependencies.'));
    }
  } catch (error) {
    spinner.fail(chalk.red('Clean failed'));
    throw error;
  }
}
