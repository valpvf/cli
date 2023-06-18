const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.list();
      console.table(allContacts);
      break;
    case "get":
      const contact = await contacts.get(id);
      console.log(contact);
      break;
    case "remove":
      const removeContact = await contacts.remove(id);
      console.log(removeContact);
      break;
    case "add":
      const addContact = await contacts.add(name, email, phone);
      console.log(addContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
