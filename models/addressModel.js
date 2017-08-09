
class Address {
  constructor(data) {
    this.id = data.id
    this.street = data.street
    this.city = data.city
    this.zip_code = data.zip
    this.ContactId = data.ContactId
  }

  static findAll(connection, callback) {
    connection.all(`SELECT * FROM Addresses;`, (err, data) => {
      connection.all(`SELECT * FROM Contacts;`, (err2, data2) => {
        if(!err2) {
          callback(false, data, data2)
        }
        else {
          callback(true, null, null)
        }
      })
    })
  }

  static createData(connection, req) {
    connection.run(`INSERT INTO Addresses (street, city, zip_code, ContactId) VALUES ('${req.street}', '${req.city}', '${req.zip}', ${req.contactId});`)
  }

  static remove(connection, id) {
    connection.run(`DELETE FROM Addresses WHERE id=${id}`)
  }

  static findById(connection, id, callback) {
    connection.each(`SELECT * FROM Addresses WHERE id=${id}`, (err, data) => {
      connection.all(`SELECT * FROM Contacts;`, (err2, data2) => {
        if(!err2) {
          callback(false, data, data2)
        }
        else {
          callback(true, null, null)
        }
      })
      // if(!err) {
      //   callback(false, data)
      // }
      // else {
      //   callback(true, null)
      // }
    })
  }

  static update(connection, req, id) {
    connection.run(`UPDATE Addresses SET street='${req.street}', city='${req.city}', zip_code='${req.zip}', ContactId=${req.contactId} WHERE id=${id};`)
  }

}

module.exports = Address
