const express = require("express");
const router = express.Router();
const { contactControllers } = require("../../controllers");
const {
  validateContact,
  validateUpdateContact,
  validateId,
  validateIsFavorite,
} = require("./validation");

router.get("/", contactControllers.getContacts);

router.get("/:contactId", validateId, contactControllers.getContact);

router.post("/", validateContact, contactControllers.saveContact);

router.delete("/:contactId", validateId, contactControllers.removeContact);

router.put(
  "/:contactId",
  validateId,
  validateUpdateContact,
  contactControllers.updateContact
);

router.patch(
  "/:contactId/favorite",
  validateId,
  validateIsFavorite,
  contactControllers.updateIsFavorite
);

module.exports = router;
