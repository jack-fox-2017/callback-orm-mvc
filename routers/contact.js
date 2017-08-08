const express = require('express')
const router = express.Router()

var dbModel = require('../models/db_model')
var db = new dbModel()

const contactModel = require('../models/contact')


router.get('/contact', (req, res) => {
	contactModel.findAll(db.connection, (err, rows) =>{
		res.render('contact', {contact_data : rows})
	})
})

router.get('/addContact', (req, res) =>{
	//contactModel.findAll(db.connection, (err, data) =>{
		//res.render('addContact', {groups : data})
	//})
	res.render('addContact')
})

router.post('/addContact', (req, res) => {
	contactModel.createData(db.connection, req.body)
 	res.redirect('/contact');
})

router.get('/contact/edit/:id', (req, res) => {
	contactModel.findById(db.connection, req.params ,(err, rows) =>{
		res.render('editContact', {edit_contact: rows})
	})
});

router.post('/contact/edit/:id', (req, res) => {
	contactModel.update(db.connection, req.body, req.params.id)
	res.redirect('/contact')
});
//
router.get('/contact/delete/:id', (req, res) => {
	contactModel.remove(db.connection, req.params ,(err, rows) =>{
			res.redirect('/contact');
	})
});

module.exports = router
