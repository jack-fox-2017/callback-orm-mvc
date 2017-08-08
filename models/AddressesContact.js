class AddressesContact{
  constructor(){}

  findAll(db, table, cb){
    let qry = `SELECT * FROM ${table}`;
    db.all(qry, (err, rows)=>{
      if(!err){
        cb(false, rows);
      }
    });
  }

  findById(db, table, id, cb){
    let qry = `SELECT * FROM ${table} WHERE id=${id}`;
    db.all(qry, (err, row)=>{
      if(!err){
        //console.log(row);
        cb(false, row);
      }
    });
  }
  
}

module.exports = AddressesContact;
