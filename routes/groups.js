const express = require('express')
let router = express.Router()

const DBModel = require('../models/db_model.js')
const Contact = require('../models/contact.js')
const Group = require('../models/group.js')
const Conjunction = require('../models/group_contact.js')

const db = new DBModel('./db/data.db')
const contactModel = new Contact(db.connection)
const groupModel = new Group(db.connection)
const conjunctionModel = new Conjunction(db.connection)

router.get('/', (req, res) => {
  groupModel.getGroups((errGroup, groups) => {
    if (errGroup)
      throw errGroup

    db.connection.serialize(() => {
      groups.forEach((group, index) => {
        conjunctionModel.getJoinWithContacts(group.id, (errJoin, rowsJoin) => {
          if (errJoin)
            throw errJoin

          group.contacts_name = rowsJoin.map(item => {return item.name}).join(', ')
        })
      })

      contactModel.getContacts((errContact, contacts) => {
        if (errContact)
          throw errContact

        res.render('groups', {
          data: groups,
          contacts: contacts
        })
      })
    })
  })
})

router.post('/', (req, res) => {
  let objData = {name_of_group: req.body.name_of_group}
  groupModel.insertGroup(objData, (err, result) => {
    res.redirect('/groups')
  })
})

router.get('/edit/:id', (req, res) => {
  groupModel.getGroupById(req.params.id, (errGroup, rowGroup) => {
    if (errGroup)
      throw errGroup

    conjunctionModel.getJoinWithContactsChecked(req.params.id, (errContactCheck, rowsContactCheck) => {
      if (errContactCheck)
        throw errContactCheck

      res.render('groups-edit', {
        data: rowGroup,
        contacts: rowsContactCheck
      })
    })
  })
})

router.post('/edit/:id', (req, res) => {
  let objData = {name_of_group: req.body.name_of_group}
  groupModel.updateGroup(req.params.id, objData, (err) => {
    if (err)
      throw err

    if (req.body.hasOwnProperty('contact_ids') && req.body.contact_ids.length > 0)
      conjunctionModel.removeConjunctionBy('group', req.params.id, (errRemove) => {
        if (errRemove)
          throw errRemove

        req.body.contact_ids.forEach(item => {
          let objData = {
            contact_id: item,
            group_id: req.params.id
          }
          conjunctionModel.insertConjunction(objData)
        })

        res.redirect('/groups')
      })
    else
      res.redirect('/groups')
  })
})

router.get('/delete/:id', (req, res) => {
  db.connection.serialize(() => {
    groupModel.removeGroup(req.params.id)
    conjunctionModel.removeConjunctionBy('group', req.params.id)
    res.redirect('/groups')
  })
})

module.exports = router
