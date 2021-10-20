const { databaseApi } = require("../repository");

const getContacts = async (_req, res, next) => {
  try {
    const response = await databaseApi.listContacts();

    if (!response) return next();

    return res
      .status(200)
      .json({ status: 200, message: "it is contacts list", response });
  } catch (err) {
    next(err);
  }
};

const getContact = async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const response = await databaseApi.getContactById(id);
    if (!response) return next();
    console.log(response);
    return res.status(200).json({
      status: "OK",
      code: 200,
      message: `the contact ${id}`,
      contactId: id,
      response,
    });
  } catch (err) {
    next(err);
  }
};

const saveContact = async ({ body }, res, next) => {
  try {
    const response = await databaseApi.addContact(body);
    if (!response) return next();
    res.json({ message: "add new contact", response });
  } catch (err) {
    next(err);
  }
};

const removeContact = async (req, res, next) => {
  const id = req.params.contactId;
  try {
    const response = await databaseApi.removeContact(id);
    if (!response) return next();

    return res.status(200).json({
      status: "OK",
      code: 200,
      message: "contact deleted",
      response: {},
    });
  } catch (err) {
    next(err);
  }
};

const updateContact = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;

  try {
    const response = await databaseApi.updateContact(id, body);

    if (!response) return next();

    return res.status(200).json({
      status: "OK",
      code: 200,
      message: `Update contact ${id}`,
      response,
    });
  } catch (err) {
    console.error(err);
    return next(err);
  }
};

const updateIsFavorite = async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;

  try {
    const response = await databaseApi.updateContact(id, body);
    if (!response) return next();

    return res.status(200).json({
      status: "OK",
      code: 200,
      message: `Update contact ${id}`,
      response,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getContacts,
  getContact,
  saveContact,
  removeContact,
  updateContact,
  updateIsFavorite,
};
