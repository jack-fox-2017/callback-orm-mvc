const contactModel = require('./models/contactModel')

var dbModel = require('./models/dbModel')
var conn = new dbModel()

contactModel.findAll(conn.connection, (err, data) => {
  console.log(data);
})
