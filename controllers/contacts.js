const { use } = require("passport");
const { databaseApi } = require("../repository");

const getContacts = async ({ user, query }, res, next) => {
  console.log(query);
  const { limit = 5, offset = 0, favorite = null } = query;
  const searchOptions = { owner: user._id };

  if (favorite !== null) {
    searchOptions.favorite = favorite;
  }
  console.log(searchOptions);
  try {
    const response = await databaseApi.listContacts(searchOptions, {
      limit,
      offset,
    });

    if (!response) return next();

    return res
      .status(200)
      .json({ status: 200, message: "it is contacts list", response });
  } catch (err) {
    next(err);
  }
};

const getContact = async ({ params }, res, next) => {
  const id = params.contactId;
  try {
    const response = await databaseApi.getContactById(id);
    if (!response) return next();
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

const saveContact = async ({ body, user }, res, next) => {
  try {
    const response = await databaseApi.addContact({ ...body, owner: user._id });
    if (!response) return next();
    res.json({ message: "add new contact", response });
  } catch (err) {
    next(err);
  }
};

const removeContact = async ({ params }, res, next) => {
  const id = params.contactId;

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

const updateContact = async ({ body, params }, res, next) => {
  const id = params.contactId;

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

const updateIsFavorite = async ({ body, params }, res, next) => {
  const id = params.contactId;

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
