
class Contact{
  constructor(){}

  static findAll(connection, cb){
    connection.all(`SELECT * FROM Contact`, (err, rows) => {
      if(!err){
        cb(false, rows)
      } else{
        cb(true, null)
      }
  	})
  }
  //input data
  static createData(connection, req){
    connection.run(`INSERT INTO Contact(name, company, telp_number, email)
    VALUES ('${req.name}',
    '${req.company}',
    '${req.telp_number}',
    '${req.email}')`) //groups_id ,'${req.body.groups_id}'
  }

  static findById(connection, req, cb){
    connection.all(`SELECT * FROM Contact WHERE id = '${req.id}'`, (err, rows) => {
      if(!err){
        cb(false, rows)
      } else{
        cb(true, null)
      }
    })
  }

  static update(connection, req, id){
    connection.run(`UPDATE Contact SET
      name ='${req.name}',
      company = '${req.company}',
      telp_number ='${req.telp_number}',
      email ='${req.email}' WHERE id = '${id}'`) //, groups_id ='${req.body.groups_id}'
  }

  static remove(connection, req, cb){
    connection.run(`DELETE FROM Contact WHERE id = '${req.id}'`, (err, rows)=> {
      if(!err){
        cb(false, rows)
      } else{
        cb(true, null)
      }
    })
  }


}

module.exports = Contact;
