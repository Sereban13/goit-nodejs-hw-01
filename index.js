const contacts = require("./contacts");

const { program } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.getAll();
      return console.table(allContacts);

    case "get":
      const contactById = await contacts.getById(id);
      return console.table(contactById);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.table(newContact);

    case "remove":
      const deletedContact = await contacts.deleteContact(id);
      return console.table(deletedContact);

    default:
      return console.log("Uknown action");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);
