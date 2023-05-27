const fs = require("fs");
const path = require("path");
const newPath = path.join(__dirname, "db", "contacts.json");
const uniqid = require("uniqid");

function listContacts() {
  fs.readFile(newPath, (err, data) => {
    if (err) {
      console.error("Error");
      return;
    }
    const array = JSON.parse(data);

    console.table(array);
  });
}

function getContactById(contactId) {
  fs.readFile(newPath, (err, data) => {
    if (err) {
      console.error(`Błąd w pliku ${err}`);
      return;
    }
    try {
      const contacts = JSON.parse(data);

      contacts.map((contact) => {
        if (contact.id === contactId) {
          console.log(contact);
        }
      });
    } catch {
      console.error("No contact found");
    }
  });
}

function removeContact(contactId) {
  fs.readFile(newPath, (err, data) => {
    if (err) {
      console.error(`Błąd w pliku ${err}`);
      return;
    }

    try {
      const contacts = JSON.parse(data);
      console.log("Before:");
      console.table(contacts);
      const delateItem = contacts.findIndex((iteam) => iteam.id === contactId);

      if (delateItem < 0) {
        console.log("Contact not found");
        return;
      }

      contacts.splice(delateItem, 1);

      console.log("After:");
      console.table(contacts);
      fs.writeFile(newPath, JSON.stringify(contacts), (err) => {
        if (err) {
          console.error("Wystąpił błąd");
        }
      });
    } catch {
      console.error("An error occurred");
    }
  });
}

function addContact(name, email, phone) {
  fs.readFile(newPath, (err, data) => {
    if (err) {
      console.error("Error");
      return;
    }
    try {
      const contacts = JSON.parse(data);
      const newContact = { id: uniqid(), name, email, phone };
      contacts.push(newContact);
      console.table(contacts);
      fs.writeFile(newPath, JSON.stringify(contacts), (err) => {
        if (err) {
          console.error("Error");
          return;
        }
      });
    } catch {
      console.error("Error");
    }
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

// removeContact("e6ywwRe4jcqxXfCZOj_1e");
// getContactById("vza2RIzNGIwutCVCs4mCL");
// addContact("dawid", "daw@daw.pl", "572");
