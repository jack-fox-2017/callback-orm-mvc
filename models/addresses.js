class Addresses {
  constructor(connection){
    this.connection = connection;
    this.table ='addresses'
  }

  findAllAddresses(cb){
    var query = `SELECT * FROM ${this.table}`
    this.connection.all(query, (err,rows)=>{
      cb(err,rows)
    })
  }

  findByIdAddresses(id,cb){
    var query = `SELECT * FROM ${this.table} WHERE id='${id}'`
    this.connection.get(query, (err,rows) => {
      cb(err,rows)
    })
  }

  createAddresses(obj,cb){
    var query = `INSERT INTO ${this.table}(id_contacts,street,city,zipcode) VALUES('${obj.id_contacts}','${obj.street}','${obj.city}','${obj.zipcode}')`
    this.connection.run(query,(err,statement)=>{
      cb(err,statement)
    })
  }

  destroyAddresses(id,cb){
    var query = ` DELETE FROM ${this.table} WHERE id='${id}'`
    this.connection.run(query,(err,statement)=>{
      cb(err,statement)
    })
  }

  updateAddresses(obj,cb){
    console.log(obj);
    var query = `UPDATE ${this.table} SET id_contacts='${obj.id_contacts}', street='${obj.street}',city='${obj.city}',zipcode='${obj.zipcode}' WHERE id='${obj.id}'`

    this.connection.run(query, function(err){
      cb(err,this)
    })
  }
}


module.exports = Addresses
