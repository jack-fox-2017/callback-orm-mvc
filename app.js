const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')

var dbModel = require('./models/db_model')
var db = new dbModel()
db.getConnection()

app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '/public')));


var index = require('./routers/index')
var contact = require('./routers/contact')
var address = require('./routers/address')
var profile = require('./routers/profile')

app.use('/', index)
app.use('/', contact)
app.use('/', address)
app.use('/', profile)



app.listen(3000, function(){
	console.log('Iam listen on port 3000')
})


// //groups route
// app.get('/groups', function(req, res){
// 	db.all(`SELECT * FROM Groups`, function(err, rows){
// 		res.render('groups', {groups_data : rows})
// 	})
// })
//
// app.get('/addGroups', function(req, res){
// 	res.render('addGroups')
// })
//
// app.post('/addGroups', function(req, res){
// 	db.run(`INSERT INTO Groups(name_group) VALUES ('${req.body.name_group}')`)
// 	res.redirect('/groups')
// })
//
// app.get('/groups/edit/:id', function(req, res){
// 	db.all(`SELECT * FROM Groups WHERE id = '${req.params.id}'`, function(err, rows){
// 		res.render('editGroups', {edit_groups: rows})
// 	})
// })
//
// app.post('/groups/edit/:id', function(req, res){
// 	db.run(`UPDATE Groups SET name_group = '${req.body.name_group}' WHERE id = '${req.params.id}'`)
// 	res.redirect('/groups')
// })
//
// app.get('/groups/delete/:id', function(req, res){
// 	db.run(`DELETE FROM Groups WHERE id = '${req.params.id}'`, function(err, rows){
// 		res.redirect('/groups')
// 	})
// })
