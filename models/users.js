const express = require('express');
var app = express();
// var path = require('path');
var bodyParser = require('body-parser');
//
// app.set('view engine', 'ejs');

app.use(bodyParser.json()); // digunakan saat menjalankan fungsi POST
app.use(bodyParser.urlencoded({
  extended: true
})); // hasil post di encoded

//-------untuk require export DB-----//
var setupDB = require('../models/dbmodel');
let dbCreate = new setupDB('./db/data.db');

// const Groups = require('../models/group');

class Users{
  constructor(data){
    this.id = data.id;
    this.username = data.username;
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.email = data.email;
  }

  static showUsers(conn, callback){
    conn.all(`SELECT * FROM Users`, function(err, rows){
      if(!err){
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    })
  }

  static addUsers(conn, data){
    conn.run(`INSERT INTO Users (username, firstname, lastname, email)
    VALUES ('${data.username}', '${data.firstname}', '${data.lastname}',
    '${data.email}')`)
  }

  static editUsersForm(conn, data, callback){
    conn.all(`SELECT * FROM Users WHERE id = ${data.id}`, function(err, rows){
      // console.log("====>",rows);
      if(!err){
        callback(false, rows)
      }
      else {
        callback(true, null)
      }
    })
  }

  static editUsersData(conn, data, id){
    console.log("===>>", id);
    conn.run(`UPDATE Users SET username = '${data.username}',
    firstname = '${data.firstname}',
    lastname = '${data.lastname}',
    email = '${data.email}' WHERE id = ${id}`)
  }

  static deleteUsers(conn, params){
    conn.run(`DELETE FROM Users WHERE id = ${params.id}`)
  }
}

module.exports = Users
