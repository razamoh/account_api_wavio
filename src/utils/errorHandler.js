const errorCodes = require('./errorMessages');

class CustomError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

const errorHandler = (err, req, res, next) => {
  console.log(JSON.stringify(err));
  if (err instanceof CustomError) {
    const { statusCode, message } = err.code;
    res.status(statusCode).json({ error: message });
  } else {
    next(err);
  }
};

module.exports = { CustomError, errorHandler, errorCodes };
