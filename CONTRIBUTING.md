# Contributing to Monorep

Thank you for your interest in contributing!

## Development Setup

1. Fork and clone the repository
2. Install dependencies: `pnpm install`
3. Create a branch: `git checkout -b feature/your-feature`

## Workflow

### Making Changes

1. Make your changes
2. Run tests: `pnpm test`
3. Run linting: `pnpm lint`
4. Create a changeset: `pnpm changeset`

### Changesets

We use [Changesets](https://github.com/changesets/changesets) for version management.

When making changes that should be released:

```bash
pnpm changeset
```

Select the packages you changed and describe the changes.

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Maintenance tasks

### Pull Requests

1. Fill in the PR template
2. Ensure CI passes
3. Request review

## Project Structure

| Directory   | Description             |
| ----------- | ----------------------- |
| `apps/`     | Application packages    |
| `packages/` | Shared library packages |
| `scripts/`  | Development scripts     |

## Code Style

- TypeScript for all code
- Prettier for formatting
- ESLint for linting

Run `pnpm format` before committing.
