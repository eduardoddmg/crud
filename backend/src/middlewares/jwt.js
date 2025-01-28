const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors');

async function jwtMiddleware(req, res, next) {
  const authorizationHeader = req.header('authorization');

  if (!authorizationHeader) {
    const response = ApiResponse.error(401, 'Token não fornecido');
    req.user = null;
    return res.status(response.statusCode).json(response);
  }

  // Verifica o formato "Bearer ${token}"
  const [bearer, token] = authorizationHeader.split(' ');

  if (bearer !== 'Bearer:' || !token) {
    req.user = null;
    throw new UnauthorizedError('Formato do token inválido');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      maxAge: '30d',
    });
    req.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    if (error.name === 'TokenExpiredError') {
      throw new UnauthorizedError('Token expirado');
    } else {
      throw new UnauthorizedError('Token inválido');
    }
  }
}

module.exports = jwtMiddleware;
