'use strict'

const express = require('express');
const app = express();
const router = express.Router();

const Db = require('../models/dbModel');


let dbModel = new Db('./db/data.db')
var connect = new Db();

router.get('/', (req,res) => {
  res.render('index')
})



module.exports = router
