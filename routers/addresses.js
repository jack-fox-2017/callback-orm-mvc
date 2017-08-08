const express = require('express');
var router = express.Router();

//-------untuk require export DB-----//
var setupDB = require('../models/dbmodel');
let dbCreate = new setupDB('./db/data.db');

//---------------ORM-------------------//
//------------ORM CONTACT-------------//
// const Group = require('../models/group');
const Addresses = require('../models/addresses'); // require contact.js berdasarkan classnya
const Users = require('../models/users');

router.get('/', function(req, res){
  Addresses.showAddresses(dbCreate.connection, function(err, rows){
    Users.showUsers(dbCreate.connection, function(err, rows2){
      // console.log("====>",rows2);
      for(let i=0; i<rows.length; i++)
      {
        for(let j=0; j<rows2.length; j++)
        {
          if(rows[i].user_id == rows2[j].id)
          {
            rows[i].username = rows2[j].username
          }
        }
      }
      res.render('addresses', {dataAddresses:rows})
    })
  })
})

router.get('/add', function(req, res){
  Addresses.showAddresses(dbCreate.connection, function(err, rows){
    Users.showUsers(dbCreate.connection, function(err, rows2){
      res.render('addresses-add-form',{dataAddresses:rows ,dataUsers:rows2});
    })
  })
})

router.post('/add', function(req, res){
  Addresses.addAddresses(dbCreate.connection, req.body)
  res.redirect('/addresses')
})

router.get('/edit/:id', function(req, res){
  Addresses.editAddressesForm(dbCreate.connection, req.params, function(err, rows){
    Users.showUsers(dbCreate.connection, function(err, rows2){
      console.log('====>',rows2);
      res.render('addresses-edit-form', {dataAddresses:rows[0], dataUsers:rows2})
    })
  })
})

router.post('/edit/:id', function(req, res){
  Addresses.editAddressesData(dbCreate.connection, req.body, req.params.id)
  res.redirect('/addresses')
})

router.get('/delete/:id', function(req, res){
  Addresses.deleteAddresses(dbCreate.connection, req.params)
  res.redirect('/addresses')
})

module.exports = router;
