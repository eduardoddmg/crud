const { ApiResponse } = require("../class");

function permissionAdmin(req, res, next) {
  const user = req.user;
  console.log(user);
  if (user.regra === "admin") next();
  else {
    const response = ApiResponse.error(
      401,
      "Vocẽ não tem autorização para realizar essa ação"
    );
    return res.status(response.statusCode).json(response);
  }
}

module.exports = { permissionAdmin };
