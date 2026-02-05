# ============================================
# Multi-stage Dockerfile for Monorepo
# ============================================

# ---- Base Stage ----
FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate
WORKDIR /app

# ---- Dependencies Stage ----
FROM base AS deps
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/
COPY packages/components/package.json ./packages/components/
COPY packages/cli/package.json ./packages/cli/
COPY apps/backend/package.json ./apps/backend/
COPY apps/frontend/package.json ./apps/frontend/
RUN pnpm install --frozen-lockfile

# ---- Builder Stage ----
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/packages/*/node_modules ./packages/
COPY --from=deps /app/apps/*/node_modules ./apps/
COPY . .
RUN pnpm build

# ---- Backend Production ----
FROM node:20-alpine AS backend
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/packages/types/dist ./packages/types/dist
COPY --from=builder /app/packages/types/package.json ./packages/types/
COPY --from=builder /app/packages/utils/dist ./packages/utils/dist
COPY --from=builder /app/packages/utils/package.json ./packages/utils/
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/package.json ./apps/backend/
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/package.json ./

RUN pnpm install --prod --frozen-lockfile

EXPOSE 3001
CMD ["node", "apps/backend/dist/index.js"]

# ---- Frontend Production ----
FROM nginx:alpine AS frontend
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
