export const customErrorHandler = (statusCode, message) => {
  const err = new Error();
  err.statusCode = statusCode;
  err.message = message;
  return err;
};
