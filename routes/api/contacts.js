const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model/index");
const {
  validateContact,
  validateUpdateContact,
  validateId,
} = require("./validation");

router.get("/", async (_req, res, next) => {
  try {
    const response = await listContacts();

    if (!response) return next();

    return res
      .status(200)
      .json({ status: 200, message: "it is contacts list", response });
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", validateId, async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const response = await getContactById(id);
    if (!response) return next();

    return res.status(200).json({
      status: 200,
      message: `the contact ${id}`,
      contactId: id,
      response,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", validateContact, async ({ body }, res, next) => {
  try {
    const response = await addContact(body);
    res.json({ message: "add new contact", response });
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", validateId, async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const response = await removeContact(id);
    if (!response) return next();

    return res.status(200).json({ message: "contact deleted", response: {} });
  } catch (err) {
    next(err);
  }
});

router.patch(
  "/:contactId",
  validateId,
  validateUpdateContact,
  async (req, res, next) => {
    const id = req.params.contactId;
    const body = req.body;

    if (!Object.keys(body)[0])
      return res.status(404).json({ status: 404, message: "missing fields" });

    try {
      const response = await updateContact(id, body);
      if (!response) return next();

      return res
        .status(200)
        .json({ status: 200, message: `Update contact ${id}`, response });
    } catch (err) {
      console.error(err);
      return next(err);
    }
  }
);

module.exports = router;
