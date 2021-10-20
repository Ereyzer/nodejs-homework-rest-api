const {
  schemaIsFavorite,
  schemaContact,
  schemaUpdateContact,
  schemaId,
} = require("./validationContacts");
const {
  schemaUser,
  schemaCredentialsUser,
  schemaUpdateSub,
} = require("./validationUser");

const validate = async (schema, obj, res, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: "error",
      code: 400,
      message: `Field ${err.message.replace(/"/g, "")}`,
    });
  }
};

module.exports.validateContact = async (req, res, next) =>
  await validate(schemaContact, req.body, res, next);

module.exports.validateUpdateContact = async (req, res, next) =>
  await validate(schemaUpdateContact, req.body, res, next);

module.exports.validateId = async (req, res, next) =>
  await validate(schemaId, req.params, res, next);

module.exports.validateIsFavorite = async (req, res, next) =>
  await validate(schemaIsFavorite, req.body, res, next);

module.exports.validateUser = async (req, res, next) =>
  await validate(schemaUser, req.body, res, next);

module.exports.validateCredentials = async (req, res, next) =>
  await validate(schemaCredentialsUser, req.body, res, next);
module.exports.validateSubscribe = async (req, res, next) =>
  await validate(schemaUpdateSub, req.body, res, next);
