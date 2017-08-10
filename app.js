'use strict'

const express = require('express');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.set('view engine','ejs');

/////////ROUTING////////////

const index = require('./routers/index');
const contacts = require('./routers/contacts');
const address = require('./routers/address')


app.use('/', index);
app.use('/contacts', contacts);
app.use('/address', address);


app.listen(3000, () => {
  console.log('listening port 3000');
})
