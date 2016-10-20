import API from '../API';

const PokemonActions = {
  fetchPokemon() {
    API.fetchPokemon();
  },

  adoptedPokemon(pokePackage) {
    API.adoptedPokemon(pokePackage);
  },

  fetchAdoptedPokemon() {
    API.fetchAdoptedPokemon();
  },

}

export default PokemonActions;