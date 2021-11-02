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
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
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
  contactId: Joi.objectId().required(),
});

module.exports = {
  schemaIsFavorite,
  schemaContact,
  schemaUpdateContact,
  schemaId,
};
