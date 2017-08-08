const express = require('express');
const router = express.Router();

const DB_Model = require('../model/db_model.js');
const address_model = require('../model/address.js');
const contacts_model = require('../model/contacts.js');

let database_model= new DB_Model('./db/data.db')
const connection = database_model.newdatabase


router.get('/', (req, res)=>{
  address_model.findAll(connection, (err, rowsAddress)=>{
  contacts_model.findAll(connection, (err, rowsContacts)=>{
    res.render('address', {data:rowsAddress, dataContacts:rowsContacts})
  })
  })
})

router.get('/', (req, res)=>{
  address_model.createData(connection, req.body)
    res.redirect('/address')
})

router.get('/edit/:id', (req, res)=>{
  address_model.findById(connection, (err,rowsAddress)=>{
  // contacts_model.findByAll(connection, (err, rowsContacts)=>{
    res.render('editaddress',{data:rowsAddress,dataContacts:rowsContacts})
  })
  // })
})

router.get('/edit/:id', (req, res)=>{
  address_model.update(connection, req.body, req.params)
    res.redirect('/address')
})

router.get('/delete/:id', (req, res)=>{
  address_model.destroy(connection , req.params)
    res.redirect('/address')
})

module.exports = router
