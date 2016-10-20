const db = require('../config/db');
const squel = require('squel');

const TABLE_NAME = 'Owners';

db.query(`CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
  ownerName VARCHAR(100),
  ownerAddress VARCHAR(200),
  ownerPhone INT(100),
  ownerId INT,
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
  )`, err => {
    if(err) throw err;
  })

exports.fetchAll = function() {
  return new Promise((resolve, reject) => {
    let sql = squel.select()
                    .from(TABLE_NAME)
                    .toString()

    db.query(sql, (err, owners) => {
      if(err) return reject(err);
      resolve(owners);
    })
  })
}

exports.create = function(owner) {
  let newOwner = {
    ownerName: owner.ownerName,
    ownerPhone: owner.ownerPhone,
    ownerAddress: owner.ownerAddress,
  }

  return new Promise((resolve, reject) => {
    let sql = squel.insert().into(TABLE_NAME).setFields(owner).toString();

    db.query(sql, (err, result) => {
      if(err) return reject(err);
      resolve(result);
    })
  })
}