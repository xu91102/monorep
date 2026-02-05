import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';
import logger from '../utils/logger';
import { httpRequestCounter, httpRequestDuration } from '../routes/metrics';

/**
 * 扩展 Express Request 类型以包含 correlationId
 */
declare global {
  namespace Express {
    interface Request {
      correlationId?: string;
    }
  }
}

/**
 * 请求日志中间件
 * 为每个请求生成唯一的 correlation ID，记录请求详情和响应时间
 * 同时收集 Prometheus metrics
 */
const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();

  // 生成或使用现有的 correlation ID
  const correlationId = (req.headers['x-correlation-id'] as string) || randomUUID();
  req.correlationId = correlationId;

  // 将 correlation ID 添加到响应头
  res.setHeader('X-Correlation-ID', correlationId);

  // 记录请求开始
  logger.info('请求开始', {
    correlationId,
    method: req.method,
    path: req.path,
    query: req.query,
    ip: req.ip,
    userAgent: req.get('user-agent'),
  });

  res.on('finish', () => {
    const duration = Date.now() - start;
    const durationInSeconds = duration / 1000;

    const logData = {
      correlationId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    };

    // 记录 HTTP 指标
    const route = req.route?.path || req.path;
    httpRequestCounter.inc({
      method: req.method,
      route,
      status_code: res.statusCode,
    });

    httpRequestDuration.observe(
      {
        method: req.method,
        route,
        status_code: res.statusCode,
      },
      durationInSeconds,
    );

    if (res.statusCode >= 500) {
      logger.error('请求完成 - 服务器错误', logData);
    } else if (res.statusCode >= 400) {
      logger.warn('请求完成 - 客户端错误', logData);
    } else {
      logger.info('请求完成', logData);
    }
  });

  next();
};

export default requestLogger;
