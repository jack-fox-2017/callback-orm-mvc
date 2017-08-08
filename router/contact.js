const express = require('express');
const app = express()
const router = express.Router();

// body parser true
const bodyParser = require(`body-parser`)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//view engine
app.set(`view engine`,`ejs`)

// const sqlite3 = require(`sqlite3`).verbose();
// const db = new sqlite3.Database(`./db/data.db`)

//orm
const DbModel = require(`../models/dbModel`)
const contactsModel = require(`../models/contacts`)

const db = new DbModel(`./db/data.db`)
const contacts = new contactsModel(db.connection)



// contact page
router.get(`/`,function(req,res){
  contacts.findAllContacts((err,rows) => {
    res.render('contacts', {data: rows})
  })

})

router.post(`/`,function(req,res){
  var add = {
    name:`${req.body.name}`,
    company:`${req.body.company}`,
    telp_number:`${req.body.telp_number}`,
    email:`${req.body.email}`
  }

  contacts.createContacts(add,(err,statement) =>{
    res.redirect(`/contacts`)
  })

})

router.get('/delete', function(req,res){
  var id = req.query.id
  contacts.destroyContacts(id, (errUsers,statement) => {
    res.redirect(`/contacts`)
  })
})

router.get(`/edit`, function(req,res){
  var id = req.query.id
  contacts.findByIdContacts(id,(err,rows) =>{
    res.render('contacts-edit',{data: rows})
  })
})

router.post(`/edit`, function(req,res){
  var obj = {
    id: req.query.id,
    name:`${req.body.name}`,
    company:`${req.body.company}`,
    telp_number:`${req.body.telp_number}`,
    email:`${req.body.email}`
  }

  contacts.updateContacts(obj,(errUsers,statement) => {
    res.redirect(`/contacts`)
  })
})




module.exports = router
