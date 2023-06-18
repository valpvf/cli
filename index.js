const contacts = require("./contacts");
const argv = require("yargs").argv;
const { hideBin } = require("yargs/helpers");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "listContacts":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;
    case "getContactById":
      const contact = await contacts.getContactById(id);
      console.log(contact);
      break;
    case "removeContact":
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;
    case "addContact":
      const addContact = await contacts.addContact(
        name,
        email,
        phone
      );
      console.log(addContact);
      break;
    default:
      break;
  }
};

const arr = hideBin(process.argv);
// console.log(argv);

invokeAction(argv);
// invokeAction({
//   action: "listContacts",
// });
// invokeAction({
//   action: "getContactById",
//   id: "vza2RIzNGIwutCVCs4mCL",
// });
// invokeAction({
//   action: "addContact",
//   name: "Mango",
//   email: "mango@gmail.com",
//   phone: "322-22-22",
// });
// invokeAction({
//   action: "removeContact",
//   id: "vQIPOQcHo0xous1bLLrAf",
// });
