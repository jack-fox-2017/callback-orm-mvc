
class Contact {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.company = data.company
    this.phone = data.phone
    this.email = data.email
  }

  static findAll(connection, callback) {
    connection.all(`SELECT * FROM Contacts;`, (err, data) => {
      if(!err) {
        callback(false, data)
      }
      else {
        callback(true, null)
      }
    })
  }

  static createData(connection, req) {
    connection.run(`INSERT INTO Contacts (name, company, phone, email) VALUES ('${req.name}', '${req.company}', '${req.phone}', '${req.email}');`)
  }

  static remove(connection, id) {
    connection.run(`DELETE FROM Contacts WHERE id=${id}`)
  }

  static findById(connection, id, callback) {
    connection.all(`SELECT * FROM Contacts WHERE id=${id}`, (err, data) => {
      if(!err) {
        callback(false, data)
      }
      else {
        callback(true, null)
      }
    })
  }

  static update(connection, req, id) {
    connection.run(`UPDATE Contacts SET name='${req.name}', company='${req.company}', phone='${req.phone}', email='${req.email}' WHERE id=${id}`)
  }

}

module.exports = Contact
