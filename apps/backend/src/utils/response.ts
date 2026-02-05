import { Response } from 'express';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  code: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export const success = <T>(res: Response, data?: T, message = 'Success'): Response => {
  const response: ApiResponse<T> = {
    success: true,
    code: 200,
    message,
    ...(data !== undefined && { data }),
  };
  return res.status(200).json(response);
};

export const created = <T>(res: Response, data?: T, message = 'Created'): Response => {
  const response: ApiResponse<T> = {
    success: true,
    code: 201,
    message,
    ...(data !== undefined && { data }),
  };
  return res.status(201).json(response);
};

export const error = (
  res: Response,
  message = 'Internal Server Error',
  code = 500,
  details?: Record<string, unknown>,
): Response => {
  const response: ApiResponse = {
    success: false,
    code,
    message,
    ...(details !== undefined && { data: details }),
  };
  return res.status(code).json(response);
};

export const badRequest = (res: Response, message = 'Bad Request'): Response => {
  return error(res, message, 400);
};

export const unauthorized = (res: Response, message = 'Unauthorized'): Response => {
  return error(res, message, 401);
};

export const forbidden = (res: Response, message = 'Forbidden'): Response => {
  return error(res, message, 403);
};

export const notFound = (res: Response, message = 'Not Found'): Response => {
  return error(res, message, 404);
};

export const paginate = <T>(
  res: Response,
  data: T[],
  page: number,
  pageSize: number,
  total: number,
): Response => {
  const response: PaginatedResponse<T> = {
    success: true,
    code: 200,
    data,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize),
    },
  };
  return res.status(200).json(response);
};
