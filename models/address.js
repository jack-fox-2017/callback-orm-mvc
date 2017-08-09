class Address {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.phone = data.telp_number;
    this.email = data.email;
  }

  getAddress(conn, callback) {
    conn.all(`SELECT * FROM addresses;`, function (err, rowsP) {
      if (!err) {
        var num = 0
        rowsP.forEach(add => {
          conn.all(`SELECT * FROM contacts where id = ${add.contacts_id}`, function (err, rowsC) {
            if (!err) {
              rowsP[num]['name'] = rowsC[0].name;
              console.log(rowsP);
              num++
              if (num == rowsP.length) {
                // console.log(rowsC);
                callback(false, rowsP, rowsC)
              }
            }
          })
        })
      }
    })
  }

  getcontact(conn, callback) {
    conn.all(`select * from contacts`, (err, rows) => {
      callback(false, rows)
    })  
  }



  addAddress(conn, alamat, kodepos, conId) {
    conn.run(`INSERT INTO addresses (alamat, kodepos, contacts_id)
      VALUES ('${alamat}', '${kodepos}', '${conId}');`)
  }

  getAddressE(conn, where, callback) {
    conn.all(`SELECT * FROM addresses where id = ${where};`, function (err, rowsP) {
      if (!err) {
        var num = 0
        rowsP.forEach(add => {
          conn.all(`SELECT * FROM contacts where id = ${add.contacts_id}`, function (err, rowsC) {
            if (!err) {
              rowsP[num]['name'] = rowsC[0].name;
              console.log(rowsP);
              num++
              if (num == rowsP.length) {
                callback(false, rowsP, rowsC)
              }
            }
          })
        })
      }
    })
  }

  updateAddress(conn, alamat, kodepos, contacts_id, id) {
    conn.run(`UPDATE addresses SET alamat = '${alamat}', kodepos = '${kodepos}', contacts_id = '${contacts_id}' WHERE id = ${id};`)
  }

  deleteAddress(conn, id) {
    conn.run(`DELETE FROM addresses WHERE id = ${id};`)
  }
}

module.exports = Address
