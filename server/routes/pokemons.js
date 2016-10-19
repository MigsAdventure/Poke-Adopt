const express = require('express');
const router = express.Router();

const Pokemon = require('../models/Pokemon');

router.route('/')
  .get((req, res) => {
    Pokemon.fetchAll()
      .then(pokemons => {
        res.send(pokemons);
      })
      .catch(err => {
        res.status(400).send(err);
      })
  })

  .post((req, res) => {
    Pokemon.create(req.body)
      .then(Pokemon.fetchAll)
      .then(pokemons => {
        res.send(pokemons)
      })
      .catch(err => {
        res.status(400).send(err);
      })
  })

  router.route('/:id')
    .put((req,res) => {
      Pokemon.update(req.params.id, req.body)
        .then(Pokemon.findAll)
        .then(pokemons => {
          res.send(pokemons);
        })
        .catch(err => {
          res.status(400).send(err);
        })
    })

module.exports = router;