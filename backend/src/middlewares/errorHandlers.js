const { NotFoundError } = require('../errors');

const notFoundMiddleware = (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Rota não encontrada',
  });
};

const errorHandlerMiddleware = (err, req, res, next) => {
  const CustomError = {
    statusCode: err.statusCode || 500,
    message: err.message || "Aconteceu algo de errado! :'(",
  };

  console.log(
    `Erro ocorreu na página: ${req.method} ${req.originalUrl}\n\nErro: ${err}`
  );

  return res.status(CustomError.statusCode).json({
    success: false,
    message: CustomError.message,
  });
};

module.exports = { notFoundMiddleware, errorHandlerMiddleware };
