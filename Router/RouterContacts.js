'use strict'

const express = require('express');
const app = express();
var router = express.Router();

const DB = require('../model/dbModel');
const Contact = require('../model/Contacts')

var connect = new DB();
var dbModel = new DB("./db/data.db");

router.get('/',function(req,res){
Contact.findall(connect.connection,function(err,rows){
  res.render('contacts',{data: rows})
  })
})

router.post('/',function(req,res){
  Contact.createData(connect.connection,req.body)
    res.redirect('/contacts')
})

router.get('/editContacts/:id',function(req,res){
  Contact.findById(connect.connection,req.params.id,function(err,rows){
    if(!err)res.render('editContacts',{data:rows})
    else res.send('eror =${err}')
  })
})

router.post('/editContacts/:id',function(req,res){
  Contact.update(connect.connection,req.body,req.params.id)
  res.redirect('/contacts')
})

router.get('/delete/:id',function(req,res){
  Contact.remove(connect.connection,req.params.id)
  res.redirect('/contacts')
})

module.exports = router
