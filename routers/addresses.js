var express = require('express');
var router = express.Router();

const ModelDb = require('../models/DBModel');
const mAddress = require('../models/address');
const mContact = require('../models/contact');
let dbModel = new ModelDb('./db/data.db')

router.get('/', (req,res) => {
  mAddress.findAll(dbModel.connection, (err, address) => {
    mContact.findAll(dbModel.connection, (err2, contact) => {
      if(!err2) {
        for(let i = 0; i < address.length; i++){
            for (let j = 0; j < contact.length; j++) {
              if(address[i].contact_id == contact[j].id){
                address[i].name = contact[j].name
              }
            }
          }
        // console.log(contact);
        res.render('addresses', {adr: address, ctc: contact})
      }
    })
  })
})

router.post('/', (req,res) => {
  mAddress.createData(dbModel.connection, req.body)
  res.redirect('/addresses')
})

router.get('/edit/:id', (req,res) => {
  mAddress.findById(dbModel.connection, req.params, (err, address) => {
    mContact.findAll(dbModel.connection, (err2, contact) => {
      if(!err2) {
        res.render('edit-address', {adr: address[0], ctc: contact})
      }
    })
  })
})

router.post('/edit/:id', (req,res) => {
  mAddress.update(dbModel.connection, req.body, req.params)
  res.redirect('/addresses')
})

router.get('/delete/:id', (req,res) => {
  mAddress.remove(dbModel.connection, req.params)
  res.redirect('/addresses')
})

router.get('/with_contact/:id', (req,res) => {
  mAddress.findById(dbModel.connection, req.params, (err, address) => {
    if(!err) {
      mContact.findX(dbModel.connection, address[0].contact_id, (err2, contact) => {

        address[0].company = contact.company;
        address[0].name = contact.name;
        // console.log(address);
        res.render('addresses_with_contact', {adr: address[0]})
      })
    } else {console.log('erorr');}
  })
})


module.exports = router
