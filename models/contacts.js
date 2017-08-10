'use strict'

class Contact {
  constructor(data) {
  }

  static findall(conn, callback){
    conn.all(`SELECT * FROM contacts;`, (err, rows) => {
      if(!err){
        callback(false, rows)
      } else {
        callback(true, null)
      }
    })
  }

  static createData(conn, req) {
    conn.run(`INSERT INTO contacts(name,company,telp_number,email) VALUES ('${req.name}','${req.company}','${req.telp_number}','${req.email}')`)
  }

  static findById(conn, req, callback){
    conn.all(`SELECT * FROM contacts WHERE id = ${req}`, (err,rows) => {
      if(!err){
        callback(false,rows)
      }else {
        callback(true,null)
      }
    })
  }

  static update(conn, req, reqparams){
    conn.all(`UPDATE contacts set name = '${req.name}',company = '${req.company}',telp_number = '${req.telp_number}',email = '${req.email}' WHERE id = ${reqparams}`)
  }

  static remove(conn, reqparams){
    conn.run(`DELETE FROM contacts WHERE id = ${reqparams}`)
  }

}

module.exports = Contact;
