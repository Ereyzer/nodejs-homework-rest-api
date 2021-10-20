const ContactModel = require("../model/contacts");
const UserModel = require("../model/user");

class DatabaseApi {
  // listContacts = () => ContactModel.find({});
  listContacts = (userId, query) => {
    const { limit = 5, offset = 0 } = query;
    console.log(userId);
    const searchOptions = { owner: userId };
    return ContactModel.paginate(searchOptions, { limit, offset });
  };

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
}

module.exports = new DatabaseApi();
