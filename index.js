const contactFunction = require("./contacts.js");
// const { performance } = require("perf_hooks");
// const start = performance.now();

// contactFunction.listContacts();

// const end = performance.now();

// const duration = end - start;
// console.log(`Funkcja List wykonała się w ${duration}`);

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

// TODO: refaktor
function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactFunction.listContacts();
      break;

    case "get":
      contactFunction.getContactById(id);
      break;

    case "add":
      contactFunction.addContact(name, email, phone);
      break;

    case "remove":
      contactFunction.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
