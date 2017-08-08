'use strict'

class Groups {
  constructor() {

  }

   static manipulateGroups(conn, rows,cb) {
     let hitung = 0;

     rows.forEach(row =>{
         conn.all(`SELECT groups_id, contacts_id, name FROM ContactGroups
           JOIN Contacts
           ON ContactGroups.contacts_id = Contacts.id
           WHERE ContactGroups.groups_id = ${row.id}`,(err, data_contactsingroup) => {
             console.log(JSON.stringify(data_contactsingroup)+'--------------data contacts in group');
             if (!err && data_contactsingroup.length>0) {
               // row['group_id'] = data_contactsingroup[0].group_id
               console.log(data_contactsingroup);
               console.log(JSON.stringify(row)+'this is row');
               var arr=[]
                 for (let i=0; i<data_contactsingroup.length; i++) {
                   arr.push(data_contactsingroup[i].name);
                 }
               row['names']=arr;
             }
           hitung++;
           if(hitung == rows.length) {
             console.log(rows);
             cb(rows);
           }

         }
       )
     })
   }
 //  hello () {
 //   return 'hiiiiii';
 // }
  static findAll(conn, cb) {
    // console.log(this.hello());
    var manipulate = this.manipulateGroups; //masalah scope this cuma bisa d dalem object gk bisa d dalem all
    conn.all(`SELECT * FROM Groups`, function (err, dGroup) {
      manipulate(conn, dGroup, cb);
        // console.log(dataManipulated);
        // res.render('group', {data: dataManipulated});
      })
    }

  static findById(conn, id, cb) {
    conn.all(`SELECT * FROM Groups WHERE id = ${id}`, function (err, rows) {
      if(!err) {
        cb(rows)
      } else {
        cb(null)
      }
    })
  }

  static insertData(conn, data){
    conn.run(`INSERT INTO Groups (
      name_of_group
    ) VALUES ('${data.name_of_group}')`);
  }

  static insertDataConjuction(conn, data, id){
    conn.run(`INSERT INTO ContactGroups (
      groups_id,
      contacts_id
    ) VALUES ('${id}','${data.contacts_id}')`);
  }

  static removeData(conn, id){
    conn.run(`DELETE FROM Groups WHERE id = ${id}`);
  }

  static updateData(conn, data, id){
    conn.run(`UPDATE Groups SET
      name_of_group = '${data.name_of_group}' WHERE id = ${id}`);
  }

  // static showContact(conn, cb){
  //     conn.all(`SELECT * FROM Contacts`, function (err, rows2) {
  //       if(!err) {
  //         cb(rows2)
  //       } else {
  //         cb(null)
  //       }
  //     })
  // }

  static showGroup(conn, cb){
      conn.all(`SELECT * FROM Groups`, function (err, rows2) {
        if(!err) {
          cb(rows2)
        } else {
          cb(null)
        }
      })
  }


}

module.exports = Groups;
