const jwt = require("jsonwebtoken");

const { databaseApi } = require("../repository");
const { HttpCode } = require("../config/constants");
const { ErrorTypes, CustomError } = require("../helpers/errorHandler");

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const registrationUser = async ({ body }, res, next) => {
  const isUser = await databaseApi.findUserByEmail(body.email);
  if (isUser)
    throw new CustomError(
      HttpCode.CONFLICT,
      "Email is already exist",
      ErrorTypes.EXIST_USER_ERROR
    );

  const response = await databaseApi.registration(body);
  return res
    .status(HttpCode.CREATED)
    .json({ status: "success", code: HttpCode.CREATED, response });
};

const login = async ({ body: { email, password } }, res) => {
  const isUser = await databaseApi.findUserByEmail(email);
  if (!isUser)
    throw new CustomError(
      HttpCode.UNAUTHORIZED,
      "Email or password is wrong",
      ErrorTypes.CREDENTIALS_ERROR
    );
  const isValidPassword = await isUser.isValidPassword(password);
  if (!isValidPassword)
    throw new CustomError(
      HttpCode.UNAUTHORIZED,
      "Email or password is wrong",
      ErrorTypes.CREDENTIALS_ERROR
    );
  const id = isUser.id;
  const payload = { email: isUser.email, id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  const response = await databaseApi.updateToken(id, token);
  return res.status(HttpCode.ACCEPTED).json({
    status: "success",
    code: HttpCode.ACCEPTED,
    response,
  });
};

const logout = async ({ user }, res) => {
  await databaseApi.updateToken(user.id, null);
  return res.status(HttpCode.NO_CONTENT).json({});
};

const userInfo = async ({ user }, res) => {
  const response = await databaseApi.findUserById(user.id);
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    response,
  });
};

module.exports = { registrationUser, login, logout, userInfo };
