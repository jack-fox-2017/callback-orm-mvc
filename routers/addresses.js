const express = require('express');
const router = express.Router();
const dbModel = require('../models/DBModel');
const addressesModel = require('../models/Addresses');

const pathDB = './db/data.db';
const db = new dbModel(pathDB);
const address = new addressesModel();

let table = 'Addresses';
let table2 = 'Contacts';

router.get('/', (req, res)=>{
  //res.send('halo');
  address.findAll(db.connection, table, (err, rowsAdd)=>{
    //res.send(rows);
    if(err){
      res.send(err.toString());
    }else{
      address.findAll(db.connection, table2, (err, rowsCon)=>{
        if(err){
          res.send(err.toString());
        }else{
          res.render('addresses', {dataAddresses:rowsAdd, dataContacts:rowsCon});
        }
      });
    }
  });
});

router.post('/', (req, res)=>{
  let obj = createObjAddr(req);
  address.createData(db.connection, table, obj);
  res.redirect('/addresses');
});

router.get('/edit/:id', (req, res)=>{
  let id = req.params.id;
  address.findById(db.connection, table, id, (err, rowsAdd)=>{
    if(err){
      res.send(err.toString());
    }else{
      address.findById(db.connection, table2, id, (err, rowsCon)=>{
        if(err){
          res.send(err.toString());
        }else{
          res.render('edit-address', {dataAddresses:rowsAdd[0], dataContacts:rowsCon[0]});
        }
      });
    }
  });
});

router.post('/edit/:id', (req, res)=>{
  let id = req.params.id;
  let obj = createObjAddr(req);
  address.update(db.connection, table, obj, id);
  res.redirect('/addresses');
});

router.get('/delete/:id', (req, res)=>{
  let id = req.params.id;
  address.remove(db.connection, table, id);
  res.redirect('/addresses');
});

function createObjAddr(req){
  let obj = {};
  obj['street'] = req.body.street;
  obj['city'] = req.body.city;
  obj['zip_code'] = req.body.zip_code;
  obj['contacts_id'] = req.body.contacts_id;
  return obj;
}

module.exports = router;
