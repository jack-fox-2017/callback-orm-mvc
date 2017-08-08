const express = require('express');
var router = express.Router();

//-------untuk require export DB-----//
var setupDB = require('../models/dbmodel');
let dbCreate = new setupDB('./db/data.db');

//---------------ORM-------------------//
//------------ORM CONTACT-------------//
// const Group = require('../models/group');
const Users = require('../models/users'); // require contact.js berdasarkan classnya

router.get('/', function(req, res){
  Users.showUsers(dbCreate.connection, function(err, rows){
    res.render('users', {dataUsers: rows})
  })
})

router.get('/add', function(req, res){
  res.render('users-add-form');
})

router.post('/add', function(req, res){
  Users.addUsers(dbCreate.connection, req.body)
  res.redirect('/users')
})

router.get('/edit/:id', function(req, res){
  Users.editUsersForm(dbCreate.connection, req.params, function(err, rows){
    res.render('users-edit-form', {dataUsers:rows[0]})
  })
})

router.post('/edit/:id', function(req, res){
  Users.editUsersData(dbCreate.connection, req.body, req.params.id)
  res.redirect('/users')
})

router.get('/delete/:id', function(req, res){
  Users.deleteUsers(dbCreate.connection, req.params)
  res.redirect('/users')
})

module.exports = router;
