import { execSync } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';

interface BuildOptions {
  package?: string;
}

export async function build(options: BuildOptions): Promise<void> {
  const spinner = ora('Building packages...').start();

  try {
    if (options.package) {
      spinner.text = `Building package ${options.package}...`;
      execSync(`pnpm --filter ${options.package} build`, { stdio: 'inherit' });
    } else {
      spinner.text = 'Building all packages...';
      execSync('pnpm build', { stdio: 'inherit' });
    }

    spinner.succeed(chalk.green('Build completed successfully!'));
  } catch (error) {
    spinner.fail(chalk.red('Build failed'));
    throw error;
  }
}
