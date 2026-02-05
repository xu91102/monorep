import express from 'express';
import cors from 'cors';
import { formatGreeting } from '@monorep/utils';
import logger from './utils/logger';
import { success } from './utils/response';
import requestLogger from './middlewares/requestLogger';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import routes from './routes';
import healthRouter from './routes/health';
import metricsRouter from './routes/metrics';
import { validateEnv } from './config/env';

// 验证环境变量，失败时快速失败
let config;
try {
  config = validateEnv();
  logger.info('环境变量验证成功', { env: config.NODE_ENV });
} catch (error) {
  logger.error('环境变量验证失败', { error });
  process.exit(1);
}

const app = express();

// 中间件
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json());
app.use(requestLogger);

// 健康检查和监控端点（不需要认证）
app.use('/health', healthRouter);
app.use('/metrics', metricsRouter);

// 基础路由
app.get('/', (_req, res) => {
  success(res, {
    message: formatGreeting('Backend API'),
    version: '1.0.0',
    status: 'running',
    environment: config.NODE_ENV,
  });
});

// API 路由
app.use('/api', routes);

// 错误处理
app.use(notFoundHandler);
app.use(errorHandler);

// 未捕获异常处理
process.on('uncaughtException', (error: Error) => {
  logger.error('未捕获的异常', {
    message: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

process.on('unhandledRejection', (reason: unknown) => {
  logger.error('未处理的 Promise 拒绝', {
    reason,
  });
  process.exit(1);
});

// 启动服务器
app.listen(config.PORT, () => {
  logger.info(`Backend server is running on http://localhost:${config.PORT}`);
});

export default app;
