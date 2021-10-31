const ErrorTypes = require("./error-constants");
const { HttpCode } = require("../../config/constants");

const wrapperError = (fn) => async (req, res, next) => {
  try {
    const result = await fn(req, res, next);
    return result;
  } catch (e) {
    switch (e.name) {
      case ErrorTypes.CUSTOM_ERROR:
        res.status(HttpCode.BAD_REQUEST).json({
          status: "error",
          code: HttpCode.BAD_REQUEST,
          message: error.message,
        });
        break;

      case ErrorTypes.EXIST_USER_ERROR:
        res.status(HttpCode.CONFLICT).json({
          Status: "error",
          code: HttpCode.CONFLICT,
          response: {
            message: e.message,
          },
        });
        break;
      case ErrorTypes.CREDENTIALS_ERROR:
        res.status(HttpCode.UNAUTHORIZED).json({
          status: "error",
          code: HttpCode.UNAUTHORIZED,
          message: e.message,
        });
        break;

      default:
        next(e);
        break;
    }
  }
};

module.exports = wrapperError;
