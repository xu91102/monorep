# Monorep

A modern monorepo template powered by **pnpm workspaces**, **Turborepo**, and **TypeScript**.

## Features

- **pnpm Workspaces** - Fast, disk-efficient package management
- **Turborepo** - Intelligent build caching and task orchestration
- **TypeScript** - Full type safety across all packages
- **Changesets** - Automated versioning and changelog generation
- **Husky + lint-staged** - Pre-commit code quality checks
- **Docker** - Production-ready containerization
- **GitHub Actions** - CI/CD pipeline

## Project Structure

```
monorep/
├── apps/
│   ├── backend/          # Express + TypeScript API
│   └── frontend/         # Vue 3 + Vite SPA
├── packages/
│   ├── cli/              # CLI tools
│   ├── components/       # Vue 3 component library
│   ├── types/            # Shared TypeScript types
│   └── utils/            # Shared utilities
├── scripts/              # Dev scripts
├── docker/               # Docker configs
└── .github/workflows/    # CI/CD
```

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/monorep.git
cd monorep

# Install dependencies
pnpm install

# Start development
pnpm dev
```

## Commands

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `pnpm dev`       | Start all apps in development mode |
| `pnpm build`     | Build all packages                 |
| `pnpm test`      | Run tests                          |
| `pnpm lint`      | Check code style                   |
| `pnpm format`    | Format code                        |
| `pnpm typecheck` | TypeScript type checking           |
| `pnpm clean`     | Clean build artifacts              |
| `pnpm changeset` | Create a changeset                 |
| `pnpm release`   | Publish packages                   |

### Package-specific Commands

```bash
# Run specific package
pnpm --filter @monorep/backend dev
pnpm --filter @monorep/frontend dev

# Add dependency to specific package
pnpm add lodash --filter @monorep/utils
```

## Development Ports

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:3000 |
| Backend  | http://localhost:3001 |

## Docker

```bash
# Build and run production
docker-compose up --build

# Development mode
docker-compose --profile dev up
```

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## License

ISC
