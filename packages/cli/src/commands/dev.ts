import { execSync } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';

interface DevOptions {
  package?: string;
}

export async function dev(options: DevOptions): Promise<void> {
  const spinner = ora('Starting development mode...').start();

  try {
    if (options.package) {
      spinner.text = `Starting development for ${options.package}...`;
      spinner.succeed(chalk.green(`Starting ${options.package} in development mode...`));

      // 不使用 spinner，直接启动开发服务器
      execSync(`pnpm --filter ${options.package} dev`, { stdio: 'inherit' });
    } else {
      spinner.text = 'Starting development mode for all packages...';
      spinner.succeed(chalk.green('Starting all packages in development mode...'));

      // 不使用 spinner，直接启动开发服务器
      execSync('pnpm dev', { stdio: 'inherit' });
    }
  } catch (error) {
    spinner.fail(chalk.red('Failed to start development mode'));
    throw error;
  }
}
