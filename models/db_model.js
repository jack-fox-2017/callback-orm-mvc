var sqlite = require('sqlite3').verbose();
var file = './db/database.db';

class DbModel {
  constructor() {
    this.connection = new sqlite.Database(file)
  }

  getConnection(){
    this.connection.run(`CREATE TABLE IF NOT EXISTS Contact(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name varchar(100),
      company varchar(100),
      telp_number varchar(12),
      email varchar(25))`)

    this.connection.run(`CREATE TABLE IF NOT EXISTS Address(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      street_name varchar(255),
      city varchar(255),
      province varchar(255),
      zipcodes INTEGER,
      contact_id INTEGER, FOREIGN KEY(contact_id) REFERENCES Contact(id))`)

    this.connection.run(`CREATE TABLE IF NOT EXISTS Profile(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nickname varchar(255),
      account varchar(255),
      contact_id INTEGER, FOREIGN KEY(contact_id) REFERENCES Contact(id), UNIQUE(contact_id))`)
  }
}


module.exports = DbModel
