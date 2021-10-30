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
  changeSubscribe = (id, { subscription }) =>
    UserModel.findByIdAndUpdate(id, { subscription }, { new: true });
}

module.exports = new DatabaseApi();
