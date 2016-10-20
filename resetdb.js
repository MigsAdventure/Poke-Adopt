require('dotenv').config();
const db = require('./server/config/db');
const squel = require('squel');
console.log(process.env)

db.query('drop table Owners');
db.query('drop table Pokemons', err => {
  if (err) throw err;

  db.end(() => console.log('Database Reseted!!'));
})