'use strict'

class Groups {
  constructor() {

  }

  //  static manipulateGroups(conn, rows,cb) {
  //    let hitung = 0;
   //
  //    rows.forEach(row =>{
  //        conn.all(`SELECT groups_id, contacts_id, name FROM ContactGroups
  //          JOIN Contacts
  //          ON ContactGroups.contacts_id = Contacts.id
  //          WHERE ContactGroups.groups_id = ${row.id}`,(err, data_contactsingroup) => {
  //            console.log(JSON.stringify(data_contactsingroup)+'--------------data contacts in group');
  //            if (!err && data_contactsingroup.length>0) {
  //              // row['group_id'] = data_contactsingroup[0].group_id
  //              console.log(data_contactsingroup);
  //              console.log(JSON.stringify(row)+'this is row');
  //              var arr=[]
  //                for (let i=0; i<data_contactsingroup.length; i++) {
  //                  arr.push(data_contactsingroup[i].name);
  //                }
  //              row['names']=arr;
  //            }
  //          hitung++;
  //          if(hitung == rows.length) {
  //            console.log(rows);
  //            cb(rows);
  //          }
   //
  //        }
  //      )
  //    })
  //  }
 //  hello () {
 //   return 'hiiiiii';
 // }

 static manipulateGroups(conn, rows,cb) {
   let hitung = 0;

   rows.forEach(row =>{
     var data_contactsingroup=[];
       conn.each(`SELECT groups_id, contacts_id, name FROM ContactGroups
         JOIN Contacts
         ON ContactGroups.contacts_id = Contacts.id
         WHERE ContactGroups.groups_id = ${row.id}`,(err, data_perObject) => {
           data_contactsingroup.push(data_perObject);
       }, function() {
         console.log(JSON.stringify(data_contactsingroup)+'--------------data contacts in group');
         if (data_contactsingroup.length>0) {
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

  static findAll(conn, cb) {
    // console.log(this.hello());
    var temp = [];
    // var manipulate = this.manipulateGroups; //masalah scope this cuma bisa d dalem object gk bisa d dalem all
    conn.each(`SELECT * FROM Groups`, function (err, dGroup) {
      temp.push(dGroup);
        // console.log(dataManipulated);
        // res.render('group', {data: dataManipulated});
      }, function (){
          cb(temp);
        })
    }

  static findById(conn, id, cb) {
    var temp = [];
    conn.each(`SELECT * FROM Groups WHERE id = ${id}`, function (err, rows) {
      temp.push(rows);
    }, function(){
        cb(temp)
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
    var temp = [];
      conn.each(`SELECT * FROM Groups`, function (err, rows2) {
        temp.push(rows2);
      }, function() {
          cb(temp)
      })
  }


}

module.exports = Groups;
