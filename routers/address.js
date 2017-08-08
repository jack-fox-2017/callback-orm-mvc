const express = require('express')
const router = express.Router()

// const sqlite3 = require('sqlite3')
// const db = new sqlite3.Database('./db/data.db')

const addressModel = require('../models/addressModel')
const contactModel = require('../models/contactModel')


var dbModel = require('../models/dbModel')
var conn = new dbModel()

router.get('/', (req, res) => {
  addressModel.findAll(conn.connection, (err, data, data2) => {
    for (let i=0; i<data.length; i++) {
      for (let j=0; j<data2.length; j++) {
        if (data[i].ContactId == data2[j].id) {
          data[i].name = data2[j].name
        }
      }
    }
    res.render('address', {data: data, data2: data2})
  })
})

router.post('/', (req, res) => {
  addressModel.createData(conn.connection, req.body)
  res.redirect('/addresses')
})

router.get('/delete/:id', (req, res) => {
  addressModel.remove(conn.connection, req.params.id)
  res.redirect('/addresses')
})

router.get('/edit/:id', (req, res) => {
  addressModel.findById(conn.connection, req.params.id, (err, data) => {
    res.render('address_edit', {data: data[0]})
  })
})

router.post('/edit/:id', (req, res) => {
  addressModel.update(conn.connection, req.body, req.params.id)
  res.redirect('/addresses')
})

module.exports = router
