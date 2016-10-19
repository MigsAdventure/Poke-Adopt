const db = require('../config/db');
const squel = require('squel');
const {get} = require('axios');

const TABLE_NAME = 'Pokemons';

db.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
  name VARCHAR(100),
  type VARCHAR(100),
  image VARCHAR(1000),
  pokemonId INT,
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
  )`, err => {
    if(err) throw err;
  })

exports.fetchList = (cb) => {
  get('http://pokeapi.co/api/v2/pokemon/?limit=10&offset=0')
    .then((res) => {
      console.log('FetchList: ',res.data);
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
                    .toSring()

    db.query(sql, (err, pokemons) => {
      if(err) return reject(err);
      resolve(pokemons);
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