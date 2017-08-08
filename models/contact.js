class Contact{

  static findAll(conn, callback){
    conn.all(`select * from Contact ORDER BY id DESC`, (err, data) => {
      if(!err){
        callback(false, data)
      } else {
        callback(true, null)
      }
    })
  }

  static createData(conn, body){
    conn.run(`INSERT INTO Contact (name, company, phone, email) VALUES
    ('${body.name}', '${body.company}', ${body.phone}, '${body.email}')`)
  }

  static findById(conn, params, callback){
    conn.all(`SELECT * FROM Contact where id=${params.id}`, (err, data) => {
      if(!err){
        callback(false, data)
      } else {
        callback(true, null)
      }
    })
  }

  static updateData(conn, params, body){
    conn.run(`UPDATE Contact SET name='${body.name}', company='${body.company}', phone='${body.phone}', email='${body.email}' WHERE id='${params.id}'`)
  }

  static destroyData(conn, params){
    conn.run(`DELETE from Contact where id=${params.id};`);
  }

}

module.exports = Contact
