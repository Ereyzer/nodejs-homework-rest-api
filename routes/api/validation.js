const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { ValidNameLength } = require("../../config/constants");
const patternPhone = "^[(][0-9]{3}[)]\\s[0-9]{2}[-][0-9]{2}[-][0-9]{3}";

const schemaIsFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemaContact = Joi.object({
  name: Joi.string()
    .min(ValidNameLength.MIN)
    .max(ValidNameLength.MAX)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().pattern(new RegExp(patternPhone)).required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string()
    .min(ValidNameLength.MIN)
    .max(ValidNameLength.MAX)
    .optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
  phone: Joi.string().pattern(new RegExp(patternPhone)).optional(),
  favorite: Joi.boolean().optional(),
}).min(1);

const schemaId = Joi.object({
  contactId: Joi.objectId().required().required(),
});

const validate = async (schema, obj, res, next) => {
  console.log(obj);
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    console.log(err);
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
