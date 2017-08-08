const express = require('express');
const router = express.Router();
const dbModel = require('../models/DBModel');
const addressesContactModel = require('../models/AddressesContact');

const pathDB = './db/data.db';
const db = new dbModel(pathDB);
const address = new addressesContactModel();

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
          manipulateAddresses(rowsAdd, dataManipulated=>{
            res.render('addresses_with_contact', {data:dataManipulated, Addresses:rowsAdd, dataContacts:rowsCon});
          })
        }
      });
    }
  });
});

function manipulateAddresses(rows, cb){
  let count = 0;
  rows.forEach(row =>{
    address.findById(db.connection, table2, row.contacts_id, (err, dataContacts)=>{
      row['name'] = dataContacts[0].name;
      row['company'] = dataContacts[0].company;
      count++;
      if(count == rows.length){
        cb(rows);
      }
    });
  });
}

module.exports = router;
