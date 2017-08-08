const express = require('express');
const app = express()
const router = express.Router();

// body parser true
const bodyParser = require(`body-parser`)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
//view engine
app.set(`view engine`,`ejs`)


const DbModel = require(`../models/dbModel`)
const contactsModel = require(`../models/contacts`)
const addressesModel = require(`../models/addresses`)

const db = new DbModel(`./db/data.db`)
const contacts = new contactsModel(db.connection)
const addresses = new addressesModel(db.connection)


function manipulate(rowAddresses,cb){
  let num = 0
  rowAddresses.forEach(row => {
    contacts.findByIdContacts(row.id_contacts, (err,dataUsers)=>{
      row[`name`] =  dataUsers.name;
      row[`company`] =  dataUsers.company;
      row[`telp_number`] =  dataUsers.telp_number;
      row[`email`] =  dataUsers.email;
      num++;
      if (num == rowAddresses.length) {
        cb(rowAddresses,err)
      }
    })
  })
}


function manipulateOneContacts(rowAddresses,cb){
  contacts.findByIdContacts(rowAddresses.id_contacts, (err,dataUsers)=>{
    rowAddresses[`name`] =  dataUsers.name;
    rowAddresses[`company`] =  dataUsers.company;
    rowAddresses[`telp_number`] =  dataUsers.telp_number;
    rowAddresses[`email`] =  dataUsers.email;
    cb(rowAddresses)
  })
}

// addresses
router.get(`/`,function(req,res){
  contacts.findAllContacts((err,rowContacts)=>{
    addresses.findAllAddresses((err,rowAddresses)=>{
      manipulate(rowAddresses,(data,err)=>{
        if (!err) {
          res.render('addresses', {contacts:rowContacts, addresses:data, error:null})
        } else {
          res.render('addresses', {contacts:rowContacts, addresses:data, error:err})
        }
      })
    })
  })
})

router.post(`/`,function(req,res){
  var add = {
    id_contacts:`${req.body.id_contacts}`,
    street:`${req.body.street}`,
    city:`${req.body.city}`,
    zipcode:`${req.body.zipcode}`
  }

  addresses.createAddresses(add,(err,statement)=>{
    if(!err){
      res.redirect(`/addresses`)
    } else {
      res.redirect(`/addresses?err=..`,{error:err})
    }
  })

})

router.get(`/delete`, function(req,res){
  addresses.destroyAddresses(req.query.id,(err,statement)=>{
    if (!err) {
      res.redirect(`/addresses?`)
    } else {
      res.redirect(`/addresses?error=`+err)
    }
  })
})

router.get(`/edit`, function(req,res){
  contacts.findAllContacts((err,rowContacts)=>{
    addresses.findByIdAddresses(req.query.id,(err,rowAddresses)=>{
      manipulateOneContacts(rowAddresses,(dataUsers)=>{
        res.render('addresses-edit',{data:dataUsers,contacts:rowContacts})
      })
    })
  })
})

router.post(`/edit`, function(req,res){
  console.log(req.query.id);
  var obj = {
    id:req.body.id,
    id_contacts:`${req.body.id_contacts}`,
    street:`${req.body.street}`,
    city:`${req.body.city}`,
    zipcode:`${req.body.zipcode}`
  }

  addresses.updateAddresses(obj,(err,statement)=>{
    if (!err) {
      res.redirect(`/addresses`)
    } else {
      res.redirect(`/addresses?error=`+err)
    }
  })
})

module.exports = router
