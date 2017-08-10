'use strict'

const sql = require('sqlite3')
const db = new sql.Database('./db/data.db')

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS contacts
        (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, company TEXT, telp_number TEXT, email TEXT);`);
  console.log("Contacts Created");

  db.run(`CREATE TABLE IF NOT EXISTS address
          (id INTEGER PRIMARY KEY AUTOINCREMENT, street TEXT, city TEXT, zip_code,  contact_id INTEGER, FOREIGN KEY(contact_id) REFERENCES contacts(id));`);
  console.log("Address Created");
})
