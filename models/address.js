'use strict'

class Address {
  constructor(data) {

  }

  static findall(conn, callback) {
    conn.all(`SELECT * FROM address`, (err, rows) => {
      if (!err) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }

  static createData(conn, req) {
    conn.run(`INSERT INTO address(street, city, zip_code, contact_id) VALUES ('${req.street}', '${req.city}', '${req.zip_code}', '${req.contact_id}')`)
  }

  static findById(conn, req, callback) {
    conn.all(`SELECT * FROM address WHERE id = ${req}`, (err, rows) => {
      if (!err) {
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }

  static update(conn, req, reqparams) {
    conn.all(`UPDATE address set street = '${req.street}', city = '${req.city}', zip_code = '${req.zip_code}', contact_id = '${req.contact_id}' WHERE id = ${reqparams}`)
  }

  static remove(conn, reqparams) {
    conn.run(`DELETE FROM address WHERE id = ${reqparams}`)
  }

}

module.exports = Address;
