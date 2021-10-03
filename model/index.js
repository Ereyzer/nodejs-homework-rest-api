const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath, "utf8");
    if (!result) return null;
    const contacts = JSON.parse(result);
    return contacts;
  } catch (err) {
    console.error(err);
    return err;
  }
};
// const listContacts = async () => {};
const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const found = contacts.find(({ id }) => id === contactId);
    if (!found) return null;

    return found;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// const getContactById = async (contactId) => {};
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const newContactList = contacts.filter(({ id }) => id !== contactId);
  const data = JSON.stringify(newContactList);

  try {
    await fs.writeFile(contactsPath, data);
    return {};
  } catch (err) {
    console.error(err);
    return err;
  }
};

// const removeContact = async (contactId) => {};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  const data = JSON.stringify([...contacts, newContact]);
  try {
    await fs.writeFile(contactsPath, data);
    return newContact;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
