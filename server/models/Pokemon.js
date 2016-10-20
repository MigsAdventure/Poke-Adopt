const db = require('../config/db');
const squel = require('squel');
const {get} = require('axios');

const TABLE_NAME = 'Pokemons';

db.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
  name VARCHAR(100),
  image VARCHAR(1000),
  pokeId INT(255),
  ownerId INT,
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
  )`, err => {
    if(err) throw err;
  })
  // type VARCHAR(100),

exports.fetchList = (cb) => {
  get('http://pokeapi.co/api/v2/pokemon/?limit=10&offset=0')
    .then((res) => {
      cb(null, res.data)
    })
    .catch(err => {
      console.log('err', err);
    })

}

exports.fetchAll = function() {
  return new Promise((resolve, reject) => {
    let sql = squel.select()
                    .from(TABLE_NAME)
                    .field('Pokemons.id', 'id')
                    .field('Pokemons.name')
                    .field('ownerId')
                    .field('Owners.ownerName', 'ownerName')
                    .join('Owners', null, 'Pokemons.ownerId = Owners.id')
                    .toString()
    db.query(sql, (err, pokemons) => {
      console.log('fetchALl POKEMONS!: ', pokemons);
      if(err) return reject(err);
      resolve(pokemons);
    })
  })
}

exports.fetchAdopted = function (TABLE_NAME, cb) {
  return new Promise((resolve, reject) => {
    let sql = squel.select()
                    .from(TABLE_NAME)
                    .field('Pokemons.id', 'id')
                    .field('Pokemons.name')
                    .field('Pokemons.pokeId')
                    .field('Pokemons.image')
                    .field('ownerId')
                    .field('ownerAddress')
                    .field('OwnerPhone')
                    .field('Owners.ownerName', 'ownerName')
                    .join('Owners', null, 'Owners.id = Pokemons.id' )
                    .toString()
    db.query(sql, (err, pokemons) => {
      console.log('fetchALl POKEMONS!: ', pokemons);
      if(err) return reject(err);
      cb(null, pokemons)
    })
  })
}

exports.create = function(pokemon) {
  return new Promise((resolve, reject) => {
    let sql = squel.insert().into(TABLE_NAME).setFields(pokemon).toString()
    db.query(sql, (err, result) => {
      if(err) return reject(err);
      resolve(result);
    })
  })
}