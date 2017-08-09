function deletecont(conn, id) {
  return new Promise((resolve, reject) => {
    conn.run(`DELETE FROM contacts WHERE id = ${id};`, function () {
      resolve(true)
    })
  })
}


function deleteall(conn, id) {
  return new Promise((resolve, reject) => {
    conn.run(`DELETE FROM bridge WHERE contact_id = ${id};`, function () {
      resolve(true)
    })
  })
}

class Contact {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.company = data.company;
    this.phone = data.telp_number;
    this.email = data.email;
  }

  getContact(conn, callback) {

    conn.all(`select * from contacts`, function (err, roww) {
      if (!err) {
        var num = 0
        roww.forEach(cont => {
          cont['grupName'] = [];
          conn.all(`select bridge.*, groups.id as grupId, groups.name_of_group from bridge 
          left join groups on grupId = bridge.group_id where bridge.contact_id = ${cont.id}`, function (errs, rowws) {
            rowws.forEach(r => {
              if (cont.id === r.contact_id) {
                cont['grupName'].push(r.name_of_group);
              }
            })
            // console.log(roww);
            num++
            if (num == roww.length) {
              // console.log(rowws);
              callback(false, roww, rowws)
            }
          })
        })
      }
    })
  }



  addContact(conn, name, company, telp, email) {
    conn.run(`INSERT INTO contacts (name, company, telp_number, email)
      VALUES ('${name}', '${company}', '${telp}', '${email}');`)
  }

  getContactE(conn, where, callback) {
    conn.all(`select * from contacts where id = ${where}`, function (err, rows) {
      if (!err) {
        callback(false, rows)
      }
    })
  }

  updateContact(conn, name, company, telp, email, id) {
    conn.run(`UPDATE contacts SET name = '${name}', company = '${company}', telp_number = '${telp}', email = '${email}'  WHERE id = ${id};`)
  }

  deleteContact(conn, id) {
    deletecont(conn, id)
      .then(function (par) {
        deleteall(conn, id)
          .then(function (conn, id) {})
      })
  }
}

module.exports = Contact