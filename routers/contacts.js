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
  Contacts.findall(connect.connection, (err, rows) => {
    res.render('contacts', {
      data: rows
    })
  })
})

router.post('/', (req, res) => {
  Contacts.createData(connect.connection, req.body)
  res.redirect('/contacts')
})

router.get('/edit/:id', (req, res) => {
  Contacts.findById(connect.connection, req.params.id, (err, rows) => {
    if (!err)
    res.render('editcontacts', {
      data: rows
    })
    else
    res.send('eror =${err}')
  })
})

router.post('/editContacts/:id', (req, res) => {
  Contacts.update(connect.connection, req.body, req.params.id)
  res.redirect('/contacts')
})

router.get('/delete/:id', (req, res) => {
  Contacts.remove(connect.connection, req.params.id)
  res.redirect('/contacts')
})

router.get('/detailContactsaddress/:id', (req, res) => {
  Contacts.findById(connect.connection, req.params.id, (err, contactbyid) => {
    Contacts.findall(connect.connection, (err, contactall) => {
      Address.findall(connect.connection, (err, addressall) => {
        for (var i = 0; i < addressall.length; i++) {
          for (var j = 0; j < contactall.length; j++) {
            if (addressall[i].contact_id == contactall[j].id) {
              addressall[i].name = contactall[j].name
              addressall[i].company = contactall[j].company
              addressall[i].telp_number = contactall[j].telp_number
              addressall[i].email = contactall[j].email
            }
          }
        }
        res.render(`detailContactsaddress`, {
          data1: addressall,
          data2: contactall,
          data3: contactbyid
        })
      })
    })
  })
})


module.exports = router
