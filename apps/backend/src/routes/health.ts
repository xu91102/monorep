import { Router, Request, Response } from 'express';
import os from 'os';

const router = Router();

/**
 * 健康检查端点
 * GET /health
 * 返回服务健康状态和系统资源使用情况
 */
router.get('/', (_req: Request, res: Response) => {
  const uptime = process.uptime();
  const memoryUsage = process.memoryUsage();
  const cpuUsage = process.cpuUsage();

  // 计算内存使用百分比
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const memoryUsagePercent = ((usedMemory / totalMemory) * 100).toFixed(2);

  // 健康状态判断
  const isHealthy = memoryUsagePercent < '90';

  const healthData = {
    status: isHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(uptime)}s`,
    memory: {
      rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
      heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
      heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
      external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
      systemUsage: `${memoryUsagePercent}%`,
    },
    cpu: {
      user: `${(cpuUsage.user / 1000).toFixed(2)} ms`,
      system: `${(cpuUsage.system / 1000).toFixed(2)} ms`,
    },
    system: {
      platform: os.platform(),
      arch: os.arch(),
      nodeVersion: process.version,
    },
  };

  const statusCode = isHealthy ? 200 : 503;
  res.status(statusCode).json(healthData);
});

export default router;
