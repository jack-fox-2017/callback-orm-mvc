'use strict'

const express = require('express');
const router = express.Router();

const DbModel = require('../models/dbModels');
const Contacts = require('../models/contact');
const Groups = require('../models/group');

let dbModel = new DbModel('./db/data.db');

const connection = dbModel.connection;

router.get('/', function(req,res) {
  Contacts.findAll(connection, function(rows) {
    Groups.showGroup(connection, function(rows2) {
      res.render('contact', {data: rows, data_group:rows2});
    })
  })
});

router.post('/', function(req,res) {
  Contacts.insertData(connection, req.body);
  res.redirect('/contacts');
})


router.get('/edit/:id', function(req, res){
  Contacts.findById(connection, req.params.id, function(rows) {
    res.render('contactEdit', {data: rows});
  })
})

router.post('/edit/:id', function(req, res){
  Contacts.updateData(connection, req.body, req.params.id);
  res.redirect('/contacts');
})

router.get('/delete/:id', function(req, res){
  Contacts.removeData(connection, req.params.id);
  res.redirect('/contacts');
});


module.exports = router;
// addresses yg salah hehehe
// app.get('/address/:id', function(req, res){
//   db.all(`SELECT * FROM Contacts
//   JOIN Addresses
//   ON Contacts.id=Addresses.contacts_id
//   WHERE Contacts.id=${req.params.id}`, function (err, rows) {
//     console.log(rows);
//     console.log(rows[0]);
//     if(!err) {
//       res.render('contactAddress', {data: rows});
//     }
//   })
// });
//
// app.post('/address/:id', function(req, res){
//   db.run(`INSERT INTO Addresses (
//     street,
//     city,
//     zip_code,
//     contacts_id
//   ) VALUES ('${req.body.street}','${req.body.city}', '${req.body.zip_code}', ${req.params.id})`);
//   res.redirect('/contacts'); // knpa klo k dia lg jd error
// });


// app.get('/', function(req, res){
//   db.all(`SELECT * FROM Contacts`, function (err, rows) {
//     if(!err) {
//       res.render('contact', {data: rows});
//     }
//   })
// });

// function manipulateGroups(conn, rows,cb) {
//   let hitung = 0;
//
//   rows.forEach(row =>{
//       db.all(`SELECT groups_id, contacts_id, name_of_group FROM ContactGroups
//         JOIN Groups
//         ON ContactGroups.groups_id = Groups.id
//         WHERE ContactGroups.contacts_id = ${row.id}`,(err, data_contactsingroup) => {
//
//           if (!err && data_contactsingroup.length>0) {
//             // row['contact_id'] = rows.id
//                 row['contact_name']=rows.name;
//                 row['telp_number']=rows.telp_number;
//                 row['company']=rows.company;
//                 row['email']=rows.email;
//             console.log(data_contactsingroup);
//             console.log(JSON.stringify(row)+'this is row');
//             var arr=[]
//               for (let i=0; i<data_contactsingroup.length; i++) {
//                 arr.push(data_contactsingroup[i].name_of_group);
//               }
//             row['group_names']=arr;
//           }
//         hitung++;
//         if(hitung == rows.length) {
//           console.log(rows);
//           cb(rows);
//         }
//
//       }
//     )
//   })
// }
//
// app.get('/', function(req, res){
//   db.all(`SELECT * FROM Contacts`, function (err, dGroup) {
//     manipulateGroups(dGroup, (dataManipulated)=> {
//       // console.log(dataManipulated);
//       res.render('contact', {data: dataManipulated});
//     })
//   })
// });

// app.get('/', function(req, res){
//   db.all(`SELECT c.id AS contacts_id, name, company, telp_number, email, name_of_group , groups_id
//     FROM Contacts  c
//     LEFT JOIN ContactGroups  gc
//     ON c.id = gc.contacts_id
//     LEFT JOIN Groups  g
//     ON g.id = gc.groups_id`, function (err, rows) {
//       db.all(`SELECT * FROM Groups`, function (err, rows2) {
//       var result = contactsInOneLine(rows);
//           if(!err) {
//
//             console.log("----",result);
//             res.render('contact', {data: result, data_group: rows2});
//           }
//     })
//   })
// });

// function contactsInOneLine(rows) {
//   var listGroupId = [];
//   for (let i=0; i<rows.length;i++) {
//     listGroupId.push(rows[i].contacts_id);
//   }
//   var newlist = listGroupId.filter(function (x, i, a) {
//       return a.indexOf(x) == i;
//   });
//   var masterObj = [];
//   for (let l=0; l<newlist.length;l++){
//     var obj = {};
//     obj['contact_id']=newlist[l];
//     var names = [];
//     for (let i=0; i<rows.length;i++) {
//       if (rows[i].contacts_id == newlist[l]){
//         obj['contact_name']=rows[i].name;
//         obj['telp_number']=rows[i].telp_number;
//         obj['company']=rows[i].company;
//         obj['email']=rows[i].email;
//         names.push(rows[i].name_of_group);
//       }
//     }
//   obj['group_names']=names;
//   masterObj.push(obj);
//   }
//   return masterObj;
// }

// app.get('/group/:id', function(req, res){
//   db.all(`SELECT * FROM Contacts WHERE id = ${req.params.id}`, function (err, rows) {
//     db.all(`SELECT * FROM Groups`, function (err, rows2) {
//     if(!err) {
//       res.render('contactGroup', {data_group: rows2, data_contact: rows});
//     }
//     })
//   })
// });
//
// app.post('/group/:id', function(req, res){
//   db.run(`INSERT INTO ContactGroups (
//     contacts_id,
//     groups_id
//   ) VALUES ('${req.params.id}','${req.body.groups_id}')`);
//   res.redirect('/contacts');
// })
