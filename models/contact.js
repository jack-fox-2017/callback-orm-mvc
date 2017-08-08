// const ModelDb = require('./DBModel');

class Contact {
  constructor() {}

  // static findAll(conn, callback) {
  //   conn.all(`SELECT * FROM Contacts;`, (err, rows) => {
  //     if(!err) {
  //       // console.log(rows)
  //       callback(false, rows)
  //     }
  //     else {
  //       callback(true, null)
  //     }
  //   })
  // }

  static findAll(conn, callback) {
    let arr=[]
    conn.each(`SELECT * FROM Contacts;`, (err, rows) => {
      if(!err) {
        arr.push(rows)
        // callback(false, rows)
      }
      else {
        callback(true, null)
        // throw err
      }
    }, () => {
      callback(false, arr)
    })
  }

  static createData(conn, data) {
    conn.run(`INSERT INTO Contacts (name, company, telp_number, email)
    VALUES ('${data.name}', '${data.company}', '${data.telp_number}', '${data.email}')`)
  }

  // static findById(conn, param, callback) {
  //   conn.all(`SELECT * FROM Contacts WHERE id = ${param.id}`, (err, rows) => {
  //     if(!err) {
  //       console.log(rows);
  //       callback(false, rows)
  //     }
  //     else {
  //       callback(true, null)
  //     }
  //   })
  // }

  static findById(conn, param, callback) {
    conn.get(`SELECT * FROM Contacts WHERE id = ${param.id}`, (err, rows) => {
      if(!err) {
        // console.log(rows);
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    })
  }

  static findX(conn, int, callback) {
    conn.get(`SELECT * FROM Contacts WHERE id = ${int}`, (err, rows) => {
      if(!err) {
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    })
  }

  static update(conn, data, param) {
    conn.run(`UPDATE Contacts SET name='${data.name}', company='${data.company}',
    telp_number='${data.telp_number}', email='${data.email}' WHERE id=${param.id}`)
  }

  static remove(conn, param) {
    conn.run(`DELETE FROM Contacts WHERE id = ${param.id}`)
  }
}

module.exports = Contact
