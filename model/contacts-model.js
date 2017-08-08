class Contact {
  constructor() {
  }
  findAll(conn, callback){
    conn.all(`SELECT * FROM Contacts`, (err, rows) =>{
      if(!err){
        callback(false,rows)
      }
      else{
        callback(true,null)
      }

    })
  }
  findById(conn, id,  callback){
    conn.all(`SELECT * FROM Contacts WHERE id = "${id}"`, function(err, rows) {
      if(!err){
        callback(false,rows)
      }
      else{
        callback(true,null)
      }
    })
  }
  create(conn, data){
    conn.run(`INSERT INTO Contacts(name, company, telp_number, email) VALUES
    ("${data.name}","${data.company}","${data.telp})","${data.email}")`)
  }
  update(conn, data, id){
    conn.run(`UPDATE Contacts SET
      name = "${data.name}",
      company = "${data.company}",
      telp_number = "${data.telp}",
      email = "${data.email}"
      WHERE id = "${id}"`)
  }
  destroy(conn, id){
    conn.run(`DELETE FROM Contacts WHERE id = "${id}"`)
  }
}
module.exports = Contact
