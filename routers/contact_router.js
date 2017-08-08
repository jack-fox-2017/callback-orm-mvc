const express = require('express')
const router = express.Router()

const Contacts = require('../models/contact-model')
let contacts = new Contacts()
let sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database('./db/data.db')

router.get('/',(req,res)=>{
  contacts.findAll(db, (err,rows)=>{
    if(!err){
      res.render('contacts', {dataC:rows})
    }
  })
})

router.get('/',(req,res)=>{
  res.render('contacts')
})

router.post('/',(req,res)=>{
  contacts.createData(db, req.body, (err,rows)=>{
    res.render('contacts', {dataC:rows})
  })
})

router.get('/edit/:id',(req,res)=>{
  contacts.findById(db, req.params.id, (err,rows)=>{
    res.render('edit_contact', {dataC:rows})
  })
})

router.post('/edit/:id',(req,res)=>{
  contacts.update(db,req.body,req.params.id, (err,rows)=>{
    res.redirect('/contacts')
  })
})

router.get('/delete/:id',(req,res)=>{
  contacts.destroy(db, req.params.id)
  res.redirect('/contacts')
})


module.exports = router
