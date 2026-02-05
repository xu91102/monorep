/**
 * 应用错误基类
 * 所有自定义错误都应继承此类
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

/**
 * 验证错误 - 用户输入不符合要求
 */
export class ValidationError extends AppError {
  constructor(message: string = '验证失败') {
    super(message, 400);
  }
}

/**
 * 认证错误 - 用户未登录或 token 无效
 */
export class AuthenticationError extends AppError {
  constructor(message: string = '认证失败') {
    super(message, 401);
  }
}

/**
 * 授权错误 - 用户无权限访问资源
 */
export class AuthorizationError extends AppError {
  constructor(message: string = '无权限访问') {
    super(message, 403);
  }
}

/**
 * 资源未找到错误
 */
export class NotFoundError extends AppError {
  constructor(message: string = '资源未找到') {
    super(message, 404);
  }
}

/**
 * 冲突错误 - 资源已存在或状态冲突
 */
export class ConflictError extends AppError {
  constructor(message: string = '资源冲突') {
    super(message, 409);
  }
}

/**
 * 业务逻辑错误
 */
export class BusinessError extends AppError {
  constructor(message: string, statusCode: number = 400) {
    super(message, statusCode);
  }
}
