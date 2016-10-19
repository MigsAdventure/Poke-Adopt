require('dotenv').config();
const db = require('./server/config/db');
const squel = require('squel');
console.log(process.env)

db.query('drop table Owners');
db.query('drop table Pokemons', err => {
  if (err) throw err;

require('./server/models/Owner')
require('./server/models/Pokemon')

let pokemonSql = squel.insert().into('Pokemons').setFieldsRows([
  {name: 'Pikachu'},
  {name: 'Charmander'}
  ]).toString();

  db.query(pokemonSql, err => {
    if(err) throw err;
  });

let ownerSql = squel.insert().into('Owners').setFieldsRows([
  {name: 'Mig'},
  {name: 'steve'}
  ]).toString();

db.query(ownerSql, err => {
  if(err) throw err;
});

  db.end(() => console.log('Database Reseted!!'));
})