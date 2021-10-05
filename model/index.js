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

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);

    if (contactIndex === -1) return null;

    return contacts[contactIndex];
  } catch (err) {
    console.error(err);
    return err;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(({ id }) => id === contactId);

    if (contactIndex === -1) return null;

    const newContactList = contacts.filter(({ id }) => id !== contactId);

    const data = JSON.stringify(newContactList);

    await fs.writeFile(contactsPath, data);
    return {};
  } catch (err) {
    console.error(err);
    return err;
  }
};

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

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();

    const contactIndex = contacts.findIndex(({ id }) => id === contactId);

    if (contactIndex === -1) return null;
    contacts[contactIndex] = { ...contacts[contactIndex], ...body };

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[contactIndex];
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
