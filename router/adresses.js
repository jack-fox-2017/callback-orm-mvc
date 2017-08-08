//express & router
const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
//db
const Model = require("../model/database-create")
let model = new Model()
let db = model.connection
//file model
let Contact = require("../model/contacts-model")
let contacts = new Contact();

let Adresses = require("../model/adresses-model")
let adresses = new Adresses();

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get("/",function(req, res) {
  adresses.findAll(db, (err, rowsAdr)=>{
    contacts.findAll(db, (err, rowsCon)=>{
      for(let i = 0; i < rowsAdr.length;i++){
        for (var j = 0; j < rowsCon.length; j++) {
          if(rowsAdr[i].contact_id == rowsCon[j].id){
            rowsAdr[i].name = rowsCon[j].name
          }
        }
      }
      res.render("adresses",{ data_adresses : rowsAdr})
    })
  })
})
router.get("/add", function(req, res) {
  contacts.findAll(db, function(err, rows){
    res.render("adresses-form", {data_contacts : rows})
  })
})

router.post("/add",function(req, res) {
  adresses.create(db, req.body , function(err, solved) {
    if(!err){
      res.redirect("/home/adresses")
    }else{
      res.send("User Sudah Dipakai")
    }
  })
})

router.get("/edit/:id", function(req, res) {
  adresses.findById(db, req.params.id, function(err, rowsAdr) {
    contacts.findAll(db , function(err, rowsCon) {
      res.render("adresses-edit", {data_adresses : rowsAdr[0], data_contacts : rowsCon})
    })
  })
})

router.post("/edit/:id",function(req, res) {
  adresses.update(db, req.body, req.params.id, function(err, solved) {
      if(!err){
        res.redirect("/home/adresses")
      }else{
        res.send("User Sudah Dipakai")
      }
  })
})

router.get("/delete/:id", function(req, res) {
  adresses.destroy(db, req.params.id)
    res.redirect("/home/adresses")
})

module.exports = router
