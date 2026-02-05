import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { error } from '../utils/response';
import { AppError } from '../errors';

/**
 * 全局错误处理中间件
 * 统一处理所有错误，根据错误类型返回适当的响应
 */
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  // 默认错误信息
  let statusCode = 500;
  let message = 'Internal Server Error';
  let details: Record<string, unknown> | undefined;

  // 处理自定义应用错误
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;

    // 记录错误日志，包含请求上下文
    logger.error('应用错误', {
      message: err.message,
      statusCode: err.statusCode,
      stack: err.stack,
      path: req.path,
      method: req.method,
      ip: req.ip,
    });
  } else {
    // 处理未预期的错误
    logger.error('未预期错误', {
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      ip: req.ip,
    });
  }

  // 生产环境隐藏敏感信息
  if (process.env.NODE_ENV === 'production') {
    // 生产环境只返回通用错误信息
    if (statusCode === 500) {
      message = 'Internal Server Error';
    }
  } else {
    // 开发环境返回详细错误信息
    details = {
      stack: err.stack,
      name: err.name,
    };
  }

  error(res, message, statusCode, details);
};

/**
 * 404 错误处理中间件
 */
export const notFoundHandler = (req: Request, res: Response, _next: NextFunction): void => {
  logger.warn('路由未找到', {
    path: req.path,
    method: req.method,
    ip: req.ip,
  });
  error(res, `Route ${req.originalUrl} not found`, 404);
};

/**
 * 异步路由处理器包装函数
 * 自动捕获异步错误并传递给错误处理中间件
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
