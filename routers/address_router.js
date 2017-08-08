const express = require('express')
const router = express.Router()

const Addresses = require('../models/address-model')
let address = new Addresses()

const Contacts = require('../models/contact-model')
let contact = new Contacts()

let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./db/data.db')

router.get('/',(req,res)=>{
  address.findAll(db, (err,rowsA)=>{
    contact.findAll(db, (err,rowsC)=>{
      if(!err){
        res.render('addresses', {dataA:rowsA, dataC:rowsC})
      }
    })
  })
})

router.get('/',(req,res)=>{
  res.render('addresses')
})

router.post('/',(req,res)=>{
  address.createData(db, req.body, (err,rows)=>{
    contact.createData(db, req.body, (err,rowsC)=>{
      res.redirect('/addresses')
    })
  })
})

router.get('/edit/:id',(req,res)=>{
  address.findById(db, req.params.id, (err,rowsA)=>{
    // contact.createData(db, req.params.id, (err,rowsC)=>{
    res.render('edit_address', {dataA:rowsA})
    // })
  })
})

router.post('/edit/:id',(req,res)=>{
  address.update(db,req.body,req.params.id, (err,rows)=>{
    res.redirect('/addresses')
  })
})

router.get('/delete/:id',(req,res)=>{
  address.destroy(db, req.params.id)
  res.redirect('/addresses')
})


module.exports = router
