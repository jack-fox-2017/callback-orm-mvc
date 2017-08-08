'use strict'

const express = require('express');
const router = express.Router();

const DbModel = require('../models/dbModels');
const Groups = require('../models/group');
const ContactGroups = require('../models/contactGroups');
const Contacts = require('../models/contact');

let dbModel = new DbModel('./db/data.db');

const connection = dbModel.connection;

router.get('/', function(req,res) {
  Groups.findAll(connection, function(rows) {
      res.render('group', {data: rows});
  })
});

router.post('/', function(req,res) {
  Groups.insertData(connection, req.body);
  res.redirect('/groups');
})


router.get('/edit/:id', function(req, res){
  Groups.findById(connection, req.params.id, function(rows) {
    res.render('groupEdit', {data: rows});
  })
})

router.post('/edit/:id', function(req, res){
  Groups.updateData(connection, req.body, req.params.id);
  res.redirect('/groups');
})

router.get('/contact/:id', function(req, res){
  Groups.findById(connection, req.params.id, function(rows) {
    // console.log(rows+'ini data rows');
    Contacts.showContact(connection, function(rows2) {
      // console.log(rows2+ 'ini data rows2');
        res.render('groupContact', {data_group: rows, data_contact: rows2});
    })
  })
});

router.post('/contact/:id', function(req, res){
  ContactGroups.insertDataConjuction(connection, req.body, req.params.id);
  res.redirect('/groups');
})

router.get('/delete/:id', function(req, res){
  Groups.removeData(connection, req.params.id);
  res.redirect('/groups');
});

module.exports = router;
