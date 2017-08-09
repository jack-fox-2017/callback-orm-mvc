class Addresses{
  constructor(){
  }

  findAll(conn, callback){
    conn.all(`SELECT * FROM Addresses`, (err,rows)=>{
      if(!err){
        callback(false,rows)
      }else {
        callback(true,null)
      }
    })
  }

  findById(conn, reqparam, callback){
    conn.all(`SELECT * FROM Addresses WHERE id = ${reqparam}`, (err,rows)=>{
      if(!err){
        callback(false,rows)
      }else {
        callback(true,null)
      }
    })
  }

  update(conn,req,reqparams,callback){
    conn.run(`UPDATE Addresses SET street ='${req.street}',city = '${req.city}',
    zip_code = '${req.zip_code}', contact_id = ${req.contact_id} WHERE id =${reqparams}`, (err,rows)=>{
      if (!err) {
        callback(false,rows)
      }else {
        callback(true,null)
      }
    })
  }

  destroy(conn,req){
    conn.run(`DELETE FROM Addresses WHERE id = ${req}`)
  }

  createData(conn,req,callback){
    conn.run(`INSERT INTO Addresses(street,city,zip_code,contact_id)
    VALUES('${req.street}','${req.city}','${req.zip_code}','${req.contact_id}')`, (err,rows)=>{
      if(!err){
        callback(false,rows)
      }else {
        callback(true,null)
      }
    })
  }

}

module.exports = Addresses
