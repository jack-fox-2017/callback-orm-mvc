'use strict'

const express = require('express');
const app = express();
const router = express.Router();

const Db = require('../models/dbModel');
const Address = require('../models/address');
const Contacts = require('../models/contacts');

var connect = new Db();
var dbModel = new Db('./db.data.db');

router.get('/', (req, res) => {
  Contacts.findById(connect.connection, req.params.id, (err, contactbyid) => {
    Contacts.findall(connect.connection, (err, contactall) => {
      Address.findall(connect.connection, (err, addressall) => {
        for(var i = 0; i < addressall.length;i++){
          for (var j = 0; j < contactall.length; j++) {
            if(addressall[i].contact_id == contactall[j].id){
              addressall[i].name = contactall[j].name
              addressall[i].company = contactall[j].company
              addressall[i].telp_number = contactall[j].telp_number
              addressall[i].email = contactall[j].email
            }
          }
        }
        res.render(`address`, {
          data1:addressall, data2:contactall, data3:contactbyid
        })
      })
    })
  })
})

router.post('/', (req, res) => {
  Address.createData(connect.connection, req.body)
    res.redirect('/address')
})

router.get('/edit/:id', (req, res) => {
  Address.findById(connect.connection,req.params.id, (err, rows) => {
    Contacts.findall(connect.connection, (err2, rows2) => {
      if(!err)
      res.render('editaddress',{
        data:rows,data2:rows2
      })
      else
      res.send('eror =${err}')
    })
  })
})

router.post('/edit/:id', (req, res) => {
  Address.update(connect.connection, req.body, req.params.id)
  res.redirect('/address')
})

router.get('/delete/:id', (req, res) => {
  Address.remove(connect.connection, req.params.id)
  res.redirect('/address')
})

module.exports = router;
