const { ZodError } = require("zod");

const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      // 👇 validate ONLY what schema defines
      const dataToValidate = {};

      if (schema.shape?.body) dataToValidate.body = req.body;
      if (schema.shape?.params) dataToValidate.params = req.params;
      if (schema.shape?.query) dataToValidate.query = req.query;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next({
          isOperational: true,
          statusCode: 400,
          message: error.issues.map((e) => e.message).join(", "),
        });
      }

      next({
        isOperational: true,
        statusCode: 400,
        message: "Invalid request data",
      });
    }
  };
};

module.exports = validateRequest;
