class Contacts{
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

  createData(db, table, obj){
    let qry = `INSERT INTO ${table} (name, company, phone, email) VALUES (
      '${obj.name}',
      '${obj.company}',
      '${obj.phone}',
      '${obj.email}')`;
    db.run(qry);
  }

  update(db, table, obj, id){
    let qry = `UPDATE ${table} SET
      name='${obj.name}',
      company='${obj.company}',
      phone='${obj.phone}',
      email='${obj.email}'
      WHERE id=${id}`;
    db.run(qry);
  }

  remove(db, table, id){
    let qry = `DELETE FROM ${table} WHERE id=${id}`;
    db.run(qry);
  }

}

module.exports = Contacts;
