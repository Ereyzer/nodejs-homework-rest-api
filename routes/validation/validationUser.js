const Joi = require("joi");
const { ValidNameLength } = require("../../config/constants");
const schemaUser = Joi.object({
  name: Joi.string()
    .min(ValidNameLength.MIN)
    .max(ValidNameLength.MAX)
    .default("noname"),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().required(),
});

const schemaCredentialsUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().required(),
});

module.exports = { schemaUser, schemaCredentialsUser };
