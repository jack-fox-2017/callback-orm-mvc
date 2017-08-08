CHALLENGE HARI INI:
1. Refactor challenge kemarin menjadi ORM jr + MVC
 --> ORM Jr
     DbModel --> return connection that will be used in models
     Contact --> findAll (select * from Contact)
                 findById (select * from Contact where id = ?)
                 update
                 remove/destroy
                 createData
      Address --> findAll
                  findById
                  update
                  remove/destroy
                  createData
  --> MVC
      /models
      /views
      /routers
      app.js

2. Untuk menampilkan AddressContact(ONE TO MANY) menggunakan callback di router (manipulasi objek)
