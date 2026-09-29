export const ErrorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  return res.status(status).json({
    success: false,
    message,
  });
};
