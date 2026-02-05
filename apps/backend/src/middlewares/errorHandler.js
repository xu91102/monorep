import logger from '../utils/logger';
import { error } from '../utils/response';
export class AppError extends Error {
  statusCode;
  isOperational;
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}
export const errorHandler = (err, req, res, _next) => {
  if (err instanceof AppError) {
    logger.error(`AppError: ${err.message}`, { stack: err.stack });
    error(res, err.message, err.statusCode);
    return;
  }
  logger.error(`Unexpected Error: ${err.message}`, { stack: err.stack });
  const statusCode = 500;
  const message = process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message;
  error(res, message, statusCode);
};
export const notFoundHandler = (req, res, _next) => {
  error(res, `Route ${req.originalUrl} not found`, 404);
};
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
//# sourceMappingURL=errorHandler.js.map
