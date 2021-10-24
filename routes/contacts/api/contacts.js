const express = require("express");
const router = express.Router();
const { contactControllers } = require("../../../controllers");
const {
  validateContact,
  validateUpdateContact,
  validateId,
  validateIsFavorite,
} = require("../../validation");
const { guard } = require("../../../helpers/guard");

router.get("/", guard, contactControllers.getContacts);

router.get("/:contactId", guard, validateId, contactControllers.getContact);

router.post("/", guard, validateContact, contactControllers.saveContact);

router.delete(
  "/:contactId",
  guard,
  validateId,
  contactControllers.removeContact
);

router.put(
  "/:contactId",
  guard,
  validateId,
  validateUpdateContact,
  contactControllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  guard,
  validateId,
  validateIsFavorite,
  contactControllers.updateIsFavorite
);

module.exports = router;
