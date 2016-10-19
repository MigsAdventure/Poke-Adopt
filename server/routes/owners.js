const express = require('express');
const router = express.Router();

const Owner = require('../models/Owner');

router.route('/')
  .get((req, res) => {
    Owner.fetchAll()
      .then(owners => {
        res.send(owners)
      })
      .catch(err => {
        res.status(400).send(err);
      })
  })
  .post((req, res) => {
    Owner.create(req.body)
      .then(Owner.fetchAll)
      .then(owners => {
        res.send(owners)
      })
      .catch(err => {
        res.status(400).send(err);
      })
  })

  module.exports = router;