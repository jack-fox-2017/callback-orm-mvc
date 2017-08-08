class Contacts {
  constructor(connection){
    this.connection = connection;
    this.table ='contacts'
  }

  findAllContacts(cb){
    var query = `SELECT * FROM ${this.table}`
    this.connection.all(query, (err,rows)=>{
      cb(err,rows)
    })
  }

  createContacts(obj,cb){
    var query = `INSERT INTO contacts(name,company,telp_number,email) VALUES ('${obj.name}','${obj.company}','${obj.telp_number}','${obj.email}')`
    this.connection.run(query,(err,statement)=>{
      cb(err,statement)
    })
  }

  destroyContacts(id,cb){
    var query = ` DELETE FROM ${this.table} WHERE id='${id}'`
    this.connection.run(query,(err,statement)=>{
      cb(err,statement)
    })
  }

  findByIdContacts(id,cb){
    var query = `SELECT * FROM ${this.table} WHERE id='${id}'`
    this.connection.get(query, (err,rows) => {
      cb(err,rows)
    })
  }

  updateContacts(obj,cb){
    var query = `UPDATE contacts SET name='${obj.name}',company='${obj.company}',telp_number='${obj.telp_number}',email='${obj.email}' WHERE id='${obj.id}'`
    this.connection.run(query, function(err){
      cb(err,this)
    })
  }
}


module.exports = Contacts
