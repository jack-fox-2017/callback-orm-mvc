function deletegrup(conn, id) {
  return new Promise((resolve, reject) => {
    conn.run(`DELETE FROM groups WHERE id = ${id};`, function () {
      resolve(true)
    })
  })
}


function deleteall(conn, id) {
  return new Promise((resolve, reject) => {
    conn.run(`DELETE FROM bridge WHERE group_id = ${id};`, function () {
      resolve(true)
    })
  })
}


class Group {
  constructor(data) {
    this.id = data.id;
    this.name = data.name_of_group;
  }



  getGroup(conn, callback) {
    conn.all(`select * from groups`, function (err, roww) {
      if (!err) {
        var num = 0
        roww.forEach(cont => {
          cont['name'] = [];
          conn.all(`select bridge.*, contacts.id as contId, contacts.name from bridge 
          left join contacts on contId = bridge.contact_id where bridge.group_id = ${cont.id}`, function (errs, rowws) {
            rowws.forEach(r => {
              if (cont.id === r.group_id) {
                cont['name'].push(r.name);
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

  getBridge(conn, callback) {
    conn.all(`select distinct * from groups`, function (err, rows) {
      if (!err) {
        conn.all(`select distinct * from contacts`, function (err, row) {
          if (!err) {
            callback(false, rows, row)
          }
        })
      }
    })
  }

  addGroupContact(conn, cont, grup) {
    conn.run(`INSERT INTO bridge (contact_id, group_id)
      VALUES ('${cont}', '${grup}')`)
  }

  addGroup(conn, name) {
    conn.run(`INSERT INTO groups (name_of_group)
      VALUES ('${name}');`)
  }

  getGroupE(conn, where, callback) {
    conn.all(`select * from groups where id = ${where}`, function (err, rows) {
      if (!err) {
        callback(false, rows)
      }
    })
  }

  updateGroup(conn, name, id) {
    conn.run(`UPDATE groups SET name_of_group = '${name}' WHERE id = ${id};`)
  }

  deleteGroup(conn, id) {
    deletegrup(conn, id)
      .then(function (par) {
        deleteall(conn, id)
          .then(function (conn, id) {})
      })
  }

  deleteConnection(conn, id) {
    conn.run(`DELETE FROM bridge WHERE contact_id = ${id};`, function () {
      resolve(true)
    })
  }
}



module.exports = Group