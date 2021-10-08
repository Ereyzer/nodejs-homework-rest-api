const ContactModel = require("../model/contacts");

class DatabaseApi {
  listContacts = async () => await ContactModel.find({});

  getContactById = (contactId) => ContactModel.findById(contactId);

  removeContact = (contactId) => ContactModel.findByIdAndRemove(contactId);

  addContact = (data) => ContactModel.create(data);

  updateContact = (contactId, body) =>
    ContactModel.findByIdAndUpdate(
      { _id: contactId },
      { ...body },
      { new: true }
    );
}

module.exports = new DatabaseApi();
