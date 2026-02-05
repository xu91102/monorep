export const success = (res, data, message = 'Success') => {
  const response = {
    success: true,
    code: 200,
    message,
    data,
  };
  return res.status(200).json(response);
};
export const created = (res, data, message = 'Created') => {
  const response = {
    success: true,
    code: 201,
    message,
    data,
  };
  return res.status(201).json(response);
};
export const error = (res, message = 'Internal Server Error', code = 500) => {
  const response = {
    success: false,
    code,
    message,
  };
  return res.status(code).json(response);
};
export const badRequest = (res, message = 'Bad Request') => {
  return error(res, message, 400);
};
export const unauthorized = (res, message = 'Unauthorized') => {
  return error(res, message, 401);
};
export const forbidden = (res, message = 'Forbidden') => {
  return error(res, message, 403);
};
export const notFound = (res, message = 'Not Found') => {
  return error(res, message, 404);
};
export const paginate = (res, data, page, pageSize, total) => {
  const response = {
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
//# sourceMappingURL=response.js.map
