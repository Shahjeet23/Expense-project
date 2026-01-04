const createError = (message, statusCode = 500) => {
  return {
    isOperational: true,
    statusCode,
    message,
  };
};

module.exports = createError;
