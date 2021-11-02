const { use } = require("passport");
const { databaseApi } = require("../repository");
const { HttpCode } = require("../config/constants");

const getContacts = async ({ user, query }, res, next) => {
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
      .status(HttpCode.OK)
      .json({ status: HttpCode.OK, message: "it is contacts list", response });
  } catch (err) {
    next(err);
  }
};

const getContact = async ({ params }, res, next) => {
  const id = params.contactId;
  try {
    const response = await databaseApi.getContactById(id);
    if (!response) return next();
    return res.status(HttpCode.OK).json({
      status: "OK",
      code: HttpCode.OK,
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
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      message: "add new contact",
      response,
    });
  } catch (err) {
    next(err);
  }
};

const removeContact = async ({ params }, res, next) => {
  const id = params.contactId;

  try {
    const response = await databaseApi.removeContact(id);
    if (!response) return next();

    return res.status(HttpCode.NO_CONTENT).json({});
  } catch (err) {
    next(err);
  }
};

const updateContact = async ({ body, params }, res, next) => {
  const id = params.contactId;

  try {
    const response = await databaseApi.updateContact(id, body);

    if (!response) return next();

    return res.status(HttpCode.OK).json({
      status: "OK",
      code: HttpCode.OK,
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

    return res.status(HttpCode.OK).json({
      status: "OK",
      code: HttpCode.OK,
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
