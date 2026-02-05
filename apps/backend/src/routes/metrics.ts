import { Router, Request, Response } from 'express';
import client from 'prom-client';

const router = Router();

// 创建 Registry
const register = new client.Registry();

// 添加默认指标（CPU、内存等）
client.collectDefaultMetrics({ register });

// 自定义指标：HTTP 请求计数
export const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
  registers: [register],
});

// 自定义指标：HTTP 请求持续时间
export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 2, 5],
  registers: [register],
});

/**
 * Metrics 端点
 * GET /metrics
 * 返回 Prometheus 格式的指标数据
 */
router.get('/', async (_req: Request, res: Response) => {
  res.set('Content-Type', register.contentType);
  const metrics = await register.metrics();
  res.send(metrics);
});

export default router;
