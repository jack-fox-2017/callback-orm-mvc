'use strict'

const sql = require('sqlite3')

class Db {
  constructor() {
    this.connection = new sql.Database('./db/data.db')
  }
}


module.exports = Db;
