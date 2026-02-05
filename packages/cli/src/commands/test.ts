import { execSync } from 'child_process';
import chalk from 'chalk';
import ora from 'ora';

interface TestOptions {
  package?: string;
  watch?: boolean;
}

export async function test(options: TestOptions): Promise<void> {
  const spinner = ora('Running tests...').start();

  try {
    if (options.package) {
      spinner.text = `Testing package ${options.package}...`;
      const command = options.watch
        ? `pnpm --filter ${options.package} test --watch`
        : `pnpm --filter ${options.package} test`;
      execSync(command, { stdio: 'inherit' });
    } else {
      spinner.text = options.watch ? 'Running tests in watch mode...' : 'Running all tests...';
      const command = options.watch ? 'pnpm -r test --watch' : 'pnpm -r test';
      execSync(command, { stdio: 'inherit' });
    }

    if (!options.watch) {
      spinner.succeed(chalk.green('All tests passed!'));
    } else {
      spinner.info(chalk.blue('Running tests in watch mode...'));
    }
  } catch (error) {
    spinner.fail(chalk.red('Tests failed'));
    throw error;
  }
}
