class Address{
  constructor(){

  }

  static findAll(connection, cb){
    connection.all(`SELECT * FROM Address`, (err, rows) => {
      if(!err){
        cb(false, rows)
      } else{
        cb(true, null)
      }
  	})
  }

  static createData(connection, req){
    connection.run(`INSERT INTO Address(street_name, city, province, zipcodes, contact_id)
    VALUES ('${req.street_name}',
    '${req.city}',
    '${req.province}',
    '${req.zipcodes}',
    '${req.contact_id}')`)
  }

  static findById(connection, req, cb){
    connection.all(`SELECT * FROM Address WHERE id = '${req.id}'`, (err, rows) => {
      if(!err){
        cb(false, rows)
      } else{
        cb(true, null)
      }
    })
  }

  static update(connection, req, id){
    connection.run(`UPDATE Address SET
      street_name = '${req.street_name}',
      city = '${req.city}',
      province = '${req.province}',
      zipcodes = '${req.zipcodes}',
      contact_id = '${req.contact_id}' WHERE id = '${id}'`)
  }

  static remove(connection, req, cb){
    connection.run(`DELETE FROM Address WHERE id = '${req.id}'`, (err, rows)=> {
      if(!err){
        cb(false, rows)
      } else{
        cb(true, null)
      }
    })
  }

}

module.exports = Address
