const Joi = require("joi");
const { ValidNameLength } = require("../../config/constants");
const schemaUser = Joi.object({
  name: Joi.string()
    .min(ValidNameLength.MIN)
    .max(ValidNameLength.MAX)
    .default("noname"),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  password: Joi.string().required(),
  subscription: Joi.string().default("starter"),
});

const schemaCredentialsUser = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  password: Joi.string().required(),
});
const schemaUpdateSub = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schemaResendVerify = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
});

module.exports = {
  schemaUser,
  schemaCredentialsUser,
  schemaUpdateSub,
  schemaResendVerify,
};
