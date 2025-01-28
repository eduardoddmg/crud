const CustomError = require("../errors");

const validationBody = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    console.log(req.body);

    if (error) {
      throw new CustomError.BadRequestError(error.details[0].message);
    }

    next();
};

module.exports = { validationBody };