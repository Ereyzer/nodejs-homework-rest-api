const jwt = require("jsonwebtoken");
const path = require("path");
const mkdirp = require("mkdirp");

const { UploadFIleAvatar } = require("../services/upload-services");
const { databaseApi } = require("../repository");
const { HttpCode } = require("../config/constants");
const { ErrorTypes, CustomError } = require("../helpers/errorHandler");

const { SECRET_KEY, AVATAR_DIR } = require("../config/dotenv-info");

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

const changeSubscribe = async ({ user, body }, res) => {
  const response = await databaseApi.changeSubscribe(user._id, body);
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    response,
  });
};

const uploadAvatar = async ({ user: { id }, file }, res) => {
  const destination = path.join(`public/${AVATAR_DIR}`, id);

  await mkdirp(destination);
  const uploadFIleAvatar = new UploadFIleAvatar(destination);
  const avatarPath = await uploadFIleAvatar.save(file, id);
  const response = await databaseApi.updateAvatar(id, avatarPath);
  return res.status(HttpCode.OK).json({
    status: "success",
    code: HttpCode.OK,
    response: { avatarUrl: avatarPath },
  });
};

module.exports = {
  registrationUser,
  login,
  logout,
  userInfo,
  changeSubscribe,
  uploadAvatar,
};
