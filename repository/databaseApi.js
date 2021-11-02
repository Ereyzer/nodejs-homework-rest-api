const ContactModel = require("../model/contacts");
const UserModel = require("../model/user");

class DatabaseApi {
  // listContacts = () => ContactModel.find({});
  listContacts = (searchOptions, query) =>
    ContactModel.paginate(searchOptions, query);
  getContactById = (contactId) => ContactModel.findById(contactId);

  removeContact = (contactId) => ContactModel.findByIdAndRemove(contactId);

  addContact = (data) => ContactModel.create(data);

  updateContact = (contactId, body) =>
    ContactModel.findByIdAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true }
    );

  registration = async (credentials) => {
    const user = new UserModel(credentials);
    return await user.save();
  };
  findUserById = (id) => UserModel.findById(id);
  findUserByEmail = (email) => UserModel.findOne({ email });
  updateToken = (id, token) =>
    UserModel.findByIdAndUpdate(id, { token }, { new: true });

  updateTokenVerify = (verifyToken) =>
    UserModel.findOneAndUpdate(
      { verifyToken },
      { isVerified: true, verifyToken: null },
      { new: true }
    );

  refreshVerifyToken = (id, verifyToken) =>
    UserModel.findByIdAndUpdate(id, { verifyToken }, { new: true });

  changeSubscribe = (id, { subscription }) =>
    UserModel.findByIdAndUpdate(id, { subscription }, { new: true });
  updateAvatar = (id, avatarURL) =>
    UserModel.findByIdAndUpdate(id, { avatarURL }, { new: true });
}

module.exports = new DatabaseApi();
