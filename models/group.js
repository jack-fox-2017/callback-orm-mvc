class Group {
  constructor(conn) {
    this.conn = conn
    this.table = 'groups'
  }

  getGroups(callback) {
    let result = []
    this.conn.each(`select * from ${this.table}`, (err, row) => {
      if (err)
        throw err
        
      result.push(row)
    }, () => {
      if (callback)
        callback(null, result)
    })

    // this.conn.all(`select * from ${this.table}`, (err, rows) => {
    //   if (callback)
    //     callback(err, rows)
    // })
  }

  getGroupById(group_id, callback) {
    this.conn.get(`select * from ${this.table} where id = ${group_id}`, (err, row) => {
      if (callback)
        callback(err, row)
    })
  }

  insertGroup(objData, callback) {
    let column_names = Object.keys(objData).join(',')
    let values = Object.keys(objData).map(key => {return `'${objData[key]}'`}).join(',')
    let INSERT_GROUP = `insert into ${this.table} (${column_names}) values (${values})`

    this.conn.run(INSERT_GROUP, function(err) {
      if (callback)
        callback(err, this)
    })
  }

  insertToConjunction(objData, callback) {
    let column_names = Object.keys(objData).join(',')
    let values = Object.keys(objData).map(key => {return `'${objData[key]}'`}).join(',')
    let INSERT_CONJUNCTION = `insert into groups_contacts (${column_names}) values (${values})`

    this.conn.run(INSERT_CONJUNCTION, function(err) {
      if (callback)
        callback(err, this)
    })
  }

  updateGroup(group_id, objData, callback) {
    let column_names = Object.keys(objData)
    let set = column_names.map(key => {return `${key} = '${objData[key]}'`}).join(',')
    let UPDATE_GROUP = `update ${this.table} set ${set} where id = ${group_id}`

    this.conn.run(UPDATE_GROUP, function(err) {
      if (callback)
        callback(err, this)
    })
  }

  removeGroup(group_id, callback) {
    let REMOVE_GROUP = `delete from ${this.table} where id = ${group_id}`

    this.conn.run(REMOVE_GROUP, function(err) {
      if (callback)
        callback(err, this)
    })
  }
}

module.exports = Group
