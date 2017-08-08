class GroupContact {
  constructor(conn) {
    this.conn = conn
    this.table = 'groups_contacts'
  }

  getJoinWithGroups(contact_id, callback) {
    let CONTACT_JOIN_GROUPS = `
      select * from ${this.table}
        join groups on groups.id = ${this.table}.group_id
          where ${this.table}.contact_id = ${contact_id}
    `

    this.conn.all(CONTACT_JOIN_GROUPS, (err, rows) => {
      if (callback)
        callback(err, rows)
    })
  }

  getJoinWithContacts(group_id, callback) {
    let CONTACT_JOIN_GROUPS = `
      select * from ${this.table}
        join contacts on contacts.id = ${this.table}.contact_id
          where ${this.table}.group_id = ${group_id}
    `

    this.conn.all(CONTACT_JOIN_GROUPS, (err, rows) => {
      if (callback)
        callback(err, rows)
    })
  }

  getJoinWithGroupsChecked(contact_id, callback) {
    let CONTACT_JOIN_GROUPS_AND_CHECKED_ID = `
      select groups.*, groups_contacts.contact_id from groups
        left join ${this.table} on ${this.table}.group_id = groups.id
          and ${this.table}.contact_id = ${contact_id}
    `

    this.conn.all(CONTACT_JOIN_GROUPS_AND_CHECKED_ID, (err, rows) => {
      if (callback)
        callback(err, rows)
    })
  }

  getJoinWithContactsChecked(group_id, callback) {
    let CONTACT_JOIN_CONTACTS_AND_CHECKED_ID = `
      select contacts.*, groups_contacts.group_id from contacts
        left join ${this.table} on ${this.table}.contact_id = contacts.id
          and ${this.table}.group_id = ${group_id}
    `

    this.conn.all(CONTACT_JOIN_CONTACTS_AND_CHECKED_ID, (err, rows) => {
      if (callback)
        callback(err, rows)
    })
  }

  insertConjunction(objData, callback) {
    let column_names = Object.keys(objData).join(',')
    let values = Object.keys(objData).map(key => {return objData[key]}).join(',')
    let INSERT_CONJUNCTION = `insert into ${this.table} (${column_names}) values (${values})`
    console.log(INSERT_CONJUNCTION);
    this.conn.run(INSERT_CONJUNCTION, function(err) {
      if (callback)
        callback(err, this)
    })
  }

  removeConjunctionBy(name, id, callback) {
    let DELETE_CONJUNCTION = `delete from ${this.table} where ${name}_id = ${id}`

    this.conn.run(DELETE_CONJUNCTION, function(err) {
      if (callback)
        callback(err, this)
    })
  }
}

module.exports = GroupContact
