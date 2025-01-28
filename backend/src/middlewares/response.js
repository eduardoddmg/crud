const { ApiResponse } = require("../class");

const responseMiddleware = (req, res, next) => {
  const result = ApiResponse.success(
    req.response.status,
    req.response.message,
    req.response.data
  );
  return res.status(result.statusCode).json(result);
};

module.exports = responseMiddleware;
