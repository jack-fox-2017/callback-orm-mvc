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
  contactModel.getContacts((errContact, contacts) => {
    if (errContact)
      throw errContact

    db.connection.serialize(() => {
      contacts.forEach((contact, index) => {
        conjunctionModel.getJoinWithGroups(contact.id, (errJoin, rowsJoin) => {
          if (errJoin)
            throw errJoin

          contact.groups_name = rowsJoin.map(item => {return item.name_of_group}).join(', ')
        })
      })

      groupModel.getGroups((errGroup, groups) => {
        if (errGroup)
          throw errGroup

        res.render('contacts', {
          data: contacts,
          groups: groups
        })
      })
    })
  })
})

router.post('/', (req, res) => {
  let objData = {
    name: req.body.name,
    company: req.body.company,
    telp_number: req.body.telp_number,
    email: req.body.email
  }
  contactModel.insertContact(objData, (err, result) => {
    if (err)
      throw err

    if (req.body.hasOwnProperty('group_ids') && req.body.group_ids.length > 0)
      req.body.group_ids.forEach(item => {
        let objDataConjuntion = {
          contact_id: result.lastID,
          group_id: item
        }
        contactModel.insertToConjunction(objDataConjuntion, errConjunction => {
          if (errConjunction)
            throw errConjunction

          res.redirect('/contacts')
        })
      })
    else
      res.redirect('/contacts')
  })
})

router.get('/edit/:id', (req, res) => {
  contactModel.getContactById(req.params.id, (errContact, rowContact) => {
    if (errContact)
      throw errContact

    conjunctionModel.getJoinWithGroupsChecked(req.params.id, (errGroupCheck, rowsGroupCheck) => {
      if (errGroupCheck)
        throw errGroupCheck

      res.render('contacts-edit', {
        data: rowContact,
        groups: rowsGroupCheck
      })
    })
  })
})

router.post('/edit/:id', (req, res) => {
  let objData = {
    name: req.body.name,
    company: req.body.company,
    telp_number: req.body.telp_number,
    email: req.body.email
  }
  contactModel.updateContact(req.params.id, objData, (err) => {
    if (err)
      throw err

    if (req.body.hasOwnProperty('group_ids') && req.body.group_ids.length > 0)
      conjunctionModel.removeConjunctionBy('contact', req.params.id, (errRemove) => {
        if (errRemove)
          throw errRemove

        req.body.group_ids.forEach(item => {
          let objData = {
            contact_id: req.params.id,
            group_id: item
          }
          conjunctionModel.insertConjunction(objData)
        })

        res.redirect('/contacts')
      })
    else
      res.redirect('/contacts')
  })
})

router.get('/delete/:id', (req, res) => {
  db.connection.serialize(() => {
    contactModel.removeContact(req.params.id)
    conjunctionModel.removeConjunctionBy('contact', req.params.id)
    res.redirect('/contacts')
  })
})

module.exports = router
