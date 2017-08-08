class Profile{
  constructor(){

  }

  static findAll(connection, cb){
    connection.all(`SELECT * FROM Profile`, (err, rows) => {
      if(!err){
        cb(false, rows)
      } else{
        cb(true, null)
      }
    })
  }

  static createData(connection, req){
    connection.run(`INSERT INTO Profile(nickname, account, contact_id)
    VALUES ('${req.nickname}',
    '${req.account}',
    '${req.contact_id}')`)
  }

  static findById(connection, req, cb){
    connection.all(`SELECT * FROM Profile WHERE id = '${req.id}'`, (err, rows) => {
      if(!err){
        cb(false, rows)
      } else{
        cb(true, null)
      }
    })
  }

  static update(connection, req, id){
    connection.run(`UPDATE Profile SET
      nickname = '${req.nickname}',
      account = '${req.account}',
      contact_id = '${req.contact_id}' WHERE id = '${req.id}'`)
  }

  static remove(connection, req, cb){
    connection.run(`DELETE FROM Profile WHERE id = '${req.id}'`, (err, rows)=> {
      if(!err){
        cb(false, rows)
      } else{
        cb(true, null)
      }
    })
  }

}

module.exports = Profile
