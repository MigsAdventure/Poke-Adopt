const express = require('express');
const router = express.Router();

router.use('/owners', require('./owners'));
router.use('/pokemons', require('./pokemons'));

module.exports = router;