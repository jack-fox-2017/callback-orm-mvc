const DB_Model = require('./db_model')

class Address{

  static findAll(connection, callback){
    connection.all(`SELECT * FROM addresses`, function(err, rows){
        if(!err){
          callback(null,rows)
        }
        else{
          callback(err,null)
        }
      })
  }

  static findById(connection, req, callback){
    connection.each(`SELECT * FROM addresses WHERE id = ${req.id}`, function(err,rows){
        if(!err){
          callback(null,rows)
        }
        else{
          callback(err,null)
        }
      })
  }

  static update(connection, req, reqs){
    connection.run(`UPDATE addresses SET street='${req.street}',
                              city='${req.city}',
                              zip_code='${req.zip_code}'
                              WHERE id=${reqs.id}`)
  }

  static destroy(connection, req){
    connection.run(`DELETE FROM addresses WHERE id=${req.id}`)
  }

  static createData(connection, req){
    connection.run(`INSERT INTO addresses(street,city,zip_code,contact_id)
               VALUES('${req.street}',
                      '${req.city}',
                      '${req.zip_code}',
                      '${req.contact_id}'
                       )`)
  }
}

module.exports = Address
