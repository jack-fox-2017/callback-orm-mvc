const express = require('express')
const router = express.Router()

var dbModel = require('../models/db_model')
var db = new dbModel()

const profileModel = require('../models/profile')
const contactModel = require('../models/contact')


router.get('/profile', (req, res) => {
	profileModel.findAll(db.connection, (err, rows) =>{
		res.render('profile', {profile_data: rows})
	})
})

router.get('/addProfile', (req, res)  =>{
	contactModel.findAll(db.connection, (err, data) => {
		res.render('addProfile', {contact: data, err_msg: false})
	})
})

router.post('/addProfile', (req, res)  =>{
	contactModel.findAll(db.connection, (err, rows) =>{
		profileModel.createData(db.connection, req.body, (err) => {
			if(!err){
				res.redirect('/profile')
			} else{
				res.render('addProfile', {contact: rows, err_msg: "Kontak sudah terpakai, Pilih lainnya!!"})
			}
		})
	})
})

router.get('/profile/edit/:id',(req, res) => {
	profileModel.findById(db.connection, req.params, (err, rows) =>{
		if(!err){
			contactModel.findAll(db.connection,(err, data) => {
				res.render('editProfile', {edit_profile : rows, edit_contact:data, err_msg : false})
			})
		}
	})
})

router.post('/profile/edit/:id', (req, res) =>{
	profileModel.findById(db.connection, req.params, (err, rows)=>{
		if(!err){
			contactModel.findAll(db.connection, (err, data) =>{
				profileModel.update(db.connection, req.params, (err2) =>{
					if(!err2){
						res.redirect('/profile')
					}
					else{
						res.render('editProfile', {edit_profile : rows, edit_contact:data, err_msg : "Maaf, kontak tersebut sudah digunakan"})
					}
				})
			})
		}
	})
})

router.get('/profile/delete/:id', (req, res) =>{
	profileModel.remove(db.connection, req.params , (err, rows)=>{
		res.redirect('/profile')
	})
})

module.exports = router;
