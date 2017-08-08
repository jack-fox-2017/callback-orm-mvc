class Adresses {
  constructor() {

  }
  findAll(conn, callback){
    conn.all(`SELECT * FROM Adresses`, (err, rows) =>{
      if(!err){
        callback(false,rows)
      }
      else{
        callback(true,null)
      }
    })
  }
  findById(conn, id, callback){
    conn.run(`SELECT * FROM Adresses WHERE id = "${req.params.id}"`, (err, rows)=>{
      if(!err){
        callback(false,rows)
      }
      else{
        callback(true,null)
      }
    })

  }
  create(conn, data, callback){
    conn.run(`INSERT INTO Adresses(jalan, kota, provinsi, contact_id)VALUES (
      "${data.jalan}",
      "${data.kota}",
      "${data.provinsi}",
      "${data.contact_id}")`, (err,rows)=>{
        if(!err){
          callback(false,rows)
        }
        else{
          callback(true,null)
        }
      })
  }
  update(conn, data, id, callback){
    conn.run(`UPDATE Adresses SET
      jalan = "${data.jalan}",
      kota = "${data.kota}",
      provinsi = "${data.provinsi}",
      contact_id = "${data.contact_id}"
      WHERE id = "${id}"`, (err, rows)=>{
        if(!err){
          callback(false,rows)
        }
        else{
          callback(true,null)
        }
      })
  }
  destroy(conn, id){
    conn.run(`DELETE FROM Adresses WHERE id = "${id}"`)
  }
}


module.exports = Adresses
