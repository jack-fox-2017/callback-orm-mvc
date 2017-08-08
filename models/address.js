class Address {
  constructor() {}

  static findAll(conn, callback) {
    conn.all(`SELECT * FROM Addresses;`, (err, rows) => {
      if(!err) {
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    })
  }

  static createData(conn, data) {
    conn.run(`INSERT INTO Addresses (street, city, zip, contact_id)
            VALUES ('${data.street}','${data.city}','${data.zip}','${data.contact_id}')`)
  }

  static findById(conn, param, callback) {
    conn.all(`SELECT * FROM Addresses WHERE id = ${param.id}`, (err, rows) => {
      if(!err) {
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    })
  }

  static update(conn, data, param) {
    conn.run(`UPDATE Addresses SET street='${data.street}', city='${data.city}',
    zip='${data.zip}', contact_id='${data.contact_id}' WHERE id=${param.id}`)
  }

  static remove(conn, param) {
    conn.run(`DELETE FROM Addresses WHERE id = ${param.id}`)
  }

}//end of class


module.exports = Address
