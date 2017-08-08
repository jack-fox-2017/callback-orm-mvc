const express = require('express')
const router = express.Router()

var dbModel = require('../models/db_model')
var db = new dbModel()

const addressModel = require('../models/address')
const contactModel = require('../models/contact')


router.get('/address',(req, res) => {
	addressModel.findAll(db.connection, (err, rows) => {
		res.render('address', {address_data: rows})
	})
})

router.get('/addAddress', (req, res) =>{
	contactModel.findAll(db.connection, (err, data) =>{
		res.render('addAddress', {contact: data})
	})
})

router.post('/addAddress', (req, res) => {
	addressModel.createData(db.connection, req.body)
	res.redirect('/address')
})

router.get('/address/edit/:id', (req, res) => {
	addressModel.findById(db.connection, req.params, (err, rows) => {
		if(!err){
			contactModel.findAll(db.connection, (err, data) =>{
				res.render('editAddress', {edit_address : rows, edit_contact:data})
			})
		}
	})
})

router.post('/address/edit/:id', (req, res) => {
	addressModel.update(db.connection, req.body, req.params.id)
	res.redirect('/address')
})

router.get('/address/delete/:id', (req, res) => {
	addressModel.remove(db.connection, req.params, (err, rows) => {
		res.redirect('/address')
	})
})

router.get('/address_with_contact/:id', (req, res) =>{
  addressModel.findAll(db.connection, (err, rows) => {
    contactModel.findAll(db.connection, (err, data)=>{
      for(let i=0; i<rows.length; i++){
        for (let j = 0; j < data.length; j++) {
          if(rows[i].contact_id == data[j].id){
            rows[i].name = data[j].name;
            rows[i].company = data[j].company;
          }
        }
      }
      res.render('detail_address', {address: rows})
    })
  })
})


module.exports = router

// app.get('/address_with_contact/:id', function(req, res){
// 	db.all(`SELECT * FROM Address WHERE id = '${req.params.id}'`, function(err, rows){
// 		if(!err){
// 			db.all(`SELECT * FROM Contact WHERE id = ${rows[0].contact_id}`, function(err, data){
// 				rows[0].company = data[0].company;
// 				rows[0].name = data[0].name;
// 				res.render('detail_address', {address: rows})
// 			})
// 		}
// 	})
// })
