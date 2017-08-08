'use strict'

class Contacts {
  constructor() {

  }

  static manipulateGroups(conn, rows, cb) {
    let hitung = 0;

    rows.forEach(row =>{
      var data_contactsingroup=[];
        conn.each(`SELECT groups_id, contacts_id, name_of_group FROM ContactGroups
          JOIN Groups
          ON ContactGroups.groups_id = Groups.id
          WHERE ContactGroups.contacts_id = ${row.id}`,(err, data_perObject) => {
            data_contactsingroup.push(data_perObject);

        }, function(){
          if (data_contactsingroup.length>0) {
            console.log('INI ROW NYA'+JSON.stringify(row));
            // row['contact_id'] = rows.id
                row['contact_name']=row.name;
                row['telp_number']=row.telp_number;
                row['company']=row.company;
                row['email']=row.email;
            // console.log(data_contactsingroup);
            // console.log(JSON.stringify(row)+'this is row');
            var arr=[]
              for (let i=0; i<data_contactsingroup.length; i++) {
                arr.push(data_contactsingroup[i].name_of_group);
              }
            row['group_names']=arr;
          }
        hitung++;
        if(hitung == rows.length) {
          // console.log(rows);
          cb(rows);
        }
        }
      )
    })
  }

  static findAll(conn, cb) {
    // console.log(this.hello());
    var temp = [];
    // var manipulate = this.manipulateGroups; //masalah scope this cuma bisa d dalem object gk bisa d dalem all
    conn.each(`SELECT * FROM Contacts`, function (err, dGroup) {
      // manipulate(conn, dGroup, cb);
      //   // console.log(dataManipulated);
      //   // res.render('group', {data: dataManipulated});
      temp.push(dGroup);
    }, function (){
        cb(temp);
      })
    }

  static findById(conn, id, cb) {
    var temp = [];
    conn.each(`SELECT * FROM Contacts WHERE id = ${id}`, function (err, rows) {
      temp.push(rows);
    }, function() {
        cb(temp)
    })
  }

  static insertData(conn, data){
    conn.run(`INSERT INTO Contacts (
      name,
      company,
      telp_number,
      email
    ) VALUES ('${data.name}','${data.company}', '${data.telp_number}', '${data.email}')`, function(){
      if(data.hasOwnProperty('groups_id')) {
        let contacts_id = this.lastID;
        conn.run(`INSERT INTO ContactGroups (
          contacts_id,
          groups_id
        ) VALUES (${contacts_id},'${data.groups_id}')`);
      }

    });
  }

  // static insertDataConjuction(conn, data, id){
  //   conn.run(`INSERT INTO ContactGroups (
  //     groups_id,
  //     contacts_id
  //   ) VALUES ('${id}','${data.contacts_id}')`);
  // }

  static showContact(conn, cb){
      var temp = [];
      conn.each(`SELECT * FROM Contacts`, function (err, rows2) {
        temp.push(rows2)
      }, function(){
        cb(temp)
      })
  }

  static removeData(conn, id){
    conn.run(`DELETE FROM Contacts WHERE id = ${id}`);
  }

  static updateData(conn, data, id){
    conn.run(`UPDATE Contacts SET
      name = '${data.name}',
      company = '${data.company}',
      telp_number = '${data.telp_number}',
      email = '${data.email}'
      WHERE id = '${id}';`);
  }

  // static showGroup(conn, cb){
  //     conn.all(`SELECT * FROM Groups`, function (err, rows2) {
  //       if(!err) {
  //         cb(rows2)
  //       } else {
  //         cb(null)
  //       }
  //     })
  // }


}

module.exports = Contacts;
