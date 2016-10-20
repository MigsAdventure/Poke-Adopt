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
    console.log('pokemonbod: ', req.body)
    Pokemon.create(req.body)
      .then(Pokemon.fetchAll)
      .then(pokemons => {
        res.send(pokemons)
      })
      .catch(err => {
        console.log('ERRR on POST: ', err);
        res.status(400).send(err);
      })
  })

  router.route('/list')
    .get((req, res) => {
      Pokemon.fetchList((err, list) => {
        res.status(err ? 400 : 200).send(err || list);
      })
    })

    router.route('/adopted')
      .get((req, res) => {
        Pokemon.fetchAdopted( 'Pokemons',(err, adoptedList) => {
          res.status(err ? 400 : 200).send(err || adoptedList)
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