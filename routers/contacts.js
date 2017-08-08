var express = require('express');
var router = express.Router();

const ModelDb = require('../models/DBModel');
const mContact = require('../models/contact');
let dbModel = new ModelDb('./db/data.db')

router.get('/', (req, res) => {
  // db.all(`SELECT * FROM Contacts`, function (err, data) {
  mContact.findAll(dbModel.connection, (err, contact) => {
    res.render('contacts', {ctc: contact})
    })
})

router.post('/', (req,res) => {
  mContact.createData(dbModel.connection, req.body)
  res.redirect('/contacts')
})

router.get('/edit/:id', (req,res) => {
  mContact.findById(dbModel.connection, req.params, (err, contact) => {
    res.render('edit-contact', {ctc: contact})
  })
})

router.post('/edit/:id', (req,res) => {
  mContact.update(dbModel.connection, req.body, req.params)
  res.redirect('/contacts')
})

router.get('/delete/:id', (req,res) => {
  mContact.remove(dbModel.connection, req.params)
  res.redirect('/contacts')
})


module.exports = router
