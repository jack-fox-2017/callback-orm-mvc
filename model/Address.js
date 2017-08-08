'use strict'

class Address {
  constructor(data) {
  }

  static findall(conn,callback){
    conn.all(`SELECT * FROM Addresses;`,function(err,rows){
      if(!err){
        callback(false,rows)
      } else {
        callback(true,null)
      }
    })
  }

  static createData(conn,req){
    conn.run(`INSERT INTO Addresses(street,city,zipcode,contact_id) VALUES ('${req.street}','${req.city}','${req.zipcode}',${req.contact_id})`)
  }

  static findById(conn,req,callback){
    conn.all(`SELECT * FROM Addresses WHERE id = ${req}`,function(err,rows){
      if(!err){
        callback(false,rows)
      }else {
        callback(true,null)
      }
    })
  }

  static update(conn,req,reqparams){
    conn.all(`UPDATE Addresses SET street = '${req.street}', city = '${req.city}' , zipcode = '${req.zipcode}', contact_id = ${req.contact_id} WHERE id = ${reqparams}`)
  }

  static remove(conn,reqparams){
    conn.run(`DELETE FROM Addresses WHERE id = ${reqparams}`)
  }

}

module.exports = Address;
