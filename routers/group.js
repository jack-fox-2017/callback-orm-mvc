const express = require('express');
const router = express.Router()
const Group = require('../models/group');
const dbModel = require('../models/index');

let dataModel = new dbModel('./db/data.db')
let conn = dataModel.database
let dataGroup = new Group()

router.get('/', (req, res) => {
  dataGroup.findAll(conn, (err, data) => {
    res.render('group', {groupData: data})
  })
})

router.post('/', (req, res) => {
  Group.createData(conn, req.body)
  res.redirect('/groups')
})

router.get('/:id/edit', (req, res) => {
  Group.findById(conn, req.params, (err, data) => {
    res.render('group-edit', {edit: data[0]})
  })
})

router.post('/:id/edit', (req, res) => {
  Group.updateData(conn, req.params, req.body)
  res.redirect('/groups')
})

router.get('/:id/delete', (req, res) => {
  Group.destroyData(conn, req.params)
  res.redirect('/groups')
})

module.exports = router;
