const express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // digunakan saat menjalankan fungsi POST
app.use(bodyParser.urlencoded({
  extended: true
})); // hasil post di encoded

//-------untuk require export DB-----//
var setupDB = require('../models/dbmodel');
let dbCreate = new setupDB('./db/data.db');

class Addresses{
  constructor(data){
    this.id = data.id;
    this.street = data.street;
    this.city = data.city;
    this.zipcode = data.zipcode;
    this.user_id = data.user_id;
  }

  static showAddresses(conn, callback){
    conn.all(`SELECT * FROM Addresses`, function(err, rows){
      if(!err)
      {
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    })
  }

  static addAddresses(conn, data){
    conn.run(`INSERT INTO Addresses
    (street, city, zipcode, user_id)
    VALUES ('${data.street}', '${data.city}',
    '${data.zipcode}', '${data.user_id}')`)
  }

  static editAddressesForm(conn, data, callback){
    conn.all(`SELECT *FROM Addresses WHERE id = ${data.id}`, function(err, rows){
      if(!err){
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    })
  }

  static editAddressesData(conn, data, params){
    conn.run(`UPDATE Addresses SET street = '${data.street}',
    city = '${data.city}', zipcode = '${data.zipcode}',
    user_id = '${data.user_id}' WHERE id = ${params}`)
  }

  static deleteAddresses(conn, params){
    conn.run(`DELETE FROM Addresses WHERE id = ${params.id}`)
  }
}


module.exports = Addresses
