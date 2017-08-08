var sqlite3 = require('sqlite3').verbose();

class Address{
  constructor(){
  }

  static insertData(conn,req){
    // var query = `INSERT INTO address (postal_code, street, city, contacts_id) VALUES ('${data.postal_code}','${data.street}','${data.city}',${data.contacts_id});`;
    // conn.run(query, function(err,data){
    //   if(!err){
    //     cb(null,data)
    //   } else {
    //     cb(err,null)
    //   }
    // })
    conn.run(`INSERT INTO address (postal_code, street, city,contacts_id) VALUES ('${req.postal_code}','${req.street}','${req.city}',${req.contacts_id});`);
  }

  static remove(conn,id){
    // var query = `DELETE FROM address WHERE id = ${id}`;
    // conn.run(query, function(err,data){
    //   if(!err){
    //     cb(null,data)
    //   } else {
    //     cb(err,null)
    //   }
    // })
    conn.run(`DELETE FROM address WHERE id = ${id}`)
  }

  static update(conn,req,id){
    // var query = `UPDATE address SET postal_code = '${data.postal_code}', city = '${data.city}', street = '${data.street}' WHERE id = '${data.id}'`;
    // conn.run(query, function(err,data){
    //   if(!err){
    //     cb(null,data)
    //   } else {
    //     cb(err,null)
    //   }
    // })
    conn.run(`UPDATE address SET postal_code = '${req.postal_code}', city = '${req.city}', street = '${req.street}' WHERE id = '${id}'`)
  }

  static findById (conn,req,cb){
    var query = `SELECT * FROM address WHERE id = ${req.id}`;
    conn.all(query, function(err,data){
      if(!err){
        cb(null,data)
      } else {
        cb(err,null)
      }
    })
  }

  static findAll (conn,cb){
    var query = `SELECT * FROM address`;
    conn.all(query, function(err,data){
      if(!err){
        cb(null,data)
      } else {
        cb(err,null)
      }
    })
  }

}



module.exports = Address;
