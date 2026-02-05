import { execSync } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';

interface LintOptions {
  fix?: boolean;
}

export async function lint(options: LintOptions): Promise<void> {
  const spinner = ora('Running linter...').start();

  try {
    if (options.fix) {
      spinner.text = 'Running linter and fixing issues...';
      execSync('pnpm format', { stdio: 'inherit' });
    } else {
      spinner.text = 'Checking code style...';
      execSync('pnpm lint', { stdio: 'inherit' });
    }

    spinner.succeed(chalk.green('Linting completed!'));
  } catch (error) {
    spinner.fail(chalk.red('Linting failed'));
    throw error;
  }
}
