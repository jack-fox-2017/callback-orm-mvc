class Contacts{
  constructor(){
  }

  findAll(conn, callback){
    conn.all(`SELECT * FROM Contacts`, (err,rows)=>{
      if(!err){
        callback(false,rows)
      }else {
        callback(true,null)
      }
    })
  }

  findById(conn, reqparam, callback){
    conn.all(`SELECT * FROM Contacts WHERE id = ${reqparam}`, (err,rows)=>{
      if(!err){
        callback(false,rows)
      }else {
        callback(true,null)
      }
    })
    // return new Promise((resolve,reject)=>{
    //   conn.all(`SELECT * FROM Contacts WHERE id = ${reqparam}`, (err,rows)=>{
    //     if (!err) {
    //       resolve(rows)
    //     }else {
    //       reject(err)
    //     }
    //     })
    // })
  }

  update(conn,req,reqparams,callback){
    conn.run(`UPDATE Contacts set name ='${req.name}',company = '${req.company}',
    telp_number = '${req.telp_number}', email = '${req.email}' WHERE id =${reqparams}`,(err,rows)=>{
      if(!err){
        callback(false,rows)
      }else {
        callback(true,null)
      }
    })
  }

  destroy(conn,req){
    conn.run(`DELETE FROM Contacts WHERE id = ${req}`)
  }

  createData(conn,req,callback){
    conn.run(`INSERT INTO Contacts(name,company,telp_number,email)
    VALUES('${req.name}','${req.company}','${req.telp_number}','${req.email}')`, (err,rows)=>{
      if(!err){
        callback(false,rows)
      }else {
        callback(true,null)
      }
    })
  }

}

module.exports = Contacts
