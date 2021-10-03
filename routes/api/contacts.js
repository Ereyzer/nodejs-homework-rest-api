const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../model/index");

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

router.get("/:contactId", async (req, res, next) => {
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

router.post("/", async ({ body }, res, next) => {
  // console.log("add contavt", req.body);
  try {
    const response = await addContact(body);
    res.json({ message: "add contact", response });
  } catch (err) {}
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
