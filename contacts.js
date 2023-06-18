const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid/async");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

// Отримати всі контакти
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

// Отримати контакт за id
const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

// Видалити контакт за id
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(
    (el) => el.id === contactId
  );
  if (contactIndex === -1) throw Error("No such contact");
  const removedContact = contacts[contactIndex];
  contacts.splice(contactIndex, 1);
  await updateContacts(contacts);
  return removedContact;
};

// Додати новий контакт
const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const doubleContact = contacts.find((el) => el.name === name);
  if (doubleContact) throw Error("This contact already exists");
  const newContact = {
    id: await nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
