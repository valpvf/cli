const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid/async");

const contactsPath = path.join(__dirname, "db/contacts.json");

const update = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const list = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getById = async (contactId) => {
  const contacts = await list();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const remove = async (contactId) => {
  const contacts = await list();
  const contactIndex = contacts.findIndex(
    (el) => el.id === contactId
  );
  if (contactIndex === -1) throw Error("No such contact");
  const removedContact = contacts[contactIndex];
  contacts.splice(contactIndex, 1);
  await update(contacts);
  return removedContact;
};

const add = async (name, email, phone) => {
  const contacts = await list();
  const doubleContact = contacts.find((el) => el.name === name);
  if (doubleContact) throw Error("This contact already exists");
  const newContact = {
    id: await nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await update(contacts);
  return newContact;
};

module.exports = {
  list,
  getById,
  remove,
  add,
};
